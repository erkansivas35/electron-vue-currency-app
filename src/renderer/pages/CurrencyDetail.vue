<template>
  <div class="content">
    <Loading v-if="isLoading" />

    <div class="content-header-row" v-if="!isLoading">
      <div class="content-header-col w100">
        <div class="title">
          <h3>{{ currents.full_name }}</h3>

          <div class="info">
            <p>Change Rate: % {{ currents.change_rate | rateFixed }}
              <span :class="currents.change_rate | arrowChange"></span>
            </p>
            <p>Last Updated: {{ currents.update_date | moment("from", "now") }}</p>          
          </div>          
        </div>
      </div>      
    </div>  

    <div class="content-row">
      <div class="content-col">
        <div class="currency-info">
          <div class="col">
            <span>
              <img src="../assets/img/usd-icon.png" :alt="currents.full_name">
              {{ currents.full_name }}
            </span>
          </div>
          <div :class="changeColor(currents.change_rate)">
            <p class="coinSell">
              <small style="color: #000">Buying:</small> 
              {{ currents.buying | coinFixed }}
              <span :class="currents.change_rate | arrowChange"></span>
            </p>
            <p class="coinSell">
              <small style="color: #000">Selling:</small> 
              {{ currents.selling | coinFixed }}
              <span :class="currents.change_rate | arrowChange"></span>
            </p>
          </div>
        </div>
      </div> 
    </div>

    <div class="content-row" v-if="!isLoading">
      <div class="content-col">
        <div class="chart-wrapper">
          <GraphChart :chartData="chartData" :type="type" />
        </div>
      </div>     
    </div>     
  </div>
</template>

<script>
import axios from "axios";
import { setInterval } from "timers";
import Loading from "../components/Loading";
import GraphChart from "../components/GraphChart";

export default {
  name: "CurrencyDetail",
  data() {
    return {
      name: "Curency Detail",
      isLoading: true,
      currents: [],
      chartData: [],
      type: this.$route.params.coinId
    };
  },
  methods: {
    coinFetch(url) {
      axios
        .get(url)
        .then(response => {
          if (response.statusText == "OK") {
            this.currents = response.data;
            this.isLoading = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    chartGraphFetch(url) {
      axios
        .get(url)
        .then(response => {
          if (response.statusText == "OK") {
            this.chartData = response.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeColor(val) {
      return `col colFlex ${val >= 0 ? "green" : "red"}`;
    }
  },
  created() {
    let type = this.$route.params.coinType;
    let id = this.$route.params.coinId;
    if (type == undefined && id == undefined) {
      type = "currencies";
      id = "USD";
    } else {
      type = this.$route.params.coinType;
      id = this.$route.params.coinId;
    }

    let currentsUrl = `https://www.doviz.com/api/v1/${type}/${id}/latest`;
    let chartUrl = `https://doviz.com/api/v1/${type}/${id}/daily`;
    this.coinFetch(currentsUrl);
    this.chartGraphFetch(chartUrl);

    setInterval(() => {
      if (this.$route.name == "CurrencyDetail") {
        this.coinFetch(currentsUrl);
      }
    }, 5000);
  },
  filters: {
    arrowChange(val) {
      return val >= 0 ? "arrow-up" : "arrow-down";
    },
    rateFixed(val) {
      return parseFloat(val).toFixed(2);
    },
    coinFixed(val) {
      return parseFloat(val).toFixed(4);
    }
  },
  components: {
    Loading,
    GraphChart
  }
};
</script>

<style lang="scss" scoped>
.content {
  & .content-header-row {
    & .title {
      width: 100%;

      & .info {
        display: flex;

        & p {
          margin-right: 25px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      & p {
        font-size: 16px;
        position: relative;
      }
    }
  }
}

.content-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & .content-col {
    width: 100%;

    &:last-child {
      margin-right: 0;
    }

    & .currency-info {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      margin-top: 15px;
      margin-bottom: 15px;
      border: 1px solid #e5e5e5;
      padding: 10px 10px;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
      transition: 0.4s;

      &:hover {
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
      }

      & .col {
        width: 60%;

        &:nth-child(2) {
          width: 40%;
        }

        &.colFlex {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        & span {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          font-size: 18px;

          & img {
            width: 40px;
            margin-right: 8px;
          }
        }

        & .coinSell {
          text-align: right;
          font-size: 18px;
          margin-right: 20px;
          position: relative;
        }

        &.green {
          color: #67c342;
        }

        &.red {
          color: #e90041;
        }
      }
    }
  }
}

p {
  margin: 0;
}

.w100 {
  width: 100%;
}

.loading {
  height: 100%;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #67c342;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translate(0, -50%);
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #e90041;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
