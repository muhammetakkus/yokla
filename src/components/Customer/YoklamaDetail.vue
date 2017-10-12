<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="back">GERİ</v-btn>
                <v-card>
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>{{$route.params.time}} YOKLAMA GEÇMİŞİ</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <v-list-tile avatar v-for="item in user" @click="">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item[0]"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-avatar>
                                {{(item[1]) ? 'VAR' : 'YOK'}}
                            </v-avatar>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'YoklamaDetail',
  data () {
    return {
      user: []
    }
  },
  created () {
    let classId = this.$route.params.classid
    let time = this.$route.params.time
    firebase.database().ref('yoklama/' + classId + '/' + time).once('value').then(data => {
      let values = data.val()
      for (let key in values) {
        this.user = Object.entries(values[key]).map(data => {
          return data
        })
        // bir objenin keylerini almak için Object.keys(obj) - valuelerini almak için Object.values(obj)
        // Object.keys(values[key])
        // Object.values(values[key])
        // Object.entries(values[key]) - bu da kullanışlı olabilir
      }
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
