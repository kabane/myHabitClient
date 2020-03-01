<script>
  import { mapGetters } from 'vuex'
  import VueCharts from 'vue-chartjs'
  import { Bar, mixins } from 'vue-chartjs'
  
  export default {
    mixins: [Bar, mixins.reactiveData],
    name: 'chart',
    extends: Bar,
    data () {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: '時間',
              data: [],
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              fill: false,
              lineTension: 0.3,
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'タスクカテゴリー'
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        labels: 'todo_summary/labels',
        datum: 'todo_summary/datum'
      })
    },
    mounted () {
      this.$store.dispatch('todo_summary/fetch', {}).then(function(){
        const chartData = Object.assign({}, this.chartData)
        chartData.labels = this.labels
        chartData.datasets[0].data = this.datum
        this.renderChart(chartData, this.options)
      }.bind(this))
      
    }
  }
</script>

<style lang="scss" scoped>
</style>
