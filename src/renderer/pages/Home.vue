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

    <CoinList title="Currency" :currents="currents" />

    <CoinList title="Crypto Currency" :currents="cryptoCurrents" />

  </div>  
</template>

<script>
import axios from 'axios';

//Components
import CoinList from '../components/CoinList'

export default {
  name: "Home",
  data() {
    return {      
      name: 'Home Page',
      currents: [],
      cryptoCurrents: []
    }
  },
  created() {
    axios.get(`https://doviz.com/api/v1/currencies/all/latest`)
        .then(response => {
          console.log(response)
          if (response.statusText == 'OK') {
            this.currents = response.data
          }
        })
        .catch(e => {
          console.log(e)
        })

    axios.get(`https://www.doviz.com/api/v1/coins/all/latest`)
        .then(response => {
          console.log(response)
          if (response.statusText == 'OK') {
            this.cryptoCurrents = response.data
          }
        })
        .catch(e => {
          console.log(e)
        })        
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

