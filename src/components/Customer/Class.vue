<template>
    <v-container>
        - class detail
        - change class name
        - class sil -içerisindeki bütün öğrencilerle birlikte silmek istiyor musun?
        - bu class'a ait öğrenci listesi
        - öğrenci ekle-çıkar

        <br>

        {{ $route.params.id }}
    </v-container>
</template>

<script>
export default {
  name: 'class'
}
</script>

<style scoped>

</style>
