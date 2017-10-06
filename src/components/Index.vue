<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <h1 style="text-align: center">{{ msg }}</h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'Index Page'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
