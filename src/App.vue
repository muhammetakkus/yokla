<template>
  <v-app light>
    <v-toolbar>
      <v-toolbar-title>YOKLA</v-toolbar-title>
    </v-toolbar>
    <home></home>
  </v-app>
</template>

<script>
  /* Components */
  import Home from '@/components/Home'
  export default {
    data () {
      return {
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ]
      }
    },
    components: {Home}
  }
</script>
