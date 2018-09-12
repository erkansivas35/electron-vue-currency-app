<template>
  <bar-example :labels="labels" :datasets="datasets" />
</template>

<script>
import BarExample from "./Charts/BarExample.js";
import axios from "axios";
import moment from "moment";

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
      chartData: [],
      labels: [],
      datasets: [
        {
          label: this.$route.params.coinId,
          backgroundColor: "#4482fa",
          data: []
        }
      ]
    };
  },
  methods: {
    chartBindData() {
      this.chartData.reverse();
      let chartDataLength = this.chartData.length;
      if (this.chartData.length > 200) {
        chartDataLength = 200;
      }
      for (let i = 0; i < chartDataLength; i++) {
        this.labels.push(
          moment.unix(this.chartData[i].update_date).format("DD/MM/YYYY HH:mm")
        );
        this.datasets[0].data.push(this.chartData[i].selling.toFixed(4));
      }
      //chartJS array reverse
      this.labels.reverse();
      this.datasets[0].data.reverse();
    }
  },
  mounted() {
    let type = this.$route.params.coinType;
    let id = this.$route.params.coinId;
    if (type == undefined && id == undefined) {
      type = "currencies";
      id = "USD";
    } else {
      type = this.$route.params.coinType;
      id = this.$route.params.coinId;
    }

    const apiUrl = `http://doviz.com/api/v1/${type}/${id}/daily`;
    axios.get(apiUrl).then(res => {
      if (res.statusText == "OK") {
        this.chartData = res.data;
        this.chartBindData();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
