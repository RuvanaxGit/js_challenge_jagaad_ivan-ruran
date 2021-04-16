<template>
  <div id="app">
    <ProductsHeader></ProductsHeader>
    <main>
      <router-view></router-view>
    </main>
    <ProductFooter></ProductFooter>
  </div>
</template>

<script>
import ProductsHeader from '@/views/ProductsHeader'
import ProductFooter from '@/views/ProductFooter'

export default {
  name: 'App',
  components: {
    ProductFooter,
    ProductsHeader
  }
}
</script>

<style lang="scss">
  @import "assets/scss/main.scss";
  @import "assets/css/main.css";
  @import "assets/scss/breakpoints";

  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;

    font-family: 'Lato-Regular', sans-serif;
    font-size: 13px;
    text-rendering: optimizeLegibility;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    color: #444A59;
    background-color: #f8f8f8;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100%;

    .header, footer {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: row;
      background-color: #ffffff;
      .footer__sidenote {
        font-family: 'Lato-Bold', sans-serif;
        letter-spacing: 1.37px;
      }
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 auto;
      min-height: auto;
    }

    .header__container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .page-title {
        font-size: 20px;
        font-weight: normal;
        cursor: pointer;
      }
    }

    .empty-message {
      font-size: 24px;
      padding: 50px 0;
    }
  }
</style>
