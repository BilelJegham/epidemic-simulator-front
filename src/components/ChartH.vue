<template>
  <div v-if="this.series && this.series.length !== 0">
    <highcharts constructor-type="stockChart" :options="chartOptions"></highcharts>
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
  computed: {
    dateStart(){
      const data = this.series.find((e) => e.index).data.find((a, value)=> {
        return (value > 45 )
      })
      return data[0]
    },
    chartOptions(){
      const dateStart = this.dateStart
      return {
        legend:{
          enabled: true,
        },
        time: {
            useUTC: false,
        },
        xAxis: {
          labels: {
            formatter: (!this.number) ? null : function() {
              const oneDay = 24 * 60 * 60 * 1000; 
              const diffDays = Math.round(((this.value - dateStart ) / oneDay));
              return diffDays;
            }
          },
          type: 'datetime',
          
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