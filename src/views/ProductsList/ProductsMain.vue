<template>
  <div class="main">
    <template v-if="dataIsReady">
      <div class="product-list" v-if="availableActivities.length" data-cy="product-list">
        <div v-for="product in availableActivities" :key="product.uuid" class="product-list__item" data-cy=product-item>
          <article class="product">
            <figure class="product__image-wrapper">
              <img class="product__image" :src="handleGetImageUrl(product)" alt="Product">
              <button
                class="product__wishlist-button button button--round button--wishlist"
                data-cy="product-update-wish-list-button"
                @click="updateWishList(product)">
                <svg class="icon" :class="{'icon-active': productInWishList(product.uuid)}" viewBox="0 6 20 20" xmlns="http://www.w3.org/2000/svg">
                  <polygon id="Wishlist-Icon" stroke="none" fill-rule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                </svg>
              </button>
            </figure>
            <div class="product__details">
              <h1 class="product__title">
                {{product.title}}
              </h1>
              <p class="product__subtitle">
                {{product.description}}
              </p>
              <div class="product__price">
                <span :class="{'product__price--strike': isDiscount(product)}">
                  {{product.retail_price.formatted_value}}
                </span>
                <span class="product__price--discounted" v-if="isDiscount(product)">
                  {{product.net_price.formatted_value}}
                </span>
              </div>
              <button
                class="product__add-to-cart button button--primary"
                data-cy="product-update-bag-button"
                :class="productInBag(product.uuid) ? 'button--in-cart' : 'button--out-cart'"
                @click="updateBagList(product)">
                {{productInBag(product.uuid) ? 'IN CART' : 'ADD TO CART'}}
              </button>
            </div>
          </article>
        </div>
      </div>
      <div v-else>
        No data available
      </div>
      <ProductsPagination v-if="availableActivities.length"></ProductsPagination>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ProductsPagination from '@/views/ProductsList/ProductsPagination'
import handleGetImageUrl from '@/helpers/getImageUrl'

export default {
  name: 'ProductsView',

  components: {
    ProductsPagination
  },

  created () {
    this.handleGetAvailableActivities().then(() => {
      this.dataIsReady = true
    })
  },

  data () {
    return {
      dataIsReady: false
    }
  },

  computed: {
    ...mapState({
      availableActivities: state => state.availableActivities,
      bagList: state => state.bagList,
      wishList: state => state.wishList
    })
  },

  methods: {
    ...mapActions({
      handleGetAvailableActivities: 'handleGetAvailableActivities'
    }),

    ...mapMutations({
      updateWishList: 'UPDATE_WISHLIST',
      updateBagList: 'UPDATE_BAG_LIST'
    }),

    handleGetImageUrl,

    productInBag (id) {
      return this.bagList.some(item => item.uuid === id)
    },

    productInWishList (id) {
      return this.wishList.some(item => item.uuid === id)
    },

    isDiscount (product) {
      return product.net_price && product.net_price.formatted_value
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .product {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;

    .product__image-wrapper {
      padding: 0 0 58% 0;
      position: relative;
      text-align: center;
      overflow: hidden;
    }

    .product__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }

    .product__details {
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      padding: 10px 20px 20px;
      text-align: center;

      .product__title {
        padding-bottom: 10px;
        font-family: 'Lato-Bold', sans-serif;
        font-size: 14px;
        letter-spacing: 1.37px;
        text-transform: uppercase;
      }

      .product__subtitle {
        flex: 1 0 auto;
        padding-bottom: 10px;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.43px;
        color: #808080;
      }

      .product__price {
        padding-bottom: 20px;

        font-family: 'Lato-Bold', sans-serif;
        font-size: 14px;
        letter-spacing: 2.33px;
      }
    }

    .product__price--strike {
      margin-right: 10px;
      text-decoration: line-through;
    }

    .product__price--discounted {
      color: #F54B5E;
    }

    .product__wishlist-button {
      width: 35px;
      height: 35px;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: 10px;
      right: 10px;

      &:hover {
        outline: none;
        border: none;
      }
    }

    .product__add-to-cart {
      width: 100%;
      margin-top: auto;
    }

    .icon {
      width: 20px;
      height: 20px;
      fill: #d9d9d9;
      transition: .3s fill;

      &:hover {
        fill: #444A59;
      }
    }

    .icon-active {
      fill: #444A59;
    }
  }
</style>
