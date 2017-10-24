<template>
    <v-container>
        <v-btn @click="back">İPTAL</v-btn>
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
                    <v-text-field slot="activator" label="Başlangıç Tarihi" prepend-icon="event"
                            v-model="startingDate"
                            readonly
                    ></v-text-field>
                    <v-date-picker
                            v-model="startingDate"
                            scrollable locale="tr-tr">
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
                            v-model="finishDate"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="finishDate"
                                   scrollable
                                   locale="tr-tr">
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
                            v-model="startingTime"
                            readonly
                    ></v-text-field>
                    <v-time-picker v-model="startingTime" actions format="24hr">
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
                            v-model="finishTime"
                            readonly
                    ></v-text-field>
                    <v-time-picker v-model="finishTime" actions format="24hr">
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
        <v-layout>
            <v-flex xs12 sm6>
                <v-subheader v-text="'Yoklama Alınacak Günler'"></v-subheader>
            </v-flex>
            <v-flex xs12 sm6>
                <v-select
                        label="Yoklama Alınacak Günler"
                        v-bind:items="days"
                        v-model="selectedDays"
                        multiple
                        chips
                        hint="Yoklama Alınacak Günler"
                        persistent-hint
                ></v-select>
            </v-flex>
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
import Time from '@/lib/time'
export default {
  name: 'CreateClass',
  data () {
    return {
      className: '',
      startingDate: '',
      finishDate: '',
      startingTime: '',
      finishTime: '',
      allowedDates: [],
      days: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      selectedDays: [],
      availableDates: []
    }
  },
  created () {
    /* tarihi datepicker'a başlangıçta year-month-day şeklinde tarihi veriyoruz
       çünkü datepicker tr gösterip en fotmatında çıktı veriyor/alıyor */
    this.startingDate = new Time().getTimeEN()
    this.finishDate = new Time().getTimeEN()
    //
    this.startingTime = new Time().getHourAndMin()
    this.finishTime = new Time().getHourAndMin()
  },
  methods: {
    _createClass () {
      //
      if (!this.isAuth) {
        return
      }
      //
      let trStartingDate = new Time().convertTimeEnToTr(this.startingDate)
      let trFinishDate = new Time().convertTimeEnToTr(this.finishDate)
      //
      this.availableDates.length = 0
      this.selectedDays.map(day => {
        if (day === 'Pazar') {
          this.availableDates.push(0)
        }
        if (day === 'Pazartesi') {
          this.availableDates.push(1)
        }
        if (day === 'Salı') {
          this.availableDates.push(2)
        }
        if (day === 'Çarşamba') {
          this.availableDates.push(3)
        }
        if (day === 'Perşembe') {
          this.availableDates.push(4)
        }
        if (day === 'Cuma') {
          this.availableDates.push(5)
        }
        if (day === 'Cumartesi') {
          this.availableDates.push(6)
        }
      })
      //
      const classData = {
        className: this.className,
        startingDate: trStartingDate,
        finishDate: trFinishDate,
        startingTime: this.startingTime,
        finishTime: this.finishTime,
        availableDates: this.availableDates
      }
      console.log(classData)
      // reaches out to actions method createClass
      this.$store.dispatch('createClass', classData)
      this.$router.push('/home')
    },
    back () {
      this.$router.go(-1)
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
