<template>
    <v-container fluid>
        <!-- Edit Modal -->
        <v-layout row justify-center>
            <v-dialog v-model="editDialog" persistent>
                <v-card>
                    <v-card-title class="headline"><b>{{editClassName}}</b> Düzenle</v-card-title>
                    <v-card-text>
                        <v-text-field
                                label="Yeni Sınıf İsmi"
                                v-model="text"
                                prepend-icon="home"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="grey white--text" @click.native="editDialog = false">İptal</v-btn>
                        <v-btn class="green white--text" @click.native="">DÜZENLE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
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
        <!-- Class List -->
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="back">GERİ</v-btn>
                <v-card class="text-xs-center">
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>SINIF YÖNETİMİ</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
                    <v-list  v-if="!loading">
                        <v-list-tile v-for="item in classes" v-bind:key="item.name">
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn flat @click="openEditDialog(item.id, item.name)">DÜZENLE</v-btn>
                            </v-list-tile-action>
                            <v-list-tile-action>
                                <v-btn flat @click="askDelete(item.id, item.name)">SİL</v-btn>
                            </v-list-tile-action>
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
  name: 'home',
  data () {
    return {
      deleteDialog: false,
      editDialog: false,
      deleteClassId: '',
      deleteClassName: '',
      editClassName: ''
    }
  },
  created () {
    this.$store.dispatch('loadClasses')
  },
  computed: {
    loading () {
      return this.$store.getters.getLoading
    },
    classes () {
      return this.$store.getters.loadedClasses
    }
  },
  methods: {
    askDelete (classId, className) {
      this.deleteDialog = true
      this.deleteClassId = classId
      this.deleteClassName = className
    },
    openEditDialog (classId, className) {
      this.editDialog = true
      // this.editClassId = classId
      this.editClassName = className
    },
    deleteClass () {
      this.deleteDialog = false
      let currentUserId = firebase.auth().currentUser.uid
      let classId = this.deleteClassId
      firebase.database().ref('classes/' + currentUserId + '/' + classId).remove()
      firebase.database().ref('yoklama/' + classId).remove()
      this.$store.dispatch('loadClasses')
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
