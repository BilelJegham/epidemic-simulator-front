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
        <ChartH :series="this.seriesAll"/>
        
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
        this.series = [];
        this.getSeries()
        this.getSeriesTurfu()
  },
  data(){
      return{
        country : 'France',
        data: undefined,
        dataTurfu: undefined,
        date: new Date(),
        disabledDates: date => {
            return (date.getTime() < (new Date(2020,2,21)).getTime()) || (date.getTime() > Date.now())
        }
      }
  },
  watch:{
    date: function () {
        this.getSeriesTurfu();
    }
  },
  computed:{
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
       if(this.dataTurfu && this.country in this.data){
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
          this.axios.get("https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/timeseries.json").then(res => {
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
