<template>
    <v-container>
        <!-- Page Loading -->
        <v-layout v-if="pageLoading" class="text-xs-center">
            <v-flex xs12>
                <v-progress-circular indeterminate class="primary--text text-xs-center" :width="7" :size="70"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-card class="pa-3" v-if="!pageLoading">
            <!-- Alert Component -->
            <v-layout v-if="error" dense>
                <v-flex xs12 sm6 offset-sm3>
                    <app-alert @dismissed="onDismissed" :text="error"></app-alert>
                </v-flex>
            </v-layout>
            <!-- Login Form -->
            <v-layout dense>
                <v-flex xs12 sm6 offset-sm3>
                    <v-form @submit.prevent="login" ref="form">
                        <v-text-field
                                label="E-mail"
                                v-model="email"
                                solo
                                prepend-icon="person_outline"
                                class="mb-2"
                        ></v-text-field>
                        <v-text-field
                                label="Password"
                                v-model="password"
                                type="password"
                                solo
                                prepend-icon="lock_outline"
                                class="mb-2"
                        ></v-text-field>

                        <v-btn type="submit" dark block>Giriş</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-card>
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
    pageLoading () {
      return this.$store.getters.getPageLoading
    },
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
