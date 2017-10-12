<template>
    <v-layout row>
        <v-flex xs10 sm10 offset-sm1>
            <v-btn @click="deleteClass">SİL</v-btn>
            <router-link to="/create-class" class="btn btn--raised" style="padding:0 10px;cursor:pointer">
                +YENİ SINIF OLUŞTUR
            </router-link>
            <v-card class="text-xs-center">
                <v-toolbar class="white--text indigo" dark dense>
                    <v-toolbar-title>SINIFLAR</v-toolbar-title>
                </v-toolbar>
                <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
                <v-list  v-if="!loading">
                    <v-list-tile v-for="item in classes" v-bind:key="item.name">
                        <v-list-tile-content style="cursor: pointer" @click="goDetailClass(item.id)">
                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn flat :to="/view-yoklama-history/+item.id">Yoklama Geçmişi</v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                            <v-btn flat @click="goDetailClass(item.id)">Yokla</v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                            <v-btn flat :to="/class-user-list/+item.id">Kişiler</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'home',
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
    goDetailClass (id) {
      this.$router.push('/yokla/' + id)
    },
    deleteClass () {
      this.$store.dispatch('deleteClass')
    }
  }
}
</script>

<style scoped>

</style>
