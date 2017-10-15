<template>
    <v-container fluid>
        <v-layout row class="text-xs-center">
            <v-flex>
                <v-progress-circular indeterminate class="primary--text text-sm-center" :width="7" :size="70" v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 v-if="!loading">
                <v-btn @click="back">GERİ</v-btn>
                <router-link v-for="time in history" tag="div" :to="time.url" :key="history.time">
                    <v-layout row class="v-layout">
                        <v-flex>
                            <v-card dark class="accent">
                                <v-card-text>{{time.time}} tarihli YOKLAMASINI GÖR</v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </router-link>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'ViewYoklamaHistory',
  data () {
    return {
      history: [],
      loading: false
    }
  },
  created () {
    this.loading = true
    let classId = this.$route.params.classid
    firebase.database().ref('yoklama/' + classId).once('value').then(data => {
      let val = data.val()
      for (let time in val) {
        this.history.push({ url: '/yoklama-detail/' + classId + '/' + time, time: time })
      }
      /* Sort By Time */
      this.history.sort((firstItem, secondItem) => {
        return firstItem.time < secondItem.time
      })
      this.loading = false
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
    .v-layout {
        margin-bottom: 10px;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px
    }
</style>
