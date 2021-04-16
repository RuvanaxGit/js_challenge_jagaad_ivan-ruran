<template>
  <div data-cy="bag-route" class="bag">
    <div class="bug-list" v-if="bagList.length" data-cy="bag-list">
      <div class="bug-list__item" v-for="product in bagList" :key="product.uuid">
        <div class="item">
          <div class="item__image-wrapper">
            <img class="item__image" :src="handleGetImageUrl(product)" alt="Product">
          </div>
          <div class="item__details">
            <div class="close" data-cy="delete-from-bug-button" @click="handleUpdateBugList(product)"></div>
            <div class="item__title">
              {{product.title}}
            </div>
            <div class="item__price">
              <span :class="{'item__price--strike': product.discount}">
                {{product.retail_price.formatted_value}}
              </span>
              <span class="item__price--discounted" v-if="product.discount">
                {{product.net_price.formatted_value}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="item__subtotal">
        <div>CART SUBTOTAL:</div>
        <div class="item__subtotal-price" data-cy="total-of-mini-bag">€{{totalBagPrice}}</div>
      </div>
    </div>
    <div class="empty-message" v-else>
      Cart is empty
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import handleGetImageUrl from '@/helpers/getImageUrl'

export default {
  name: 'ProductsMiniBag',

  computed: {
    ...mapState({
      bagList: 'bagList'
    }),

    ...mapGetters({
      totalBagPrice: 'totalBagPrice'
    })
  },

  methods: {
    ...mapMutations({
      handleUpdateBugList: 'UPDATE_BAG_LIST'
    }),

    handleGetImageUrl
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/globalVariables";
  .bag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .bug-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 650px;
      flex: 0 1 auto;
      height: auto;
      border: 1px solid $secondary-white-color;
      overflow: hidden;
      background-color: $main-white-color;

      .bug-list__item {
        display: flex;
        justify-content: left;
        min-height: 140px;
        margin: 5px 0 3px 0;
        width: 100%;
      }

      .item {
        display: flex;
        width: 100%;
        border-bottom: 1px solid $secondary-white-color;

        .item__image-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          flex: 0 0 33.333%;
          position: relative;

          .item__image {
            width: 100%;
            max-height: 100%;
          }
        }

        .item__details {
          display: flex;
          width: 100%;
          flex-direction: column;
          padding: 10px 42px 10px 5px;
          text-align: center;
          position: relative;

          .cross {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
          }

          .close{
            position: absolute;
            top: 5px;
            right: 5px;
            width: 25px;
            height: 25px;
            cursor: pointer;
          }

          .close:before,
          .close:after {
            content: "";
            position: absolute;
            top: 12px;
            left: 6px;
            width: 14px;
            height: 3px;
            background: $alert-color;
          }

          .close:before {
            transform: rotate(45deg);
          }

          .close:after {
            transform: rotate(-45deg);
          }

          .item__title {
            flex: 1 0 auto;
            padding: 0 10px 5px 1px;
            font-family: 'Lato-Bold', sans-serif;
            font-size: 12px;
            letter-spacing: 1.37px;
            text-transform: uppercase;
            font-weight: 600;
          }

          .item__price {
            padding-bottom: 5px;
            font-family: 'Lato-Bold', sans-serif;
            font-size: 14px;
            letter-spacing: 2.33px;
          }
        }

        .item__price--discounted {
          color: $alert-color;
        }
      }

      .item__subtotal {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 32px 25px;
        font-size: 17px;
        font-weight: bold;
        letter-spacing: 1.37px;

        .item__subtotal-price {
          font-size: 20px;
        }
      }
    }
  }
</style>
