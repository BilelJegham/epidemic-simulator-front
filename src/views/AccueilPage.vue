<template>
<div>
    <md-card>
      <md-card-header>
        <div class="md-title">Select the country</div>
      </md-card-header>
      <md-card-content>
           
          <label for="datePicker">Date of simulation</label>
            <md-datepicker name="datePicker" id="datePicker" v-model="date" :md-disabled-dates="disabledDates"/>
              <md-autocomplete v-model="country" id="country" :md-options="this.countries" v-bind:class="{ 'md-invalid': (this.country && this.country.length > 0 && this.countries.indexOf(this.country) === -1) }">
                <label>Country</label> 
                <span class="md-error">There is no simulation of '{{this.country}}' on {{this.date.getFullYear()}}-{{this.date.getMonth()+1}}-{{this.date.getDate()}}</span>
           
              </md-autocomplete>
        

        
      </md-card-content>

  </md-card>
    <md-card v-if="this.countries.indexOf(this.country) !== -1">
      <md-card-header>
        <div class="md-title">{{this.country}}</div>
      </md-card-header>
      <md-card-content>
        <ChartH :series="this.seriesAll"/>
        <p class="text-center"><small>Timezone : UTC+1</small></p>
      </md-card-content>

  </md-card>
  </div>
</template>

<script>
import ChartH from '../components/ChartH.vue'

export default {
  name: 'AccueilPage',
  components: {
    ChartH,
  },
  created(){
    this.getDateSimulation()
    this.getSeries()
    if(this.$route.params && this.$route.params.country)
      this.country = this.$route.params.country
  },
  data(){
      return{
        country : '',
        datesSimulation : [],
        data: undefined,
        dataTurfu: undefined,
        date: new Date(),
        disabledDates: date => {
            return (this.datesSimulation.indexOf(date.getTime()) === -1)
        },
      }
  },
  watch:{
    date: function () {
        this.getSeriesTurfu();
    }
  },
  computed:{
    countries(){
      if(!this.dataTurfu)
        return []
      
      return Object.keys(this.dataTurfu).sort();
    },
    seriesAll(){
      let sAll = [];
      if(this.dataTurfu && this.country in this.dataTurfu){
                
                const dataC = this.dataTurfu[this.country].map(function(elt){
                    return [Date.parse(elt.date.replace(',', '')), elt.cases_sim]
                });
                
                sAll.push({
                    name: "infected - simulation",//+this.country,
                    data: dataC
                })               
                
                const dataR = this.dataTurfu[this.country].map(function(elt){
                    return [Date.parse(elt.date.replace(',', '')), elt.deaths_sim]
                });
                sAll.push({
                    name: "deaths - simulation",//+this.country,
                    data: dataR
                })
                
            }
       if(this.data && this.country in this.data){
                const dataC = this.data[this.country].filter((e) => e.confirmed !== null).map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed]
                });
                
                sAll.push({
                    name: "confirmed",//+this.country,
                    data: dataC,
                    visible: false,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
                
                const dataD = this.data[this.country].filter((e) => e.deaths !== null).map(function(elt){
                    return [Date.parse(elt.date), elt.deaths]
                });
                
                sAll.push({
                    name: "deaths",//+this.country,
                    data: dataD,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
                const dataR = this.data[this.country].filter((e) => e.recovered !== null).map(function(elt){
                    return [Date.parse(elt.date), elt.recovered]
                });
                sAll.push({
                    name: "recovered",//+this.country,
                    data: dataR,
                    visible: false,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
                   const dataA= this.data[this.country].filter((e) => e.confirmed !== null && e.recovered !== null && e.deaths !== null).map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed-elt.recovered-elt.deaths]
                });
                sAll.push({
                    name: "infected",//+this.country,
                    data: dataA,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
            }
      return sAll
    }
  },
  
  methods:{
      getSeriesTurfu(){
        this.axios.get(`https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}.json`).then(res => {
            this.dataTurfu = res.data;
            
         }).catch((e) => {
           console.error(e);
            this.dataTurfu = {}
         });
    },

      getSeries(){
        if(!this.data ){
          this.axios.get("https://pomber.github.io/covid19/timeseries.json").then(res => {
              this.data = res.data;
          })
        }
          
        
      },
      getDateSimulation(){
          this.axios.get("https://api.github.com/repos/RemiTheWarrior/epidemic-simulator/contents/data").then(res => {
              this.datesSimulation = res.data.filter((e) => {
                  if(e.type == "dir" || e.name == "timeseries.json")
                    return false; 
                  else
                    return true;
                }).map((e)=> new Date(e.name.replace('.json','')).getTime());
              this.datesSimulation.sort()
            this.date = new Date(this.datesSimulation[this.datesSimulation.length-1])
            
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
  .text-center{
    margin: 0;
    text-align: center;
  }
</style>
