<template>
  <line-example/>
</template>

<script>
import BarExample from "./Charts/BarExample.js";
import LineExample from "./Charts/LineExample";

export default {
  components: {
    BarExample,
    LineExample
  },
  data() {
    return {
      dataPoints: null,
      height: 20
    };
  },
  mounted() {
    setInterval(() => {
      this.fillData();
    }, 2000);
  },
  methods: {
    increaseHeight() {
      this.height += 10;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    fillData() {
      this.dataPoints = {
        labels: [
          "January" + this.getRandomInt(),
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
