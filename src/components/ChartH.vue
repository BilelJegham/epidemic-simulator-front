<template>
    <div>
      <highcharts constructor-type="stockChart" :options="chartOptions"></highcharts>
      
    </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
export default {
  name: 'ChartH',
  props: ["series"],
  components: {
    highcharts: Chart 
  },
  computed: {
    chartOptions(){
      return {
          xAxis: {
            label: {
              enabled: false
            },
            type: 'datetime',
          },
          title: null,
          chart:{
            height:500,
          },
          series: this.series
        }
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
