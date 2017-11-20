<template>
    <v-layout column>
        <section>
            <v-parallax src="https://picsum.photos/1200/300/?random" height="300" class="pink darken-4">
                <v-layout column align-center justify-center class="white--text">
                    <h1 class="white--text mb-2 display-3 text-xs-center"><b>{{msg}}</b></h1>
                    <div class="subheading mb-2 text-xs-center">Real-Time Yoklama Service</div>
                    <v-btn class="blue lighten-2 mt-5" dark href="/login">GİRİŞ</v-btn>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-layout column wrap class="my-5" align-center>
                <v-flex xs12 sm4 class="my-3">
                    <div class="text-xs-center">
                        <h2 class="headline">Yoklama Takibi Yapmanın En Kolay Yolu!</h2>
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Günlük Yoklama</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Haftalık ve Aylık Grafikler</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Kişi Bazında Gösterim</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

        <v-footer class="blue darken-2">
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <div class="white--text text-xs-center ml-3">
                        Tüm Hakları Saklıdır
                        <v-icon class="red--text">favorite</v-icon>
                        2017
                    </div>
                </v-flex>
            </v-layout>
        </v-footer>
    </v-layout>

</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'YOKLA'
      }
    },
    computed: {
      pageLoading () {
        return this.$store.getters.getPageLoading
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* run -> npm update */
    /* run -> git add + commit + push */
    /* --- -> firebase deployment */
    /* - yokalama başlama/bitiş tarihinden yıl/ay o sınıf için dönem tarihi olacak ATL-12-A-2017-2018 - */
    /* YokalmaDetail SAYFASI İÇİN DÜZENLE SEÇENEĞİ - EĞER O SINIF İÇİN YOKLAMA ALMA ENABLE İSE */
    /* YOKLA sayfasının label-checkbox css 'i yazılacak */
    /* deployment */

    /* DİĞER SAYFALARIN LOGİN-REGİSTER redirectleri yapılacak */
    /* sınıf ismine tıklanıp yokla sayfasına gittiğinde de önce isClassAilable kontrolü yap != ise home'a yönlensin */
    /* YOKLAMA GEÇMİŞİ HAFTALIK-AYLIK GRAFİKSEL GÖSTERİMİ + GRUP BAZINDA-KİŞİ BAZINDA -chart library kullanılacak */
    /* KULLANICI GİRİŞİ - SADECE KİŞİ BAZINDA KENDİ GRAFİĞİNİ GÖRÜR */
    /* - seçilen gün için saat başlangıç-bitiş ayarı yapılsın - */
    /* VAR-YOK +İZİNLİ? */
    /* clean code */

    /* 00:00 bitiş olarak ayarlandığında 23:59:59 bügünden 00:00 diğer günden sayıyor */
    /* sınıf oluşturulduğunda anasayfaya yönlenince sınıfı deactive gösteriyor sayfa yenilenince active görünüyor? */

    /* docker-compose.yml dosyasında image olarak klasördeki Dockerfile gösterirsen o image için özel ayarlar yapabilirsin */
</style>
