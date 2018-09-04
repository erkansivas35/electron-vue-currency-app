<template>
  <bar-example :labels="labels" :datasets="datasets" />
</template>

<script>
import BarExample from "./Charts/BarExample.js";

export default {
  components: {
    BarExample
  },
  data() {
    return {
      labels: [
        "04/09/2018",
        "05/09/2018",
        "06/09/2018",
        "07/09/2018",
        "08/09/2018",
        "09/09/2018",
        "10/09/2018",
        "04/09/2018",
        "05/09/2018"
      ],
      datasets: [
        {
          label: 'USD',
          backgroundColor: "#4482fa",
          data: [
            60,
            50,
            50,
            20,
            60,
            140,
            130,
            135,
            100
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
