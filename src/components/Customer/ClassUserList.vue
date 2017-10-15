<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="back">GERİ</v-btn>
                <v-btn v-if="!insert" @click="(insert = !insert)">+YENİ KİŞİ EKLE</v-btn>
                <v-form @submit.prevent="userInsert" v-if="insert">
                    <v-text-field
                            label="Tam isim"
                            v-model="name"
                            required
                    ></v-text-field>
                    <v-btn type="submit">EKLE</v-btn>
                    <v-btn @click="(insert = !insert)">İPTAL</v-btn>
                </v-form>
                <v-card>
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>kişiler</v-toolbar-title>
                    </v-toolbar>
                    <v-list class="text-xs-center">
                        <v-progress-circular indeterminate class="primary--text text-sm-center" :width="7" :size="70" v-if="loading"></v-progress-circular>
                        <v-list-tile avatar v-for="item in getUsers" v-bind:key="item.name" @click="" v-if="!loading">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-avatar>
                                <v-btn flat @click="editUser">DÜZENLE</v-btn>
                                <v-btn flat @click="deleteUser">SİL</v-btn>
                            </v-avatar>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'ClassUserList',
  data () {
    return {
      insert: false,
      name: ''
    }
  },
  created () {
    // aslında geliyor ancak actions-loadUser currentUserId 'i alamıyor?
    // componentler yüklendiğinde customerId alınamıyor çünkü firebase'den önce yükleniyorlar
    // firebase.auth().currentUser.uid 'ın sorunuda bu aslında id 'yi alıyor ama sayfa ilk yüklendiğinde değil ana instance yüklenip bittikten sonra
    let classId = this.$route.params.classid
    this.$store.dispatch('loadUsers', classId)
  },
  computed: {
    loading () {
      return this.$store.getters.getLoading
    },
    getUsers () {
      return this.$store.getters.loadedUsers
    }
  },
  methods: {
    editUser () {
      alert('edited user')
    },
    deleteUser () {
      alert('deleted user')
    },
    userInsert () {
      if (this.name === '') {
        return
      }
      let userName = this.name
      let classId = this.$route.params.classid
      this.$store.dispatch('insertUser', { classId: classId, name: userName })
      this.insert = false
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
