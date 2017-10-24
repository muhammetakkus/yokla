<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="back">İptal</v-btn>
                <v-card class="text-xs-center">
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>{{$route.params.time}} Tarihli yoklamayı düzenle</v-toolbar-title>
                    </v-toolbar>

                    <v-progress-circular indeterminate class="primary--text text-sm-center" :width="7" :size="70" v-if="loading"></v-progress-circular>

                    <v-list>
                        <v-list-tile v-for="item in this.users" :key="item.status">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <!--v-checkbox v-model="check[item.name]" :input-value="props.selected"></v-checkbox-->
                                <!--label for="yokla" id="checkbox"></label-->
                                <input type="checkbox" v-model="item.status">
                            </v-list-tile-action>
                        </v-list-tile>

                        <v-btn outline class="indigo--text" @click.native="updateYokla">DÜZENLE</v-btn>
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
      users: [],
      loading: false,
      yoklamaId: '',
      yoklama: {}
    }
  },
  created () {
    this.loading = true
    let classId = this.$route.params.classid
    let time = this.$route.params.time
    firebase.database().ref('yoklama/' + classId + '/' + time).once('value').then(data => {
      let values = data.val()
      for (let key in values) {
        // for update
        this.yoklamaId = key
        //
        for (let item in values[key]) {
          this.users.push({ name: item, status: values[key][item] })
        }
      }
      this.loading = false
    })
  },
  methods: {
    updateYokla () {
      for (let item in this.users) {
        let name = this.users[item]['name']
        this.yoklama[name] = this.users[item]['status']
      }
      let classId = this.$route.params.classid
      let time = this.$route.params.time
      firebase.database().ref('yoklama/' + classId + '/' + time + '/' + this.yoklamaId).set(this.yoklama)
      this.$router.push('/yoklama-detail/' + classId + '/' + time)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
