<template>
    <v-container fluid>
        <!-- Edit Modal -->
        <v-layout row justify-center>
            <v-dialog v-model="editDialog" persistent>
                <v-card>
                    <v-card-title class="headline"><b>{{userName}}</b></v-card-title>
                    <v-card-text>
                        <v-text-field
                                label="Yeni İsim"
                                prepend-icon="account_circle"
                                v-model="newName"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey white--text" @click.native="editDialog = false">İptal</v-btn>
                        <v-btn class="green white--text" @click.native="editUser">DÜZENLE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
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
                        <v-list-tile avatar v-for="item in getUsers" v-bind:key="item.id" @click="" v-if="!loading">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-avatar>
                                <v-btn flat @click="openEditDialog(item.name, item.id)">DÜZENLE</v-btn>
                                <v-btn flat @click="deleteUser(item.name, item.id)">SİL</v-btn>
                            </v-avatar>
                        </v-list-tile>
                        <!-- -->
                        <message :message="message" v-if="empty && !loading"></message>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// import firebase from 'firebase'
export default {
  name: 'ClassUserList',
  data () {
    return {
      insert: false,
      editDialog: false,
      userName: '',
      name: '',
      userId: '',
      newName: '',
      message: 'Bu Sınıfa Ait Bir Kayıt Bulunmamakta',
      empty: false
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
      if (this.$store.getters.loadedUsers.length === 0) {
        this.empty = true
      } else {
        this.empty = false
        return this.$store.getters.loadedUsers
      }
    }
  },
  methods: {
    openEditDialog (name, id) {
      this.editDialog = true
      this.userName = name
      this.userId = id
    },
    editUser () {
      if (this.newName === '') {
        return
      }
      this.editDialog = false
      // firebase.database().ref('classes/' + currentUserId + '/' + classId).update({name: this.newName})
    },
    deleteUser (name, id) {
      let classId = this.$route.params.classid
      this.$store.dispatch('deleteUser', {userName: name, userId: id, classId: classId})
      this.$store.dispatch('loadUsers', classId)
      // silme işleminde problem var
    },
    userInsert () {
      if (this.name === '') {
        return
      }
      let userName = this.name
      let classId = this.$route.params.classid
      this.$store.dispatch('insertUser', { classId: classId, name: userName })
      this.name = ''
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
