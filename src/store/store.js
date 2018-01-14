import Vue from 'vue'
import Vuex from 'vuex'
import Time from '@/lib/time'

import * as firebase from 'firebase'

Vue.use(Vuex)
/*
* state'te tanımladığımız değerleri mutations'da setter function yazıp bu func. actions'da
* yazdığımız func. ile kullanıyoruz. bu actions methodlarınıda componentte kullanıyoruz */
export const store = new Vuex.Store({
  state: {
    loadedClasses: [],
    allClasses: [],
    loadedUsers: [],
    customer: null, // setSession ile customerId set edilir clearSession ile null set edilir
    kurum_name: '',
    loading: false,
    pageLoading: false,
    error: null,
    isAuth: false,
    auth: false,
    // Raporlanacak Classların Tutulduğu Array
    classRapor: {},
    checkedClassNamesForRapor: []
  },
  actions: {
    loadClasses ({state, commit, dispatch, getters}) {
      console.log('loadClasses runned')
      store.commit('setLoading', true)
      let customerId = getters.getCustomerId
      state.allClasses.length = 0
      // let toDay = new Date().getDate()
      firebase.database().ref('classes/' + customerId).once('value')
        .then(data => {
          let database = data.val()
          let classes = []
          for (let key in database) {
            // bütün sınıfların bulunduğu bir class'ın olsun
            state.allClasses.push({
              id: key,
              name: database[key].name,
              created: database[key].created
            })
            // if ((finisTime -> converted eng time) > now)
            if (new Time().convertTimeEnToTr(database[key].finish_yoklama_date) >= new Time().getTimeEN()) {
              // yoklama alma saatleri getTime'a çevrilip şu anki saat-dakika ile compare edilebiliyor new Date(date time).getTime()
              // sadece saat bazında mukayese için hepsi için güncel tarih veriliyor new Time().getTimeEN()
              let start = new Date(new Time().getTimeEN() + ' ' + database[key].starting_yoklama_time).getTime()
              let now = new Date(new Time().getTimeEN() + ' ' + new Time().getHourAndMin()).getTime()
              let finish = new Date(new Time().getTimeEN() + ' ' + database[key].finish_yoklama_time).getTime()
              let thisDay = new Date().getDay()
              let yoklamaStatus = false
              if (
                // && database[key].availableDates.includes(toDay)
                finish >= now && now >= start && database[key].availableDates.includes(thisDay)
              ) {
                yoklamaStatus = true
                console.log('gotcha')
              }
              classes.push({
                id: key,
                name: database[key].name,
                created: database[key].created,
                is_active: yoklamaStatus
              })
            }
          }
          store.commit('loadClasses', classes)
          store.commit('setLoading', false)
        })
    },
    setSession ({commit}, payload) {
      store.commit('setSession', payload)
    },
    setPageLoading ({commit}, payload) {
      store.commit('setPageLoading', payload)
    },
    setError ({commit}, payload) {
      store.commit('setError', payload)
    },
    setUser ({commit}, payload) {
      store.commit('setUser', payload)
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
    // Rapor sayfasında yoklama için seçilen classlar
    classForRapor ({state}, payload) {
      state.classRapor = payload
    },
    // Rapor sayfasında yoklama için seçilen className ler
    checkedClassNamesForRapor ({state}, payload) {
      state.checkedClassNamesForRapor = payload
    }
  },
  mutations: {
    setAuth (state, value) {
      state.auth = value
    },
    // is that just for register??
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
    getAllClasses (state) {
      return state.allClasses
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
    },
    getClassesForRapor (state) {
      return state.classRapor
    },
    getCheckedClassNamesForRapor (state) {
      return state.checkedClassNamesForRapor
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
