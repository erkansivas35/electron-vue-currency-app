<template>
  <div class="coin-search">
    <input type="text" :placeholder="title | titleFilter" v-model="coinSearch" @keyup.prevent="searchCoin">
  </div>    
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      coinSearch: ''
    }
  },
  methods: {
    searchCoin() {
      this.$emit('coinSearching', this.coinSearch)
    }    
  },
  filters: {
    titleFilter(val) {
      return `${val} Search`
    }
  }
}

</script>

<style lang="scss" scoped>
.coin-search {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    width: 750px;
    padding: 10px;
    color: #000;
    font-size: 18px;
    border-radius: 3px;
    border: 1px solid #ccc6c6;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    outline: 0;

    &:hover {
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.2);
    }

    &:focus{
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.2);
    }

    &::-webkit-input-placeholder {
      color: #333;
      font-size: 16px;
    }
  }
}
</style>
