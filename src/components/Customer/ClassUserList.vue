<template>
    <v-layout row>
        <v-flex xs12>
            <v-btn v-if="!insert" @click="changeInsert">+YENİ KİŞİ EKLE</v-btn>
            <v-form v-if="insert">
                <v-text-field
                        label="Name"
                        required
                ></v-text-field>
                <v-btn>EKLE</v-btn>
            </v-form>
            <v-card>
                <v-toolbar class="white--text indigo" dark dense>
                    <v-toolbar-title>kişiler</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile avatar v-for="item in users" v-bind:key="item.name" @click="">
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
</template>

<script>
export default {
  name: 'ClassUserList',
  data () {
    return {
      insert: false,
      users: [
        {name: 'Mehmet Akkuş'},
        {name: 'Ahmet'},
        {name: 'Ali'},
        {name: 'Veli'}
      ]
    }
  },
  methods: {
    editUser () {
      alert('edited user')
    },
    deleteUser () {
      alert('deleted user')
    },
    changeInsert () {
      this.insert = true
    }
  }
}
</script>

<style scoped>

</style>
