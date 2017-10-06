<template>
    <v-container>
        <v-layout v-if="error" dense>
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-form @submit.prevent="login" ref="form">
                    <v-text-field
                            label="E-mail"
                            v-model="email"
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            v-model="password"
                            type="password"
                    ></v-text-field>

                    <v-btn type="submit">Giriş</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuth
    },
    error () {
      return this.$store.getters.getError
    }
  },
  watch: {
    auth (isAuth) {
      if (isAuth) {
        this.$router.push('/home')
      }
    }
  },
  methods: {
    validation () {
      return this.email !== '' && this.password !== ''
    },
    login () {
      if (!this.validation()) {
        return
      }

      this.$store.dispatch('signIn', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>

</style>
