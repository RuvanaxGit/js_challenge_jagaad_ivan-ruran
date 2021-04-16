<template>
  <div v-if="isLoading">
    <div class="background-wrapper"></div>
    <div class="loader"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Loader',

  computed: {
    ...mapState({
      isLoading: 'isLoading'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/globalVariables";

  .background-wrapper {
    margin: auto;
    position: fixed;
    top: 0; left: 0; bottom: 0; right: 0;
    background: $loader-background;
    opacity: .2;
    width: 100%;
    height: 100%;
  }
  .loader {
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #3498db;
    margin: auto;
    position: fixed;
    top: 0; left: 0; bottom: 0; right: 0;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
