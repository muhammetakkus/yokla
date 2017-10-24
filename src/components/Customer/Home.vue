<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex d-flex xs12 md12>
                <h3 style="text-transform: capitalize" class="text-xs-center ml-3">{{ kurumName }}</h3>
            </v-flex>
            <v-flex d-flex xs12 md4>
                <v-btn class="warning" to="class-management">SINIF YÖNETİMİ</v-btn>
            </v-flex>
            <v-flex d-flex xs12 md4>
                <v-btn to="/create-class" class="success">+YENİ SINIF OLUŞTUR</v-btn>
            </v-flex>
            <v-flex d-flex xs12 md4>
                <v-btn to="/expired-classes" class="brown white--text">GEÇMİŞ SINIFLAR</v-btn>
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
                        <!-- item.is_active ? :classes='text-red' + buton :to router verilmeyecek -->
                        <v-list-tile v-for="item in classes" v-bind:key="item.name">
                            <v-list-tile-content style="cursor: pointer"
                                                 @click="goDetailClass(item.id, item.is_active)"
                                                 :class="[item.is_active ? activeColor : deactiveColor]">
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
                        <!-- -->
                        <message :message="message" v-if="empty"></message>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      activeColor: 'green--text',
      deactiveColor: 'red--text',
      message: 'Aktif Bir Sınıf Bulunmamakta',
      empty: false
    }
  },
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
      //
      if (this.$store.getters.loadedClasses.length === 0) {
        this.empty = true
      } else {
        this.empty = false
        return this.$store.getters.loadedClasses
      }
    }
  },
  methods: {
    goDetailClass (id, isActive) {
      if (!isActive) {
        return false
      }
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
