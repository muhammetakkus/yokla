import Vue from 'vue'
import Vuex from 'vuex'

import * as firebase from 'firebase'

Vue.use(Vuex)
/*
* state'te tanımladığımız değerleri mutations'da setter function yazıp bu func. actions'da
* yazdığımız func. ile kullanıyoruz. bu actions methodlarınıda componentte kullanıyoruz */
export const store = new Vuex.Store({
  state: {
    loadedClasses: [],
    loadedUsers: [
      { id: 10, classId: 1, name: 'AHMET' },
      { id: 11, classId: 1, name: 'MEHMET' },
      { id: 13, classId: 2, name: 'CEMAL' }
    ],
    customer: null, // setSession ile customerId set edilir clearSession ile null set edilir
    loading: false,
    pageLoader: false,
    error: null,
    isAuth: false
  },
  actions: {
    loadClasses ({state, commit, dispatch, getters}) {
      store.commit('setLoading', true)
      firebase.database().ref('/classes').once('value').then(data => {
        // tüm data -> hash: {data}, hash: {data} şeklinde
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
      firebase.database().ref('classes').push(classData)
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
      // start loading state
      store.commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(customerData.email, customerData.password)
        .then(response => {
          store.commit('setSession', response.uid)
          store.commit('setLoading', false)
          store.commit('clearError')
          if (response.uid) {
            store.commit('setSession', response.uid)
          }
        })
        .catch(error => {
          store.commit('setLoading', false)
          store.commit('setError', error.code)
          console.log(error)
        })
    },
    signIn ({commit, dispatch}, customerData) {
      firebase.auth().signInWithEmailAndPassword(customerData.email, customerData.password)
        .then(response => {
          store.commit('setLoading', false)
          store.commit('setSession', response.uid)
          store.commit('clearError')
          store.dispatch('loadClasses')
        })
        .catch(error => {
          // error.code
          // error.message
          store.commit('setLoading', false)
          store.commit('setError', error.code)
          console.log(error.code + ': ' + error.message)
        })
    },
    signOut () {
      firebase.auth().signOut()
      store.commit('clearSession')
      store.commit('clearClasses')
    },
    // Auth varsa id 'yi state'deki customer'a atan, setSession'a id gönder
    isAuth ({commit}) {
      store.commit('setPageLoader', true)
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.commit('setSession', user.uid)
          store.commit('setPageLoader', false)
          console.log('user var')
        } else {
          console.log('user yok')
          store.commit('setPageLoader', false)
          // route home
        }
      })
    },
    clearError ({commit}) {
      store.commit('clearError')
    }
  },
  mutations: {
    createClass (state, data) {
      state.loadedClasses.unshift(data)
    },
    setSession (state, customerId) {
      state.customer = customerId
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
    setPageLoader (state, value) {
      state.pageLoader = value
    },
    setError (state, value) {
      state.error = value
    },
    clearError (state) {
      state.error = null
    },
    loadClasses (state, value) {
      state.loadedClasses.push(...value)
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
      // if (state.isCustomer()) {
      return state.customer
      // }
    },
    getError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    },
    isAuth (state) {
      return state.isAuth
    }
  },
  modules: {
  }
})

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
