<template>
    <v-container>
        <!-- Search Bar -->
        <v-layout row wrap>
            <v-flex xs12 class="my-3">
                <v-card>
                    <v-toolbar color="primary" dense>
                        <v-toolbar-title>SINIF ARA</v-toolbar-title>
                    </v-toolbar>
                    <v-container fluid class="px-3">
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field label="Sınıf" v-model="searchedClass"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <!-- -->
        <v-layout row wrap>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-btn block class="error" @click="raporlaDetail">RAPORLA</v-btn>
                </div>
            </v-flex>
        </v-layout>
        <!-- Class List -->
        <v-layout row>
            <v-flex xs12>
                {{check}}
                <v-card class="text-xs-center">
                    <!-- -->
                    <v-toolbar class="white--text indigo" dark dense>
                        <v-toolbar-title>SINIFLAR</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <!-- Loading -->
                        <v-progress-circular indeterminate class="primary--text text-sm-center" :width="7" :size="70" v-if="loading"></v-progress-circular>
                        <!-- Class List -->
                        <v-list-tile v-for="item in filterClasses" v-bind:key="item.id">
                            <v-list-tile-content>
                                <v-checkbox v-model="check[item.id]"></v-checkbox>
                            </v-list-tile-content>
                            <v-list-tile-content style="cursor: pointer">
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <!--
                            <v-list-tile-action v-if="!chechboxStatus">
                                <v-btn flat :to="/class-rapor-detail/+item.id">Rapor</v-btn>
                            </v-list-tile-action>
                            -->
                        </v-list-tile>
                        <!-- -->                                                                                                                                                                                                                
                        <message :message="message" v-if="filterClasses.length === 0 && loading === false"></message>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
      name: 'rapor',
      data () {
        return {
          classes: {},
          check: {},
          message: 'Kayıtlı Bir Sınıf Bulunamadı.',
          length: 0,
          searchedClass: '',
          className: []
        }
      },
      created () {
        this.$store.dispatch('classForRapor', '')
        this.getClasses
        //
        for (let key in this.getClasses) {
          this.check[this.getClasses[key].id] = false
        }
      },
      computed: {
        getClasses () {
          this.classes = this.$store.getters.getAllClasses
        },
        filterClasses () {
          return this.findMatches(this.searchedClass, this.classes)
        },
        loading () {
          return this.$store.getters.getLoading
        }
      },
      methods: {
        // class search filter
        findMatches (className, classes) {
          return classes.filter(val => {
            const regex = new RegExp(className, 'gi')
            // return {name: val.name.match(regex), id: val.id, created: val.create} bu niye çalışmıyor
            return val.name.match(regex) // bu nasıl objyi dönüyor-sanırım koşul sağlanan adımda gelen değeri dönüyor
          })
        },
        raporlaDetail () {
          // üst üste check-uncheck yapınca bir şeyler karışıyor ama çözemedim
          // bu aşağıda class name'lerininde doğru alınmamasına sebep oluyor - eğer uncheck-check yapılırsa
          for (let i = 0; i < Object.keys(this.check).length; i++) {
            if (Object.values(this.check)[i] === false) {
              delete this.check[Object.keys(this.check)[i]]
            }
          }
          // class name
          for (let i = 0; i < this.classes.length; i++) {
            if (this.classes[i].id === Object.keys(this.check)[i]) {
              this.className.push(this.classes[i].name)
            }
          }
          //
          this.$store.dispatch('checkedClassNamesForRapor', this.className)
          this.$store.dispatch('classForRapor', this.check)
          this.$router.push('class-rapor-detail')
        }
      }
    }
</script>