import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router' // auto index isimli dosyayı çekiyor sanırım

import * as firebase from 'firebase'
import {store} from './store/store'

/* Hata Mesajı Component Olarak Tanımlanıp Ana Instance Geçildi - Bütün Componentlerde Kullanılabilir */
import Alert from './components/Shared/Alert'
Vue.component('app-alert', Alert)

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA2AmvhRSD2B65_wxfkVdPb_EUZRPGCBjw',
      authDomain: 'yokla-vuejs.firebaseapp.com',
      databaseURL: 'https://yokla-vuejs.firebaseio.com',
      projectId: 'yokla-vuejs',
      storageBucket: 'yokla-vuejs.appspot.com',
      messagingSenderId: '210448516142'
    })
    firebase.auth().onAuthStateChanged(customer => {
      if (customer) {
        this.$store.dispatch('autoSignIn', customer)
      }
    })
    // uygulama reload olduğunda auth var mı yok mu diye bakar varsa setSession yapar
    this.$store.dispatch('isAuth') // üsteki işlemden sonra buna gerek yok sanırım?
  },
  created () {
    // auth varsa ana instance'da class ları firebase'den çek
    // daha sonra componentler bunun içinde yıkılıp-kurulacağı için bu işi bir kere burada yapacak
    // eğer home componentinde yapsaydık her home componentinin olduğu sayfaya geldiğimizde tekrar çekecekti veriyi
    // şu an burada this.$store.getters.isAuth false dönüyor?
    // classLoad yapan loadClasses action-methodundan sonra çalıştığı için loadClasses da
    // customerId alınmıyor
  }
})
// her şeyi store-state-vuex'de tutuyorsun iki farklı componentin işlem yapacağı şeyleri statette tut
// bkz: home componentitnin verileri kendi içerisine alınabilir
// bu şekilde her componentten firebase de işlem yapmak doğru mu?

/*
  -tarih ve saat ayarları yapılacak - class için column'lar oluşturulup available-disable durumu yapılacak
  -datayı customerId 'ye göre çek
  */

/*
-Ana dosya main.js ve ana Instance bu  - element olarak #app belirlenmiş
-Router çekiliyor(store.js) ordaki componentler import ediliyor - router ve pathler eşleştiriliyor
-Daha sonra #app içerisinde <router-view> kullanılan yere gerekli component inject ediliyor
  */

/*
- @ -> root directory anlamına geliyor yani burada src
- eslint - birden fazla boşluk bırakmaya veya obj'den sonra hiç boşluk bırakmamaya müsaade etmiyor!
- eslint - yorum satırında bile 2 boşluk ard arda bıraktırmıyor
- eslint - dosyanın son satırı boş satır olmak zorunda
  */

/*
  router.push({ path: `/user/${array}` }) // -> /user/123
  */
