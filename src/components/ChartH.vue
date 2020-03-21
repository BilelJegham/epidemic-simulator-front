<template>
    <div>
        <highcharts :options="chartOptions"></highcharts>
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
          series: this.series
        }
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
