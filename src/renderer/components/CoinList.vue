<template>
  <div class='content-row' :id='title | idFixed'>
      <div class='title'>
      <p>{{ title }}</p>
    </div>
    <div class='content-row'>
      <Search v-on:coinSearching='searchCoin' :title='title' v-if='!isLoading' />
    </div>    
    <div class='content-box'>
      <Loading v-if='isLoading' />
      <div class='content-box-col' v-for='(current, index) in filterCoins' :key='index' v-if='!isLoading'>
          <div class='coin-logo'>
            <router-link :to='coinDetailGo(current.code, index)'>
              <img :src='imageLink(index)' :alt='current.full_name'>
            </router-link>
          </div>
          <div class='coin-info'>
          <div class='coin-name'>
            <router-link :to='coinDetailGo(current.code, index)'>
              {{ current.code | nameFixed }}
            </router-link>
          </div>
          <div class='coin-full-name'>
            <router-link :to='coinDetailGo(current.code, index)'>
              {{ current.full_name }}
            </router-link>
          </div>
          <div :class='current.change_rate | changeRate '>
            <span :class='current.change_rate | arrowChange'></span> {{ current.selling | coinFixed }}
          </div>              
          </div>
      </div>                                                      
    </div>
  </div>  
</template>

<script>
import Search from '../components/Search';
import Loading from '../components/Loading';
import axios from 'axios';

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
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      searchCoins: '',
      imageUrl: []
    };
  },
  methods: {
    searchCoin(q) {
      this.searchCoins = q;
    },
    coinDetailGo(routerVal) {
      let coinType = this.title.replace(' ', '');
      switch (coinType) {
        case 'Currency':
          coinType = 'currencies';
          break;
        case 'CryptoCurrency':
          coinType = 'coins';
          break;
      }
      return `/currency-detail/${routerVal}/${coinType}`;
    },
    imageFetch() {
      let coinType = this.title.replace(' ', '');

      axios.get(`https://gitlab.com/erkansivas35/electron-vue-currency-app/raw/master/src/renderer/assets/data/${coinType}.json`)
        .then(res => {
          this.imageUrl = res.data       
      });
    },
    imageLink(index) {
      let coinType = this.title.replace(' ', '');
      let imageIndex = this.filterImage[index].image_path;

      return `https://gitlab.com/erkansivas35/electron-vue-currency-app/raw/master/src/renderer/assets/img/${coinType}/${imageIndex}`
    }
  },
  mounted(){
    this.imageFetch()
  },
  filters: {
    coinFixed(val) {
      return val.toFixed(4);
    },
    nameFixed(val) {
      let value = val;
      if (val.length > 3) {
        value = `${val.substring(0, 4)}...`;
      }

      return value;
    },
    idFixed(val) {
      return val.replace(' ', '');
    },
    changeRate(val) {
      return `coin-price ${val >= 0 ? 'green' : 'red'}`;
    },
    arrowChange(val) {
      return val >= 0 ? 'arrow-up' : 'arrow-down';
    }
  },
  computed: {
    filterCoins() {
      return this.currents.filter(coin => {
        return coin.full_name
          .toLowerCase()
          .includes(this.searchCoins.toLowerCase())       
      })
    },
    filterImage() {
      return this.imageUrl.filter(img => {
        return img.name
          .toLowerCase()
          .includes(this.searchCoins.toLowerCase())       
      })
    }    
  },
  components: {
    Search,
    Loading
  }
};
</script>

<style lang='scss' scoped>
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
  position: relative;

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
        position: relative;

        &.green {
          color: #67c342;
        }

        &.red {
          color: #e90041;
        }

        & .arrow-up {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #67c342;
          position: absolute;
          left: auto;
          margin-left: -15px;
          top: 50%;
          transform: translate(0, -40%);
        }

        & .arrow-down {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #e90041;
          position: absolute;
          left: auto;
          margin-left: -15px;
          top: 50%;
          transform: translate(0, -40%);
        }
      }
    }
  }
}

a {
  color: #333;
  text-decoration: none;
}

.coin-full-name a {
  color: #fff;
}
</style>
