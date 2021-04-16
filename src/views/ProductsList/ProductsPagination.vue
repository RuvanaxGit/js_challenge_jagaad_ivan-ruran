<template>
  <nav class="pagination" data-cy="paginator">
    <ul class="pagination__list">
      <li class="pagination__item" :class="{'inactive__item': disabledLeftArrow}" @click="handleGoBack" data-cy="paginator-arrow-left">
        <img src="../../assets/img/svg/arrow-left.svg" alt="" />
      </li>
      <li v-for="(item, index) in paginatedData" class="pagination__item"
          data-cy="paginator-item"
          :class="[{'active__item': item === currentPage}, {'empty__item': !item}]"
          :key="index + 'num'" @click="handleSetPage(item)">
        {{item ? item: '...'}}
      </li>
      <li class="pagination__item" :class="{'inactive__item': disabledRightArrow}" @click="handleGoForward" data-cy="paginator-arrow-right">
        <img src="../../assets/img/svg/arrow-right.svg" alt="" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ACTIVITIES_LIMIT } from '@/helpers/constants'

export default {
  name: 'ProductsPagination',

  created () {
    if (Object.keys(this.$route.query).length) {
      this.parseQueryParams()
    }
  },

  data () {
    return {
      currentPage: 1,
      limit: 5
    }
  },

  computed: {
    ...mapState({
      availableActivities: state => state.availableActivities,
      activitiesCount: state => state.activitiesCount
    }),

    paginatedData () {
      let paginatedData = []
      paginatedData = this.setPaginatedData(this.count).slice(0, this.limitNumber)
      paginatedData.unshift(1)
      paginatedData.push(this.count)
      paginatedData = [...new Set(paginatedData)]
      if (this.currentPage > 2) {
        paginatedData.splice(1, 0, null)
      }
      if (this.currentPage < this.count - this.limit) {
        paginatedData.splice(paginatedData.length - 1, 0, null)
      }
      return paginatedData
    },

    limitNumber () {
      if (this.currentPage >= this.count - this.limit) {
        return this.count - this.currentPage
      }
      if (this.currentPage === 1) {
        return this.limit + 1
      }
      return this.limit
    },

    count () {
      return Math.ceil(this.activitiesCount / ACTIVITIES_LIMIT)
    },

    disabledLeftArrow () {
      return this.currentPage === 1
    },

    disabledRightArrow () {
      return this.currentPage === this.count
    }
  },

  methods: {
    ...mapActions({
      handleGetAvailableActivities: 'handleGetAvailableActivities'
    }),

    setPaginatedData (num) {
      return [...Array.from(Array(num)).map((e, i) => {
        return i + this.currentPage
      })]
    },

    handleGoBack () {
      if (!this.disabledLeftArrow) {
        this.currentPage--
        this.handleGetAvailableActivities((this.currentPage - 1) * ACTIVITIES_LIMIT)
        this.updateRoute()
      }
    },

    handleGoForward () {
      if (!this.disabledRightArrow) {
        this.currentPage++
        this.handleGetAvailableActivities((this.currentPage - 1) * ACTIVITIES_LIMIT)
        this.updateRoute()
      }
    },

    handleSetPage (num) {
      if (num && num !== this.currentPage) {
        this.currentPage = num
        this.handleGetAvailableActivities((this.currentPage - 1) * ACTIVITIES_LIMIT)
        this.updateRoute()
      }
    },

    parseQueryParams () {
      const queries = Object.assign({}, this.$route.query)
      this.handleSetPage(JSON.parse(queries.page))
    },

    updateRoute () {
      const queries = Object.assign({}, this.$route.query)
      if (this.currentPage === 1) {
        return this.$router.replace({ path: this.$route.path, query: {} })
      }
      if (+queries.page !== +this.currentPage) {
        this.$router.push({
          path: this.$route.path,
          query: { page: this.currentPage }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    height: 45px;
    margin: 30px auto;
    text-align: center;

    .pagination__list {
      height: 100%;
      display: inline-flex;
      flex-direction: row;
      align-items: center;

      .pagination__item {
        width: 45px;
        font-family: 'Lato-Bold', sans-serif;
        font-size: 13px;
        letter-spacing: 1.39px;
        text-align: center;
        list-style-type: none;
        cursor: pointer;
        transition: all .5s;
        &:hover {
          text-decoration: underline;
        }
      }

      .active__item {
        text-decoration: underline;
      }

      .empty__item{
        cursor: default;
        &:hover {
          text-decoration: none;
          pointer-events: none;
        }
      }

      .inactive__item {
        cursor: default;
        opacity: .3;
      }
    }
  }
</style>
