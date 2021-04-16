<template>
  <header class="header">
    <div class="container header__container">
      <h1 class="page-title" data-cy="page-title" @click="handleGoToMain">BRAND</h1>
      <aside>
        <div class="header-bag">
          <div class="header-bag__item header-bag__count" data-cy="bag-icon" @click="handleGoToBag">
            <div class="header-bag__price" data-cy="total-bag-price">
              €{{totalBagPrice}}
            </div>
            <img src="../assets/img/svg/bag.svg" alt="" />
            <span class="bag__item-counter" data-cy="bag-item-counter">{{bagListCount}}</span>
          </div>
          <div class="header-bag__item header-bag__wishlist-count" data-cy="wishlist-icon">
            <img src="../assets/img/svg/wishlist.svg" alt="">
            <span class="bag__item-counter" data-cy="wishlist-item-counter">{{wishListCount}}</span>
          </div>
        </div>
      </aside>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductsHeader',

  computed: {
    ...mapGetters({
      wishListCount: 'wishListCount',
      bagListCount: 'bagListCount',
      totalBagPrice: 'totalBagPrice'
    })
  },

  methods: {
    handleGoToBag () {
      if (this.$route.path !== '/bag') {
        this.$router.push('/bag')
      }
    },

    handleGoToMain () {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/globalVariables";

  .header-bag {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    cursor: pointer;

    .header-bag__item {
      height: 25px;

      display: flex;
      align-items: flex-end;
    }

    .header-bag__item .icon {
      height: auto;
      fill: $icon-color;
    }

    .header-bag__price {
      margin-right: 5px;
      font-size: 12px;
      line-height: 12px;
    }

    .header-bag__count {
      margin-left: 10px;
    }

    .header-bag__count .icon {
      width: 17px;
    }

    .header-bag__wishlist-count {
      margin-left: 10px;
    }

    .bag__item-counter {
      width: 16px;
      height: 15px;
      margin-left: -1px;

      display: flex;
      align-self: flex-start;
      justify-content: center;
      align-items: center;

      font-family: 'Lato-Bold', sans-serif;
      font-size: 10px;
      text-align: center;

      border-radius: 50%;
      color: $main-white-color;
      background-color: $counter-background;
    }
  }
</style>
