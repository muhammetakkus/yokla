<template>
    <v-alert error dismissible @input="onClose" :value="true">
        {{ text }}
    </v-alert>
</template>

<script>
    export default {
      props: ['text'],
      methods: {
        onClose () {
          this.$emit('dismissed')
        }
      }
    }
</script>

<style scoped>
    .alert {
        padding: 10px;
        border: none;
    }
</style>
<!-- Bu componenti ana instance'a component olarak entegre edip Register-Login sayfalarında kullandık-->
<!-- bu componente @input olduğunda buradaki onClose methodu parent componente-- -->
<!-- --dismissed key'i gönderdi?? bu componenti kullandığımız yerde karşılayıp ona bir method atadık-->
<!-- aynı zamanda oradan value geçip buradan karşıladık. :text değişkenine değer bind edip buradan
     props ile aldık. sadece buradaki emit olayını anlamdım?