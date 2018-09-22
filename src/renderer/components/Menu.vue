<template>
  <div class="menu">
    <div class="menu-col">
      <div class="logo">
        <a href="#"><h1>O</h1></a>
      </div>
    </div>
    <div class="menu-col">
      <div class="icon">
        <router-link to="/"><font-awesome-icon icon="home" /></router-link>
      </div>
    </div>
    <!-- <div class="menu-col">
      <div class="icon">
        <router-link to="/currency-detail" :class="menuLink()"><font-awesome-icon icon="rocket" /></router-link>
      </div>        
    </div> -->
    <div class="menu-col">
      <div class="icon">
        <router-link to="/coin-translate"><font-awesome-icon icon="coins" /></router-link>
      </div>
    </div>
    <!-- <div class="menu-col">
      <div class="icon">
        <a href="#"><font-awesome-icon icon="cog" /></a>
      </div>
    </div> -->

    <div class="menu-info">
      <label>Version: 1.4.1</label>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    menuLink() {     
      return this.$route.name == 'CurrencyDetail' ? 'router-link-exact-active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 70px;
  background: rgb(43, 73, 222);
  background: linear-gradient(
    180deg,
    rgba(43, 73, 222, 1) 0%,
    rgba(68, 130, 250, 1) 60%
  );
  color: #fff;
  padding-top: 30px;
  padding-bottom: 20px;
  position: relative;

  &-col {
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 22px;
    margin-top: 22px;

    &:first-child {
      margin-top: 0;
      margin-bottom: 10px;

      &:after {
        content: '';
        position: absolute;
        width: 60%;
        height: 1px;
        background: #fff;
        left: 50%;
        bottom: -5px;
        transform: translate(-50%, 0);
      }
    }

    & a {
      color: inherit;
      text-decoration: none;
      display: block;

      &.router-link-exact-active {
        color: #dedede;

        &:before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-right: 6px solid #fff;
        }
      }
    }

    & .logo h1 {
      font-size: 50px;
      margin-top: -10px;

      &:after {
        content: '3';
        font-size: 14px;
        position: relative;
        top: 4px;
        left: -2px;
      }
    }

    & .logo .arrow {
      text-align: right;
      margin-right: 5px;
    }

    & .icon {
      font-size: 28px;
    }
  }

  &-info {
    position: absolute;
    font-size: 10px;
    width: 100%;
    left: 0;
    bottom: 15px;
    text-align: center;
  }
}
</style>
