<template>
    <v-container>
        <router-link v-for="url in testURL" :to="url.link" tag="div" :key="url.link">
            <v-layout row class="v-layout">
                <v-flex>
                    <v-card dark class="accent">
                        <v-card-text>BU x tarihli YOKLAMASINI GÖR</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </router-link>
    </v-container>
</template>

<script>
export default {
  name: 'ViewYoklamaHistory',
  data () {
    return {
      testURL: [
        { link: '/yoklama-detail/' + this.$route.params.classid + '/2017' },
        { link: '/yoklama-detail/' + this.$route.params.classid + '/2016' }
      ]
    }
  }
}
</script>

<style scoped>
    .v-layout {
        margin-bottom: 10px;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px
    }
</style>
