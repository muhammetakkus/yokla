<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex d-flex xs12 md12>
                <h3 style="text-transform: capitalize" class="text-xs-center ml-3">{{ kurumName }}</h3>
            </v-flex>
            <v-flex d-flex xs12 md6>
                <v-btn class="warning" to="class-management">SINIF YÖNETİMİ</v-btn>
            </v-flex>
            <v-flex d-flex xs12 md6>
                <v-btn to="/create-class" class="success">+YENİ SINIF OLUŞTUR</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <!--<v-btn class="error" @click="deleteClass">SİL</v-btn>-->


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
                                <v-btn flat :to="/view-yoklama-history/+item.id">
                                    <v-icon>alarm</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                            <!--
                            <v-list-tile-action>
                                <v-btn flat @click="goDetailClass(item.id)">Yokla</v-btn>
                            </v-list-tile-action>
                            -->
                            <v-list-tile-action>
                                <v-btn flat :to="/class-user-list/+item.id">Kişiler</v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
    kurumName () {
      return this.$store.getters.getKurumName
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
