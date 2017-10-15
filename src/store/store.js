import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment/moment'
import router from '../router'

import * as firebase from 'firebase'

Vue.use(Vuex)
/*
* state'te tanımladığımız değerleri mutations'da setter function yazıp bu func. actions'da
* yazdığımız func. ile kullanıyoruz. bu actions methodlarınıda componentte kullanıyoruz */
export const store = new Vuex.Store({
  state: {
    loadedClasses: [],
    loadedUsers: [],
    customer: null, // setSession ile customerId set edilir clearSession ile null set edilir
    kurum_name: '',
    loading: false,
    pageLoading: false,
    error: null,
    isAuth: false,
    auth: false
  },
  actions: {
    loadClasses ({state, commit, dispatch, getters}) {
      store.commit('setLoading', true)
      let customerId = getters.getCustomerId
      console.log('loadClasses currentUser.uid => ' + customerId)
      firebase.database().ref('classes/' + customerId).once('value')
        .then(data => {
          let database = data.val()
          let classes = []
          for (let key in database) {
            classes.push({
              id: key,
              name: database[key].name,
              created: database[key].created
            })
          }
          store.commit('loadClasses', classes)
          store.commit('setLoading', false)
        })
    },
    // state.loadedClasses' a yeni class datasını push et + firebase insert
    createClass ({state, commit}, data) {
      // start loading
      store.commit('setLoading', true)
      // get current customer ID
      let customerId = store.getters.getCustomerId
      // class data
      const classData = {
        customerId: customerId,
        name: data.className,
        created: new Date().toISOString()
      }
      // firebase insert
      firebase.database().ref('classes/' + customerId).push(classData)
        .then(data => {
          store.commit('setLoading', false)
          // mutations'daki createClass methoduna classData objesini
          // key: value şeklinde gönder[spread] yanına id: 'yide ekle gönder
          store.commit('createClass', {...classData, id: data.key})
        })
        .catch(error => console.log(error.code + ' => ' + error.message))
    },
    deleteClass () {
      firebase.database().ref('classes').remove()
    },
    createCustomer ({commit}, customerData) {
      store.commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(customerData.email, customerData.password)
        .then(response => {
          response.updateProfile({
            displayName: customerData
          })
          store.commit('setSession', {id: response.uid, kurum_name: response.displayName})
          store.commit('setLoading', false)
          store.commit('clearError')
        })
        .catch(error => {
          store.commit('setLoading', false)
          store.commit('setError', error.code)
          console.log(error)
        })
    },
    signIn ({commit, dispatch}, customerData) {
      store.commit('setPageLoading', true)
      firebase.auth().signInWithEmailAndPassword(customerData.email, customerData.password)
        .then(response => {
          store.commit('setSession', {id: response.uid, kurum_name: response.displayName})
          store.commit('clearError')
          store.commit('setPageLoading', false)
        })
        .catch(error => {
          // error.code
          // error.message
          store.commit('setPageLoading', false)
          store.commit('setError', error.code)
          console.log(error.code + ': ' + error.message)
        })
    },
    autoSignIn ({commit}, payload) {
      store.commit('setSession', {id: payload.uid, kurum_name: payload.displayName})
    },
    signOut () {
      firebase.auth().signOut()
      store.commit('clearSession')
      store.commit('clearClasses')
    },
    // Auth varsa id 'yi state'deki customer'a atan, setSession'a id gönder
    isAuth ({commit}) {
      store.commit('setPageLoading', true)
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.commit('setSession', {id: user.uid, kurum_name: user.displayName})
          store.commit('setPageLoading', false)
          console.log('user var')
        } else {
          console.log('user yok')
          store.commit('setPageLoading', false)
          // route home
        }
      })
    },
    clearError ({commit}) {
      store.commit('clearError')
    },
    /* User Processes */
    loadUsers ({commit, getters, state}, payload) {
      store.commit('setLoading', true)
      let customerId = getters.getCustomerId
      let classId = payload
      firebase.database().ref('/users/' + customerId + '/' + classId).once('value')
        .then(data => {
          let databaseVal = data.val()
          let userData = []
          for (let key in databaseVal) {
            userData.push({ name: databaseVal[key].name, id: key })
          }
          store.commit('loadUser', userData)
          store.commit('setLoading', false)
        })
    },
    insertUser ({commit, getters}, payload) {
      store.commit('setLoading', true)
      let customerId = getters.getCustomerId
      let classId = payload.classId
      let userName = payload.name
      firebase.database().ref('/users/' + customerId + '/' + classId).push({ name: userName })
        .then(data => {
          store.commit('setUser', { name: userName })
          store.commit('setLoading', false)
        })
    },
    deleteUser ({commit, getters}, payload) {
      let customerId = getters.getCustomerId
      let classId = payload.classId
      let userId = payload.userId
      let userName = payload.userName
      firebase.database().ref('/users/' + customerId + '/' + classId + '/' + userId).remove()
      store.commit('removeUser', userName)
    },
    yokla ({commit}, payload) {
      //
      let hour = moment().format('LTS').split(' ')
      let time = moment().format('L').split('/')
      time = time.join('-')
      //
      let now = time + '_' + hour[0]
      let classId = payload.classId
      let yoklama = payload.yoklama
      firebase.database().ref('/yoklama/' + classId + '/' + now).push(yoklama).then(data => {
        console.log(data)
        router.push('/yoklama-detail/' + classId + '/' + now)
      })
    }
  },
  mutations: {
    setAuth (state, value) {
      state.auth = value
    },
    createClass (state, data) {
      state.loadedClasses.unshift(data)
    },
    setSession (state, customerData) {
      state.customer = customerData.id
      state.kurum_name = customerData.kurum_name
      state.isAuth = true
    },
    clearSession (state) {
      state.customer = null
      state.isAuth = false
    },
    clearClasses (state) {
      state.loadedClasses.length = 0
    },
    setLoading (state, value) {
      state.loading = value
    },
    setPageLoading (state, value) {
      state.pageLoading = value
    },
    setError (state, value) {
      state.error = value
    },
    clearError (state) {
      state.error = null
    },
    loadClasses (state, value) {
      state.loadedClasses.length = 0
      state.loadedClasses.push(...value)
    },
    /* User Processes */
    loadUser (state, payload) {
      state.loadedUsers.length = 0
      state.loadedUsers.push(...payload)
    },
    // bu ne için? inser user için?
    setUser (state, payload) {
      state.loadedUsers.push(payload)
    },
    removeUser (state, payload) {
      // state.loadedUsers.slice(payload, 1)
      // state.loadedUsers.name === payload .remove
    }
  },
  getters: {
    /**
     yukarıdaki state'i alıyor ve
     içerisindeki değerleri istediğimiz gibi işleyerek return edecek method yazıyoruz.
     */
    loadedClasses (state) {
      return state.loadedClasses.sort((firstItem, secondItem) => {
        return firstItem.created < secondItem.created
      })
    },
    loadedUsers (state) {
      return state.loadedUsers
      /* return (classId) => state.loadedUsers.filter(user => {
        return user.classId === classId
      }) */
    },
    getCustomerId (state) {
      return state.customer
    },
    getError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    },
    getPageLoading (state) {
      return state.pageLoading
    },
    getKurumName (state) {
      return state.kurum_name
    },
    isAuth (state) {
      return state.isAuth
    }
  },
  modules: {
  }
})

// loadUsers, ClassUserList.vue ve Yokla sayfasında offical olarak koşturulacak
// YoklamaDetailSayfasında gelen userID ile isim alınacak

/*
  -actions'daki methodlara erişmek için dispatch kullanılır
  this.$store.dispatch('METHOD_NAME')

  - olay kısaca: state'te data tanımla. gettersta datayı işle ve return et
  - componentte computed içerisinde method yaz this.$store.getters.method ile datayı al
  - getters methodları parametre olarak vuex objelerini alıyor state-getters..

  -store'daki bir değişkene erişmek için componentta
  computed: {
    myValue () {
      return store.state.myValue;
    }
  }

  -componentler data'da değişiklik için mutations'a başvurmak zorunda
  daha sonra componenttan store.commit('method_name', 'val') ile erişirler
  ve mutations methodları asynchrone çalışır
 */
