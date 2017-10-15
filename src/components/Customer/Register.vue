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
            <!-- Register Form -->
            <v-layout dense>
                <v-flex xs12 sm6 offset-sm3>
                    <v-form ref="form" @submit.prevent="register">
                        <v-text-field
                                label="Kurum Adı"
                                v-model="kurum_name"
                                required
                                solo
                                prepend-icon="home"
                                class="mb-2"
                        ></v-text-field>
                        <v-text-field
                                label="E-mail"
                                v-model="email"
                                required
                                solo
                                prepend-icon="person_outline"
                                class="mb-2"
                        ></v-text-field>
                        <v-text-field
                                label="Şifre"
                                v-model="password"
                                type="password"
                                required
                                solo
                                prepend-icon="lock_outline"
                                class="mb-2"
                        ></v-text-field>
                        <v-text-field
                                label="Şifre tekrar"
                                v-model="confirm_password"
                                type="password"
                                required
                                solo
                                prepend-icon="lock_outline"
                                class="mb-2"
                                :rules="[(!comparePassword) || 'Şifreler Eşleşmiyor']"
                        ></v-text-field>

                        <v-btn type="submit" dark block>Kayıt Ol</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      kurum_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    pageLoading () {
      return this.$store.getters.getPageLoading
    },
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
      const customerData = { kurum_name: this.kurum_name, email: this.email, password: this.password }
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
