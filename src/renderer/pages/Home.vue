<template>
  <div class="content">
    <div class="content-header-row">
      <div class="content-header-col">
        <div class="title">
          <h3>Foreign Currencies</h3>
        </div>
      </div>
      <div class="content-header-col">
        <div class="header-menu">
          <a href="#Currency"><h3>Currency</h3></a>
          <a href="#CryptoCurrency"><h3>Crypto Currency</h3></a>
        </div>
      </div>        
    </div>

    <CoinList title="Currency" :currents="currents" :isLoading="isLoading" />

    <CoinList title="Crypto Currency" :currents="cryptoCurrents" :isLoading="isLoading" />

  </div>  
</template>

<script>
import axios from 'axios';

//Components
import CoinList from '../components/CoinList'
import { setInterval } from 'timers';

export default {
  name: "Home",
  data() {
    return {      
      name: 'Home Page',
      isLoading: true,
      currents: [],
      cryptoCurrents: []
    }
  },
  methods: {
    coinFetch(url, type) {
      axios.get(url)
          .then(response => { 
            this.isLoading = true           
            if (response.statusText == 'OK') {
              switch (type) {
                case 'currents':
                  this.currents = response.data;
                  this.isLoading = false
                  break;
                case 'cryptoCurrents':
                  this.cryptoCurrents = response.data;
                  this.isLoading = false
                  break;
              }               
            }
          })
          .catch(e => {
            console.log(e)
          })      
    }
  },
  created() {
    const currentsUrl = 'https://doviz.com/api/v1/currencies/all/latest'
    const cryptoCurrentsUrl = 'https://www.doviz.com/api/v1/coins/all/latest'
    
    this.coinFetch(currentsUrl, 'currents')
    this.coinFetch(cryptoCurrentsUrl, 'cryptoCurrents')       

    setInterval(() => {
      if (this.$route.path == '/') {
        this.coinFetch(currentsUrl, 'currents')
        this.coinFetch(cryptoCurrentsUrl, 'cryptoCurrents')       
      }
    },5000)       
  },
  components: {
    CoinList
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}

.content {
  width: 100%;
  padding: 30px 20px 0px 30px;
  overflow: auto;

  &-header-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #373737;

    .content-header-col {
      display: flex;
      width: 50%;

      & .title {
        color: #000;
        font-size: 32px;
      }

      & .header-menu {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        & a {
          margin-right: 20px;
          color: inherit;
          text-decoration: none;
          transition: 0.4s;

          &:hover {
            color: #2b49de;
          }
        }

        & h3 {
          font-size: 22px;
          letter-spacing: 0.2px;
        }
      }
    }
  }
}
</style>

