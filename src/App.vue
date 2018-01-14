<template>
  <v-app light style="background: #fff">
    <!-- SIDEBAR -->
    <v-navigation-drawer temporary persistent v-model="drawer" absolute>
      <v-list dense>
        <v-list-tile  v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile  v-if="isAuth" @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>ÇIKIŞ</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
      
    <!-- NAV -->  
    <v-toolbar class="white--text pink darken-4" dense>
      <!-- Sicebar Icon -->
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up white--text"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">YOKLA</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- XS ve ÜZERİNDE GÖRÜNÜR -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat
               class="white--text"
               v-for="item in menuItems"
               :key="item.title"
               :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat class="white--text" v-if="isAuth" @click="logout">
          <v-icon left dark>exit_to_app</v-icon>
          ÇIKIŞ
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- MAIN -->
    <main>
      <router-view></router-view>
    </main>

    <!-- FOOTER -->
    <v-footer></v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'account_circle', title: 'KAYIT OL', link: '/register' },
          { icon: 'power_settings_new', title: 'GİRİŞ YAP', link: '/login' }
        ]
        if (this.$store.getters.isAuth) {
          menuItems = [
            { icon: 'grain', title: 'RAPOR', link: '/rapor' },
            { icon: 'class', title: 'SINIFLAR', link: '/home' }
          ]
        }
        return menuItems
      },
      isAuth () {
        return this.$store.getters.isAuth
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('signOut')
        this.$router.push('/')
      }
    }
  }
</script>
