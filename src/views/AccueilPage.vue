<template>
<div>
    <md-card>
      <md-card-header>
        <div class="md-title">Select the country</div>
      </md-card-header>
      <md-card-content>
        
        <md-field>
          <label for="country">Country</label>
          <md-select v-model="country"  name="country" id="country">
            <md-option value="France">France</md-option>
            <md-option value="China">China</md-option>
          </md-select>
        </md-field>
        
        <div>
          <label for="datePicker">Date of simulation</label>
            <md-datepicker name="datePicker" id="datePicker" v-model="date" :md-disabled-dates="disabledDates"/>
        </div>
        
      </md-card-content>

  </md-card>
    <md-card v-if="this.country">
      <md-card-header>
        <div class="md-title">{{this.country}}</div>
      </md-card-header>
      <md-card-content>
        <ChartH :series="this.series"/>
        
      </md-card-content>

  </md-card>
  </div>
</template>

<script>
import ChartH from '../components/ChartH.vue'

export default {
  name: 'AccueilPage',
  components: {
    ChartH 
  },
  created(){
        this.series = [];
        this.getSeries()
        this.getSeriesTurfu()
  },
  data(){
      return{
        country : 'France',
        series: [],
        date: new Date(),
        disabledDates: date => {
            return (date.getTime() < (new Date(2020,2,21)).getTime()) || (date.getTime() > Date.now())
        }
      }
  },
  watch:{
    country: function () {
        this.series = []
        this.getSeries()
        this.getSeriesTurfu()
    }
  },
  
  methods:{
      getSeriesTurfu(){
        this.axios.get(`https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}.json`).then(res => {
            if(this.country in res.data){
                
                const dataC = res.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.cases_sim]
                });
                
                this.series.push({
                    name: "Cases sim - "+this.country,
                    data: dataC
                })               
                
                const dataR = res.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.deaths_sim]
                });
                this.series.push({
                    name: "Deaths sim - "+this.country,
                    data: dataR
                })
                
            }
         })
    },

      getSeries(){
        this.axios.get("https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/timeseries.json").then(res => {
            
            if(this.country in res.data){
                const dataC = res.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed]
                });
                
                this.series.push({
                    name: "confirmed - "+this.country,
                    data: dataC
                })
                
                const dataD = res.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.deaths]
                });
                
                this.series.push({
                    name: "deaths - "+this.country,
                    data: dataD
                })
                const dataR = res.data[this.country].map(function(elt){
                    return [Date.parse(elt.date), elt.recovered]
                });
                this.series.push({
                    name: "recovered - "+this.country,
                    data: dataR
                })
                
            }
        })
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
