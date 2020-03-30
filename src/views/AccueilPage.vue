<template>
<div>
    <md-card>
      <md-card-header>
        <div class="md-title">Select the country</div>
      </md-card-header>
      <md-card-content>
           
        <label for="datePicker">Date of simulation</label>
        <md-datepicker name="datePicker" id="datePicker" v-model="date" :md-disabled-dates="disabledDates"/>
            
        <md-field>               
          <label>Country</label> 
          <md-select v-model="country" id="country" multiple>
            <md-option v-for="c in this.countries" v-bind:key="c" :value="c">{{c}}</md-option>
          </md-select>
        </md-field>
        

        
      </md-card-content>

  </md-card>
    <md-card v-if="this.country.length > 0">
      <md-card-header>
        <div class="md-title">{{this.country.join(', ')}}</div>
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
      this.country = this.$route.params.country.split(',')
  },
  data(){
      return{
        country : [],
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
      let series = []
      this.country.map((c) => {
        let s =  this.getSeriesCountry(c)
        series= [...series,...s]
      });
      return series;
    },
    
  },
  
  methods:{
    getSeriesCountry(country){
      let sAll = [];
      if(this.dataTurfu && country in this.dataTurfu){
                
                const dataC = this.dataTurfu[country].map(function(elt){
                    return [Date.parse(elt.date.replace(',', '')), elt.cases_sim]
                });
                
                sAll.push({
                    name: "infected - simulation "+country,
                    data: dataC
                })               
                
                const dataR = this.dataTurfu[country].map(function(elt){
                    return [Date.parse(elt.date.replace(',', '')), elt.deaths_sim]
                });
                sAll.push({
                    name: "deaths - simulation "+country,
                    data: dataR
                })
                
                
            }
       if(this.data && country in this.data){
                const dataC = this.data[country].map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed]
                });
                
                sAll.push({
                    name: "confirmed "+country,
                    data: dataC,
                    visible: false,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
                
                const dataD = this.data[country].map(function(elt){
                    return [Date.parse(elt.date), elt.deaths]
                });
                
                sAll.push({
                    name: "deaths "+country,
                    data: dataD,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
                const dataR = this.data[country].map(function(elt){
                    return [Date.parse(elt.date), elt.recovered]
                });
                sAll.push({
                    name: "recovered "+country,
                    data: dataR,
                    visible: false,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
                   const dataA= this.data[country].map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed-elt.recovered-elt.deaths]
                });
                sAll.push({
                    name: "infected "+country,
                    data: dataA,
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                })
            }
      return sAll
    },
      getSeriesTurfu(){
        this.axios.get(`https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}.json`).then(res => {
            this.dataTurfu = res.data;
            
          this.country = this.country.filter((c) => this.countries.indexOf(c) !== -1);
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
