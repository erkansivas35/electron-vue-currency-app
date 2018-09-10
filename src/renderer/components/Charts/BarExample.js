import { Bar } from './BaseCharts'

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
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets
    }, { responsive: true, maintainAspectRatio: false})
  }
}