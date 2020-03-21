<template>
<div>
    <md-card>
      <md-card-header>
        <div class="md-title">Select the country</div>
      </md-card-header>
      <md-card-content>
        
        <md-field>
          <label for="country">Country</label>
          <md-select v-model="country"  @change="this.getSeries(e)" name="country" id="country">
            <md-option value="France">France</md-option>
            <md-option value="China">China</md-option>
          </md-select>
        </md-field>
        
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
      this.getSeries();
  },
  data(){
      return{
        country : 'France',
        series: [{
					data: [1, 2, 3]
				}]
      }
  },
  watch:{
    country: function () {
        this.getSeries()
    }
  },
  
  methods:{
      getSeries(){
        this.axios.get("https://raw.githubusercontent.com/RemiTheWarrior/epidemic-simulator/master/data/timeseries.json").then(res => {
            
        this.series = [];
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
