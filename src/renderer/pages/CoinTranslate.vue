<template>
  <div class="content">
    <div class="content-row">
      <h1>Coin Translate</h1>
    </div>

    <div class="content-row">
      <div class="title">
        <h3>Currency translate</h3>
      </div>
      <div class="input-group">
        <select class="input" v-model="selectCurrency">
          <option value="">Select Currency</option>
          <option :value="currency.selling" v-for="(currency, index) in currencies" :key="index">
            {{ currency.full_name }}
          </option> 
        </select>
        <input class="input" type="number" v-model="inCoin" placeholder="15.500" />
        <input class="output" type="text" v-model="resultCurrency" aria-hidden="false" />
      </div>
    </div>

    <div class="content-row">
      <div class="title">
        <h3>Crypto currency translate</h3>
      </div>
      <div class="input-group">
        <select class="input" v-model="selectCryptoCurrency">
          <option value="">Select cryptoCurrency</option>
          <option :value="cryptoCurrency.selling" v-for="(cryptoCurrency, index) in cryptoCurrencies" :key="index">
            {{ cryptoCurrency.full_name }}
          </option> 
        </select>
        <input class="input" type="number" v-model="cryptoInCoin" placeholder="15.500" />
        <input class="output" type="text" v-model="resultCryptoCurrency" aria-hidden="false" />
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CoinTranslate",
  data() {
    return {
      inCoin: '',
      currencies: [],
      selectCurrency: '',
      cryptoInCoin: '',
      cryptoCurrencies: [],
      selectCryptoCurrency: ''
    };
  },
  methods: {
    currencyCalc(type, out, coinString) {
      let result = type * out
      result = `${result.toFixed(2)}${coinString}`

      return result == `0.00${coinString}` ? '': result
    },
    selectFetch(url, type) {
      axios.get(url)
          .then(res => {
            if (res.statusText == "OK") {
              switch (type) {
                case 'currencies':
                  this.currencies = res.data
                  break;
                case 'cryptoCurrencies':
                  this.cryptoCurrencies = res.data
                  break;
              }
              
            }
          })
          .catch(e => {
            console.log(`Error ${e}`)
          })      
    }
  },
  computed: {
    resultCurrency() {
      return this.currencyCalc(this.inCoin, this.selectCurrency, 'TL')
    },
    resultCryptoCurrency() {
      return this.currencyCalc(this.cryptoInCoin, this.selectCryptoCurrency, '$')
    }    
  },
  created() {
    this.selectFetch('https://doviz.com/api/v1/currencies/all/latest', 'currencies')
    this.selectFetch('https://www.doviz.com/api/v1/coins/all/latest', 'cryptoCurrencies')       
  }
};
</script>

<style lang="scss" scoped>
.content-row {
  margin-bottom: 40px;

  & .title {
    margin-bottom: 10px;
  }
}
.input-group {
  display: flex;


  & input {
    -webkit-appearance: none;
    margin: 0;
    padding: 10px 15px;
    border: 1px solid #ccc;
    font-size: 18px;
    font-weight: 700;
    outline: none;
    width: 100%;  
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &.output {
      pointer-events: none;
    }
  }

  & select {
    -webkit-appearance: button;
    margin: 0;
    padding: 10px 15px;
    border: 1px solid #ccc;
    font-size: 18px;
    font-weight: 700;
    outline: none;
    width: 100%;  
    margin-right: 20px;
    color: rgb(107, 107, 107);
    width: 25%;
    min-width: 20%;
  }
}
</style>
