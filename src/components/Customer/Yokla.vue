<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="back">GERİ</v-btn>
                <v-card class="text-xs-center">
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>YOKLAMA AL</v-toolbar-title>
                    </v-toolbar>

                    <v-progress-circular indeterminate class="primary--text text-sm-center" :width="7" :size="70" v-if="loading"></v-progress-circular>

                    <v-list>
                        <v-list-tile v-for="item in getUsers" :key="item.id">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <!--v-checkbox v-model="check[item.name]" :input-value="props.selected"></v-checkbox-->
                                <label for="yokla" id="checkbox"></label>
                                <input type="checkbox" id="yokla" v-model="check[item.name]">
                            </v-list-tile-action>
                        </v-list-tile>

                        <v-btn outline class="indigo--text" @click.native="yokla">YOKLA</v-btn>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'yokla',
  props: ['classid'],
  data () {
    return {
      check: {},
      getUsers: [],
      loading: false
    }
  },
  created () {
    this.loading = true
    let classId = this.$route.params.classid
    let customerId = this.$store.getters.getCustomerId
    firebase.database().ref('/users/' + customerId + '/' + classId).once('value')
      .then(data => {
        let databaseVal = data.val()
        for (let key in databaseVal) {
          this.getUsers.push({ name: databaseVal[key].name, id: key })
        }
        // tüm isimlere checkbox için false ata {"x": false, "y": false}
        for (let key in this.getUsers) {
          this.check[this.getUsers[key].name] = false
        }
        this.loading = false
      })
  },
  methods: {
    yokla () {
      let yoklamaData = { classId: this.$route.params.classid, yoklama: this.check }
      this.$store.dispatch('yokla', yoklamaData)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
    label#checkbox {
        
    }
    input[type="checkbox"] {

    }
</style>
