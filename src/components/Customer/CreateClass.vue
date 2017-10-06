<template>
    <v-container>
        <form @submit.prevent="_createClass">
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <v-text-field
                        label="Sınıf İsmi"
                        v-model="className"
                        required>
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <!-- Start Date -->
            <v-flex xs12 sm6>
                <v-dialog persistent lazy full-width>
                    <v-text-field
                            slot="activator"
                            label="Başlangıç Tarihi"
                            prepend-icon="event"
                            v-model="dateStart"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="dateStart" scrollable>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-btn flat primary @click.native="cancel()">İptal</v-btn>
                                <v-btn flat primary @click.native="save()">Kaydet</v-btn>
                            </v-card-actions>
                        </template>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
            <!-- ./Start Date -->
            <!-- End Date -->
            <v-flex xs12 sm6>
                <v-dialog persistent lazy full-width>
                    <v-text-field
                            slot="activator"
                            label="Bitiş Tarihi"
                            prepend-icon="event"
                            v-model="dateEnd"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="dateEnd" scrollable>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-btn flat primary @click.native="cancel()">İptal</v-btn>
                                <v-btn flat primary @click.native="save()">Kaydet</v-btn>
                            </v-card-actions>
                        </template>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
            <!-- ./End Data -->
        </v-layout>
        <v-layout row>
            <!-- Start Time -->
            <v-flex xs12 sm6>
                <v-dialog persistent lazy>
                    <v-text-field
                            slot="activator"
                            label="Başlangıç Saati"
                            prepend-icon="access_time"
                            v-model="timeStart"
                            readonly
                    ></v-text-field>
                    <v-time-picker v-model="timeStart" actions>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-btn flat primary @click.native="cancel()">İptal</v-btn>
                                <v-btn flat primary @click.native="save()">Kaydet</v-btn>
                            </v-card-actions>
                        </template>
                    </v-time-picker>
                </v-dialog>
            </v-flex>
            <!-- ./ Start Time -->
            <!-- End Time -->
            <v-flex xs12 sm6>
                <v-dialog persistent lazy>
                    <v-text-field
                            slot="activator"
                            label="Bitiş Saati"
                            prepend-icon="access_time"
                            v-model="timeEnd"
                            readonly
                    ></v-text-field>
                    <v-time-picker v-model="timeEnd" actions>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-btn flat primary @click.native="cancel()">İptal</v-btn>
                                <v-btn flat primary @click.native="save()">Kaydet</v-btn>
                            </v-card-actions>
                        </template>
                    </v-time-picker>
                </v-dialog>
            </v-flex>
            <!-- ./ End Time -->
        </v-layout>
        <v-layout form>
            <v-flex xs12>
                <v-btn :disabled="!formIsValid" type="submit">Oluştur</v-btn>
                <br> bu sınıfta hangi tarihlerde yoklama alınacak <br>
                <b>o tarih aralığının hangi günlerinde?</b> <br>
                o günün hangi saatlerinde <br>
                bu sınıf için yoklama bu aralık için available diğer zamanlar için disable
            </v-flex>
        </v-layout>
        </form>
    </v-container>
</template>

<script>
export default {
  name: 'CreateClass',
  data () {
    return {
      className: '',
      timeStart: new Date(),
      timeEnd: new Date(),
      dateStart: new Date(),
      dateEnd: new Date()
    }
  },
  methods: {
    _createClass () {
      if (!this.isAuth) {
        return
      }
      const classData = {
        className: this.className
      }
      // reaches out to actions method createClass
      this.$store.dispatch('createClass', classData)
      this.$router.push('/home')
    }
  },
  computed: {
    formIsValid () {
      return this.className !== '' && this.className.length > 1
    },
    isAuth () {
      return this.$store.getters.isAuth
    }
  }
}
</script>

<style scoped>

</style>
