<template>
  <div class="content-row" :id="title | idFixed">
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div class="content-row">
      <Search v-on:coinSearching="searchCoin" :title="title" />
    </div>    
    <div class="content-box">
      <div class="content-box-col" v-for="(current, index) in filterCoins" :key="index">
          <div class="coin-logo">
            <img src="../assets/img/usd-icon.png" :alt="current.full_name">
          </div>
          <div class="coin-info">
          <div class="coin-name">
            {{ current.code | nameFixed }}
          </div>
          <div class="coin-full-name">
            {{ current.full_name }}
          </div>
          <div class="coin-price green">
            + {{ current.selling | coinFixed }}
          </div>              
          </div>
      </div>                                                      
    </div>
  </div>  
</template>

<script>
import Search from '../components/Search'

export default {
  name: 'CoinList',
  props: {
    title: {
      type: String,
      required: true
    },
    currents: {
      type: Array,
      required: true
    }
  }, 
  data() {
    return {
      searchCoins: ''
    }
  },
  methods: {
    searchCoin(q) {
      this.searchCoins = q;
    }
  },
  filters: {
    coinFixed(val) {
      return val.toFixed(4)
    },
    nameFixed(val) {
      let value = val;
      if (val.length > 3) {
        value = `${val.substring(0, 5)}...`
      }

      return value
    },
    idFixed(val) {
      return val.replace(' ', '')
    }
  },
  computed: {
    filterCoins() {
      return this.currents.filter(coin => {
        return coin.full_name.toLowerCase().includes(this.searchCoins.toLowerCase())
      });
    }
  },  
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
.content-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & .title {
    width: 100%;
    padding: 15px 0 5px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc6c6;

    & p {
      margin: 0;
      color: #5d5d5d;
    }
  }
}

.content-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  &-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(16.6666% - 17px);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 0 0 3px 3px;
    border: 1px solid #f5f5f5;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
    }

    &:hover .coin-info .coin-full-name {
      opacity: 1;
      pointer-events: auto;
    }

    & .coin-logo {
      padding-top: 10px;
      margin-bottom: 6px;

      & img {
        width: 60px;
      }
    }

    & .coin-info {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      margin-bottom: 10px;
      position: relative;

      & .coin-name {
        width: 100%;
        text-align: left;
        font-size: 18px;
      }

      & .coin-full-name {
        opacity: 0;
        position: absolute;
        background: #4482fa;
        color: #fff;
        padding: 5px;
        font-size: 14px;
        border-radius: 3px;
        left: 0;
        top: -30px;
        pointer-events: none;
        transition: 0.4s;

        &:before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          left: 7px;
          bottom: -4px;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 5px solid #4482fa;
        }
      }

      & .coin-price {
        width: 100%;
        text-align: right;
        font-size: 12px;

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
</style>
