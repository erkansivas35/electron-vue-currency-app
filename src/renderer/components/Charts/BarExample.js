import { Bar } from './BaseCharts'
import { reactiveData } from './mix'
import { setTimeout } from 'timers';

export default {
  props: {
    labels: {
      type: Array,
      require: true
    },
    datasets: {
      type: Array,
      require: true
    }
  },
  extends: Bar,
  mixins: [reactiveData],
  data: () => ({
    chartData: '',
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  created () {
    this.fillData()
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    setTimeout(() => {
      this.fillData()
    }, 300)
    setInterval(() => {
      this.fillData()
    }, 5000)
  },

  methods: {
    fillData () {
      this.chartData = {
        labels: this.labels,
        datasets: this.datasets
      }
    }
  }
}