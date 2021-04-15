<template>
  <div data-cy="bag-route" class="bag">
    <div class="bug-list" v-if="bagList.length">
      <div class="bug-list__item" v-for="product in bagList" :key="product.uuid">
        <div class="item">
          <div class="item__image-wrapper">
            <img class="item__image" :src="handleGetImageUrl(product)" alt="Product">
          </div>
          <div class="item__details">
            <div class="cross" @click="handleUpdateBugList(product)">&#10060;</div>
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
      <div class="subtotal">
        <div>CART SUBTOTAL:</div>
        <div>€{{totalBagPrice}}</div>
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
      max-width: 600px;
      flex: 0 1 auto;
      height: auto;
      border: 1px solid #d9d9d9;
      overflow: hidden;
      background-color: #fff;

      .bug-list__item {
        display: flex;
        justify-content: left;
        margin: 1px 0 3px 10px;
        width: 100%;
      }

      .item {
        display: flex;
        width: 100%;

        .item__image-wrapper {
          overflow: hidden;
          flex: 0 0 33.333%;
          position: relative;

          .item__image {
            width: 100%;
            height: 100%;
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

          .item__title {
            padding-bottom: 10px;
            font-family: 'Lato-Bold', sans-serif;
            font-size: 12px;
            letter-spacing: 1.37px;
            text-transform: uppercase;
          }

          .item__price {
            padding-bottom: 20px;
            font-family: 'Lato-Bold', sans-serif;
            font-size: 14px;
            letter-spacing: 2.33px;
          }
        }

        .item__price--discounted {
          color: #F54B5E;
        }
      }

      .subtotal {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #d9d9d9;
        width: 100%;
        padding: 30px 15px;
        font-size: 17px;
        font-weight: bold;
        letter-spacing: 1.37px;
      }
    }
  }
</style>
