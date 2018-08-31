<template>
  <div class="content">
  <div class="content-header-row">
    <div class="content-header-col">
      <div class="title">
        <h3>Currency Detail</h3>
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
}
</script>

<style lang="scss">
</style>
