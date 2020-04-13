<template>
  <v-app dark>
    <md-card>
      <md-card-header>
        <div class="md-title">Select the country</div>
      </md-card-header>
      <md-card-content>
           
        <label for="datePicker">Date of simulation</label>
        <md-datepicker name="datePicker" id="datePicker" v-model="date" :md-disabled-dates="disabledDates"/>
      
        <v-autocomplete
          v-model="countriesSelect" 
          :items="countries"
          label="Country"
          multiple
          dark
        ></v-autocomplete>
      
      </md-card-content>

    </md-card>
    <md-card v-if="this.countriesSelect.length > 0">
      <md-card-header>
        <div class="md-title">{{this.countriesSelect.join(', ')}}</div>
      </md-card-header>
      <md-card-content>
        <ChartH v-if="this.number" :series="this.seriesAllNumber" :number="true"/>
        <ChartH  v-else :series="this.seriesAll" />
         <p class="text-center"><md-switch v-model="number" class="md-primary">Compare country</md-switch><br/>
         <small>Timezone : UTC+1</small></p>
      </md-card-content>
    </md-card>
  </v-app>
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
      this.countriesSelect = this.$route.params.country.split('|')
  },
  data(){
      return{
        countriesSelect : [],
        datesSimulation : [],
        data: undefined,
        dataTurfu: undefined,
        number: false,
        date: new Date(),
        disabledDates: date => {
            return (this.datesSimulation.indexOf(date.getTime()) === -1)
        },
      }
  },
  watch:{
    date: function () {
        this.getSeriesTurfu();
    },
  },
  computed:{
    countries(){
      if(!this.dataTurfu)
        return []
      
      return Object.keys(this.dataTurfu).sort();
    },
    seriesAll(){
      let series = []
      this.countriesSelect.map((c) => {
        let s =  this.getSeriesCountry(c, series.length)
        series= [...series,...s]
      });
      return series;
    },
    seriesAllNumber(){
      let series = []
      this.countriesSelect.map((c) => {
        
        const s =  this.getSeriesCountry(c, series.length)
        console.log(s)
        const index = s.find((e) => e.index).data.findIndex((value)=> {
          console.log(value)
          return (value[1] > 45 )
        })
        const sCountry =  s.map((serie) => {
          let d = serie.data;
          if(index != 0)
            d= d.slice(index)

          return{
            ...serie,
            pointStart: 1,
            data: d.map((d)=> d[1])
          }
        });
        series= [...series,...sCountry]
      });
      return series;
    },
    
  },
  
  methods:{
    getSeriesCountry(country, index){
      let sAll = [];
      if(this.dataTurfu && country in this.dataTurfu){
                
                const dataC = this.dataTurfu[country].map(function(elt){
                    return [Date.parse(elt.date.replace(',', '')), elt.cases_sim]
                });
                
                sAll.push({
                    name: "infected - simulation "+country,
                    data: dataC,
                    colorIndex: index
                })               
                
                const dataR = this.dataTurfu[country].map(function(elt){
                    return [Date.parse(elt.date.replace(',', '')), elt.deaths_sim]
                });
                sAll.push({
                    name: "deaths - simulation "+country,
                    data: dataR,
                    colorIndex: index+1
                })
                
                
            }

       if(this.data && country in this.data){
                const dataC = this.data[country].filter((e) => e.confirmed !== null).map(function(elt){
                    return [Date.parse(elt.date), elt.confirmed]
                });
                
                sAll.push({
                    index: true,
                    name: "confirmed "+country,
                    data: dataC,
                    visible: false,
                    marker: {
                        enabled: true,
                    },
                    colorIndex: index+2
                })
                

                const dataD = this.data[country].filter((e) => e.deaths !== null).map(function(elt){
                    return [Date.parse(elt.date), elt.deaths]
                });
                
                sAll.push({
                    name: "deaths "+country,
                    data: dataD,
                    marker: {
                        enabled: true,
                    },
                    colorIndex: index+3
                })

              const dataR = this.data[country].filter((e) => e.recovered !== null).map(function(elt){

                    return [Date.parse(elt.date), elt.recovered]
                });
                sAll.push({
                    name: "recovered "+country,
                    data: dataR,
                    visible: false,
                    marker: {
                        enabled: true,
                    },
                    colorIndex: index+4
                })

                const dataA= this.data[country].filter((e) => e.confirmed !== null && e.recovered !== null && e.deaths !== null).map(function(elt){

                    return [Date.parse(elt.date), elt.confirmed-elt.recovered-elt.deaths]
                });
                sAll.push({
                    name: "infected "+country,
                    data: dataA,
                    marker: {
                        enabled: true,
                    },
                    colorIndex: index+5
                })
           }
      return sAll
    },
      getSeriesTurfu(){
        this.axios.get(`https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}.json`).then(res => {
            this.dataTurfu = res.data;
            
          this.countriesSelect = this.countriesSelect.filter((c) => this.countries.indexOf(c) !== -1);
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
  #app .v-application{
    background: none;
  }
</style>
