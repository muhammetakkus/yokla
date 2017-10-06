<template>
    <v-layout row>
        <v-flex xs12 sm10 offset-sm1>
            {{check}}
            <v-card>
                <v-toolbar class="white--text indigo" dark dense>
                    <v-toolbar-title>YOKLAMA AL</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="item in users" :key="item.id">
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-checkbox></v-checkbox>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-btn outline class="indigo--text">YOKLA</v-btn>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'yokla',
  props: ['classid'],
  data () {
    return {
      check: []
    }
  },
  mounted () {
    // neden array'a atama yapmıyor
    this.users.forEach(user => {
      this.check[user.id] = false
    })
  },
  computed: {
    users () {
      /* buradan parametre gönderilip karşıdan alınıyor fakat oradaki find metodundan
            dönen değerler başarılı bir şekilde alınmıyor */
      return this.$store.getters.loadedUsers
    }
  }
}
</script>

<style scoped>

</style>
