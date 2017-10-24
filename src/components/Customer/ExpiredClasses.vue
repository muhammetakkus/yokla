<template>
    <v-container fluid>
        <!-- Delete Modal -->
        <v-layout row justify-center>
            <v-dialog v-model="deleteDialog" persistent>
                <v-card>
                    <v-card-title class="headline"><b>{{deleteClassName}}</b> Sınıfını Silmek İstiyor musunuz?</v-card-title>
                    <v-card-text>Bu sınıf ile beraber bu sınıfa ait bütün yoklama kayıtları geri dönüşümsüz bir şekilde silinecektir.</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey white--text" @click.native="deleteDialog = false">İptal</v-btn>
                        <v-btn class="red white--text" @click.native="deleteClass">SİL</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <!-- Content -->
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="back">GERİ</v-btn>
                <v-card class="text-xs-center">
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>YOKLAMA DÖNEMİ BİTEN SINIFLAR</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
                    <v-list v-if="!loading">
                        <v-list-tile v-for="item in classes" v-bind:key="item.name">
                            <v-list-tile-content :to="/view-yoklama-history/+item.id">
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn flat @click="askDelete(item.id, item.name)">SİL</v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <!-- -->
                    <message :message="message" v-if="empty"></message>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import Time from '@/lib/time'
export default {
  name: 'home',
  data () {
    return {
      loading: false,
      classes: [],
      deleteDialog: false,
      deleteClassId: '',
      deleteClassName: '',
      message: 'Dönemi Biten Bir Sınıf Bulunmamakta',
      empty: false
    }
  },
  created () {
    /* store.js -> loadClasses ' diziye sınıfları depoluyor burada tekrar firebase.connect yapmayıp store'dan arrayi alabilirsin store managementın mantığı bu */
    this.loadExpClasses()
  },
  computed: {
  },
  methods: {
    loadExpClasses () {
      this.loading = true
      let customerId = firebase.auth().currentUser.uid
      firebase.database().ref('classes/' + customerId).once('value')
        .then(data => {
          let database = data.val()
          let classes = []
          for (let key in database) {
            // if ( now.en > (finisTime -> convert eng time) )
            if (new Time().getTimeEN() > new Time().convertTimeEnToTr(database[key].finish_yoklama_date)) {
              classes.unshift({
                id: key,
                name: database[key].name,
                created: database[key].created
              })
            }
          }
          this.classes.push(...classes)
          //
          if (this.classes.length === 0) {
            this.empty = true
          } else {
            this.empty = false
          }
          //
          this.loading = false
        })
    },
    back () {
      this.$router.go(-1)
    },
    askDelete (classId, className) {
      this.deleteDialog = true
      this.deleteClassId = classId
      this.deleteClassName = className
    },
    deleteClass () {
      this.deleteDialog = false
      let currentUserId = firebase.auth().currentUser.uid
      let classId = this.deleteClassId
      firebase.database().ref('classes/' + currentUserId + '/' + classId).remove()
      firebase.database().ref('yoklama/' + classId).remove()
      // classes değişkeninde mevcut sınıfları kaldırmazsak diğer silinmemiş sınıfları tekrar push etmiş olur
      this.classes.length = 0
      this.loadExpClasses()
    }
  }
}
</script>

<style scoped>

</style>
