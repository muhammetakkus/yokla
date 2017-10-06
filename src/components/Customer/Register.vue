<template>
    <v-container>
        <v-layout v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-form ref="form" @submit.prevent="register">
                    <v-text-field
                            label="E-mail"
                            v-model="email"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Şifre"
                            v-model="password"
                            type="password"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Şifre tekrar"
                            v-model="confirm_password"
                            type="password"
                            required
                            :rules="[(!comparePassword) || 'Şifreler Eşleşmiyor']"
                    ></v-text-field>

                    <v-btn type="submit">Kayıt Ol</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    comparePassword () {
      // ilk koşul -> eşitlik yoksa true dönsün - bkz: boşken eşitlik var yani false döner
      return (this.password !== this.confirm_password &&
                this.password.length > 0 &&
                this.confirm_password.length > 0)
    },
    auth () {
      return this.$store.getters.isAuth
    },
    error () {
      return this.$store.getters.getError
    }
  },
  watch: {
    // bu customer computed property ile aynı isimde oluşturunca return ettiği değeri arg olarak
    // alıyor sanırım ? ama normal text return edince onu niye almıyor || basmıyor
    // computed'daki değer değişince basıyor olabilir mi ? text static old. için değişmiyor
    auth (isAuth) {
      if (isAuth) {
        this.$router.push('/home')
      }
    },

    '$route' (to, from) {
      // react to route changes...
    }
  },
  methods: {
    register () {
      if (this.comparePassword) {
        return
      }
      const customerData = { email: this.email, password: this.password }
      this.$store.dispatch('createCustomer', customerData)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>

</style>
