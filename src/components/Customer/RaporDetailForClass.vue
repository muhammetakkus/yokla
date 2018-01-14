<template>
    <v-container>
        {{$store.getters.getClassesForRapor}}
        <v-layout row>
            <v-flex xs2 v-for="item in raporIntervalButtons">
                <v-btn block ref="button"
                       :class="{green: false, 'white--text': false}"
                       @click="buttonIntervalData(item.order)">
                    {{item.value}}
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-text-field label="Raporlama Aralığı" type="integer" v-model.number="raporInterval"></v-text-field>
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
            <!-- Finish Date -->
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
            <!-- ./Finish Data -->
        </v-layout>
        <!-- -->
        <v-layout row wrap>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-btn block class="error" @click.native="raporla()">RAPORLA</v-btn>
                </div>
            </v-flex>
        </v-layout>
        <!-- CHART -->
        <v-layout row class="bar-vue-chart">
            <bar :chart-data="databarbar"></bar>
        </v-layout>
    </v-container>
</template>

<script>
    // import { Bar } from 'vue-chartjs'
    import LineChart from './LineChart.js'
    import Bar from './BarChart.js'
    import firebase from 'firebase'
    import Time from '@/lib/time'
    export default {
      name: 'RaporDetailForClass',
      components: {
        'line-chart': LineChart,
        'bar': Bar
      },
      data () {
        return {
          chartOptions: {
            scales: {
              xAxes: [{barPercentage: 0.8, categoryPercentage: 0.5}],
              yAxes: [{id: 'y-axis-density'}, {id: 'y-axis-gravity'}]
            }
          },
          /* CHART DATA */
          chartData: {
            labels: [], // bunu arttırmayı unutma
            datasets: []
          },
          // line
          datacollection: null,
          databarbar: null,
          /* Rapor Data */
          raporIntervalButtons: [
            {value: 3, order: 0},
            {value: 5, order: 1},
            {value: 7, order: 2}
          ],
          classes: [],
          result: [], // ?
          //
          classNames: [],
          // rapor değerleri oluşturulurken kullanılacak değişkenler
          startingDateGetTime: 0,
          finishDateGetTime: 0,
          yoklamaTime: 0,
          yoklamaDate: 0,
          yoklamaGetTime: 0,
          //
          thereIs: 0,
          thereIsPercent: 0,
          countYoklamaValue: 0,
          // geçici array
          storePercent: [],
          //
          startingDate: '',
          finishDate: '',
          // kaç günlük rapor çıktısı verilecek
          raporInterval: 3,
          // chart'a geçmeden önce percent'lerin tutulduğu array
          beforeChartData: [],
          // bir sınıfa ait datalardan raporInterval kadarının toplamının tutulduğu dizi
          sumPercent: 0,
          raporCalculateCounter: 0
        }
      },
      methods: {
        fillData () {
          this.datacollection = {
            labels: ['L1', 'L2'],
            datasets: [
              {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [12, 25]
              }, {
                label: 'Data One',
                backgroundColor: '#83cbf8',
                data: [1, 2]
              }
            ]
          }
        },
        databar () {
          // mouse chart üzerinde oynadıkça transition null hatasını veriyor
          this.databarbar = this.chartData
        },
        /* Raporlama buton seçeneklerindeki sayıyı değişkene aktar */
        buttonIntervalData: function (order) {
          // console.log(this.$refs.button[order].$el.innerText)
          this.raporInterval = parseInt(this.$refs.button[order].$el.innerText)
        },
        raporla () {
          // Rapor Sayfasında Seçilen Class ID 'leri al
          this.classes = this.$store.getters.getClassesForRapor
          this.raporData()
          this.getClassNames()
        },
        getClassNames () {
          this.classNames = this.$store.getters.getCheckedClassNamesForRapor
        },
        raporData () {
          // raporlanması istenilen tarih aralığı
          this.startingDateGetTime = new Date(this.startingDate).getTime()
          this.finishDateGetTime = new Date(this.finishDate).getTime()
          // Count Rapor Classes
          let countClass = Object.values(this.classes).length
          // Classes Keys | Array
          let classKeys = Object.keys(this.classes)
          for (let i = 0; i < countClass; i++) {
            firebase.database().ref('yoklama/' + classKeys[i]).once('value').then(database => {
              this.calculateRapor(database.val(), i)
            }).then(() => {
              if (i === (countClass - 1)) {
                this.databar()
                this.chartData = null
                this.chartData = {
                  labels: [],
                  datasets: []
                }
              }
            })
          }
        },
        /* Gelen rapor datalarını seçilen tarihe göre filitreleyip yoklama oranlarını hesapla */
        calculateRapor (data, turn) {
          const beforeChartData = []
          // sıfırla chart data - bunları nerede sıfırlayacağım?? - bütün sınıfların hesaplamaları bitince sıfırlanacak
          this.chartData.labels.length = 0
          // this.chartData.datasets.length = 0
          // sıfırla rapor data
          beforeChartData.length = 0
          this.storePercent.length = 0
          this.sumPercent = 0
          this.raporCalculateCounter = 0
          // raporu hesapla
          for (let time in data) {
            this.yoklamaTime = new Time().convertTimeEnToTr(time.split('_')[0])
            this.yoklamaDate = time.split('_')[1]
            // Yoklama alınan tarih
            this.yoklamaGetTime = new Date(this.yoklamaTime + ' ' + this.yoklamaDate).getTime()
            // getTime'ı alınan yokalam tarihlerinden istenilen aralıkta olanların yoklama yüzdesini hesapla
            this.calculatePercent(this.yoklamaGetTime, data[time])
          }
          // 1-30 aralık seçildi + 5 günlük rapor isteniyor + 20 yoklama var
          // [1,2,....,20] => [1,2,3,4]( buradan grafiğe aktarılacak 4 parça oran çıktı )
          // data'da tanımlanan array - , __ob__: Observer - şeklinde oluyor. Bu şekilde old. için array içerisine push edildiğinde data görünmedi bundan dolayı burada normal bir değişken şeklinde tanımlayıp kullandım
          // chart data hesapla
          this.storePercent.filter(percent => {
            this.sumPercent = this.sumPercent + percent
            this.raporCalculateCounter++
            if (this.raporCalculateCounter === this.raporInterval) {
              this.sumPercent = parseInt(this.sumPercent.toFixed(0))
              beforeChartData.push(this.sumPercent)
              this.raporCalculateCounter = 0
              this.sumPercent = 0
            }
          })
          // *****burada bir diziye label ve dataset objeleri her sınıf için bir obje olacak şekilde depolanacak
          // *****bu dizi değişkeni en son sınıfın firebase datası dönüp hesap yapılınca chart'a render edilecek
          // [ [123, 45], [45, 66] ]
          // prepare chart data
          console.log(beforeChartData) // [3] [12 , 33]
          /* gün/hafta/rapor dönemi */
          /* seçilen sınıfların tamamında aynı sayıda yoklama olduğu varsayıldığı için bu değerin her sınıfta aynı olacak */
          let xlabels = this.storePercent.length / this.raporInterval
          for (let i = 1; i <= xlabels; i++) {
            this.chartData.labels.push('AX' + i)
          }
          let color = ['red', 'blue']
          console.log(turn)
          // this.chartData.datasets.push({label: 'test-X', data: [42], backgroundColor: 'red'})
          this.chartData.datasets.push({label: this.classNames[turn], data: beforeChartData, backgroundColor: color[turn]})
          console.log(this.chartData.labels)
          console.log(this.chartData.datasets)
          /* şimdi label ve datasets 'i bütün sınıfların objelerini oluşturucak şekilde oluşup --
           * chartDatayı hazırla
            * firebase işlemleri bitince de zaten chartData chart'a pass edilecek. */
        },
        calculatePercent (yoklamaGetTime, yoklama) {
          if (this.finishDateGetTime >= yoklamaGetTime && yoklamaGetTime >= this.startingDateGetTime) {
            // key -> x tarihli yolama'nın id'si
            for (let key in yoklama) {
              // bir yoklama objesi [true,false,false,true,true]
              let values = Object.values(yoklama[key])
              // 100% olacak değer (toplam adet)
              this.countYoklamaValue = values.length
              // thereIs'i true kadar arttır (var olan sayısı)
              values.filter(val => { if (val === true) { this.thereIs++ } })
              this.thereIsPercent = (this.thereIs * 100) / this.countYoklamaValue
              this.storePercent.push(this.thereIsPercent / this.raporInterval)
              //
              this.thereIs = 0
            }
          }
        }
      }
    }
</script>