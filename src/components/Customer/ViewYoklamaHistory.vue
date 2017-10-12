<template>
    <v-container>
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
    </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'ViewYoklamaHistory',
  data () {
    return {
      testURL: [
        { link: '/yoklama-detail/' + this.$route.params.classid + '/2017' },
        { link: '/yoklama-detail/' + this.$route.params.classid + '/2016' }
      ],
      history: []
    }
  },
  created () {
    let classId = this.$route.params.classid
    firebase.database().ref('yoklama/' + classId).once('value').then(data => {
      let val = data.val()
      for (let time in val) {
        this.history.push({ url: '/yoklama-detail/' + classId + '/' + time, time: time })
      }
    })
  },
  computed: {
    getHistory () {
      let classId = this.$route.params.classid
      return this.$store.dispatch('viewYoklamaHistory', classId)
    }
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
