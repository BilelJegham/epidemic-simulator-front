<template>
<div>
    <md-card>
      <md-card-header>
        <div class="md-title">Select the country</div>
      </md-card-header>
      <md-card-content>
        
          <md-autocomplete v-model="country" id="country" :md-options="this.countries">
            <label>Country</label>
          </md-autocomplete>
        
          <label for="datePicker">Date of simulation</label>
            <md-datepicker name="datePicker" id="datePicker" v-model="date" :md-disabled-dates="disabledDates"/>

        
      </md-card-content>

  </md-card>
    <md-card v-if="this.country">
      <md-card-header>
        <div class="md-title">{{this.country}}</div>
      </md-card-header>
      <md-card-content>
        <ChartH :series="this.seriesAll"/>
        
      </md-card-content>

  </md-card>
  </div>
</template>

<script>
import ChartH from '../components/ChartH.vue'
const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)

export default {
  name: 'AccueilPage',
  components: {
    ChartH,
  },
  created(){
    this.getSeries()
    this.getSeriesTurfu()
    if(this.$route.params && this.$route.params.country)
      this.country = this.$route.params.country
  },
  data(){
      return{
        country : '',
        data: undefined,
        dataTurfu: undefined,
        date: yesterday,
        disabledDates: date => {
            return (date.getTime() < (new Date(2020,2,21)).getTime()) || (date.getTime() > yesterday.getTime())
        }
      }
  },
  watch:{
    date: function () {
        this.getSeriesTurfu();
    }
  },
  computed:{
    countries(){
      if(!this.data)
        return []
      
      return Object.keys(this.dataTurfu)
    },
    seriesAll(){
      let sAll = [];
      if(this.dataTurfu && this.country in this.dataTurfu){
                
                const dataC = this.dataTurfu[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.cases_sim]
                });
                
                sAll.push({
                    name: "Cases sim - "+this.country,
                    data: dataC
                })               
                
                const dataR = this.dataTurfu[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.deaths_sim]
                });
                sAll.push({
                    name: "Deaths sim - "+this.country,
                    data: dataR
                })
                
            }
       if(this.data && this.country in this.data){
                const dataC = this.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed]
                });
                
                sAll.push({
                    name: "confirmed - "+this.country,
                    data: dataC
                })
                
                const dataD = this.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.deaths]
                });
                
                sAll.push({
                    name: "deaths - "+this.country,
                    data: dataD
                })
                const dataR = this.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.recovered]
                });
                sAll.push({
                    name: "recovered - "+this.country,
                    data: dataR
                })
                
            }
      return sAll
    }
  },
  
  methods:{
      getSeriesTurfu(){
        this.axios.get(`https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}.json`).then(res => {
            this.dataTurfu = res.data;
            
         }).catch(() => {
            this.dataTurfu = {}
         });
    },

      getSeries(){
        if(!this.data ){
          this.axios.get("https://pomber.github.io/covid19/timeseries.json").then(res => {
              this.data = res.data;
          })
        }
          
        
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .md-card {
    margin: 1rem;
  }
</style>
