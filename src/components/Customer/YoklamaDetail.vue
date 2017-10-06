<template>
    <v-layout>
        - {{$route.params.classid}} ID'li sınıfın {{$route.params.tarih}} tarihli yoklama geçmişi <br>
        - user list
    </v-layout>
</template>

<script>
export default {
  name: 'YoklamaDetail'
}
</script>

<style scoped>

</style>
