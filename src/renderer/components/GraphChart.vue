<template>
  <bar-example :labels="labels" :datasets="datasets" />
</template>

<script>
import BarExample from "./Charts/BarExample.js";
import { triggerAsyncId } from "async_hooks";
import moment from "moment";
import { setInterval, setTimeout } from "timers";

export default {
  props: {
    chartData: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    BarExample
  },
  data() {
    return {
      labels: [],
      datasets: [
        {
          label: this.type,
          backgroundColor: "#4482fa",
          data: []
        }
      ]
    };
  },
  methods: {
    bindChart() {
      for (let i = 0; i < this.chartData.length; i++) {
        this.datasets[0].data.push(this.chartData[i].selling.toFixed(4));
        this.labels.push(this.chartData[i].update_date);
        console.log("for donuyor")
      }
    }
  },
  created() {
    this.bindChart();
  }
};
</script>

<style lang="scss" scoped>
</style>
