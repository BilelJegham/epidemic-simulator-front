<template>
  <div v-if="this.series && this.series.length !== 0">
    <highcharts  v-if="!this.disableNumber" constructor-type="stockChart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
export default {
  name: 'ChartH',
  props: ["series", "number"],
  components: {
    highcharts: Chart 
  },
  data(){
    return{
      disableNumber: false
    }
  },
  watch: {
    number: function () {
      this.disableNumber = true
      setTimeout(() => {
        this.disableNumber = false
      },1);
    }
  },
  computed: {
    chartOptions(){
      return {
        legend:{
          enabled: true,
        },
        time: {
            useUTC: false,
        },
        xAxis: {
          type: (this.number) ? 'linear': 'datetime',
        },
        title: null,
        chart:{
          height:550,
        },
        tooltip:{
          valueDecimals: 0
        },
        series: this.series
      }
        
    }
  }
}
</script>