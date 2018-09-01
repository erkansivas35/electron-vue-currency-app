<template>
  <div class="content">
  <div class="content-header-row">
    <div class="content-header-col">
      <div class="title">
        <h3>{{ currents.full_name }}</h3>
        <p>Change Rate: % {{ currents.change_rate | rateFixed }}
          <span :class="currents.change_rate | arrowChange"></span>
        </p>
      </div>
    </div>      
  </div>  

  <div class="content-row">
    <p></p>
  </div>     
  </div>
</template>

<script>
import axios from 'axios';
import { setInterval } from 'timers';

export default {
  name: 'CurrencyDetail',
  data() {
    return {      
      name: 'Curency Detail',
      isLoading: true,
      currents: []
    }
  },
  methods: {
    coinFetch(url) {
      axios.get(url)
          .then(response => {            
            if (response.statusText == 'OK') {
              this.currents = response.data              
            }
          })
          .catch(e => {
            console.log(e)
          })  
    }
  },
  created() {    
    let type = this.$route.params.coinType
    let id = this.$route.params.coinId
    if (type == undefined && id == undefined) {
      type = "currencies"
      id = "USD"
    } else {
      type = this.$route.params.coinType
      id = this.$route.params.coinId
    }
    
    let currentsUrl = `https://www.doviz.com/api/v1/${type}/${id}/latest`;       
    this.coinFetch(currentsUrl)       
    setInterval(() => {
      if (this.$route.name == 'CurrencyDetail') {
        this.coinFetch(currentsUrl)      
      }
    },5000)       
  },
  filters: {
    arrowChange(val) {
      return val >= 0 ? 'arrow-up' : 'arrow-down'
    },
    rateFixed(val) {
      return parseFloat(val).toFixed(2)
    },
    coinFixed(val) {
      return parseFloat(val).toFixed(4)
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.content {
  & .title {
    width: 100%;

    & p {
      font-size: 16px;
      position: relative;
    }

    & span {
      position: relative;
      font-size: 16px;
      margin-right: 10px;
    }

    & .arrow-up {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #67c342;
      position: absolute;
      right: auto;
      margin-left: 5px;
      top: 50%;
      transform: translate(0, -50%);
    }

    & .arrow-down {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #e90041;
      position: absolute;
      right: auto;
      margin-left: 5px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
