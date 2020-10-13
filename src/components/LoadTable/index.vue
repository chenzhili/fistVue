<template>
  <table-com
    v-bind="$attrs"
    v-on="$listeners"
    :tableData="tableData"
    :tableHeader="tableHeader"
    v-loading="page.loading"
    v-pullmore="pullmoreCombine"
    v-loadmore="loadmoreCombine"
  >
    <template v-for="item in customCell" #[item]="{scope}">
      <slot :name="item" :scope="scope"></slot>
    </template>
  </table-com>
</template>
<script>
export default {
  name: 'loadTable',
  data () {
    return {
      tableData: [],
      page: {
        pages: 0,
        current: 1,
        loading: false
      },
      test: 'order'
    }
  },
  computed: {
    customCell () {
      return this.tableHeader.filter(item => item.custom).map(item => item.attrs.prop)
    }
  },
  mounted () {
    this.getData(1);
  },
  methods: {
    /* 上拉刷新加载第二 */
    loadmoreCombine () {
      this.getData();
    },
    /* 下拉加载 */
    pullmoreCombine () {
      this.getData(1);
    },
    async getData (current) {
      if (this.page.loading) return
      if (+current !== 1) {
        current = this.page.current;
        /* 判断是否还能 加载下一页 */
        if (++current > this.page.pages) {
          return '没有更多了'
        }
      }
      this.page.loading = true;
      try {
        const pramas = Object.assign({
          hitCount: undefined,
          [encodeURI('orders[0].asc')]: true,
          [encodeURI('orders[0].column')]: true,
          current,
          size: this.size
        }, this.apiParams)
        const res = await this.api(pramas);
        this.page.loading = false;
        console.log(res);
        this.page.pages = res.data.pages;
        this.page.current = current;
        /* 判断当前的 页数 */
        if (current === 1) {
          this.tableData = res.data.records;
        } else {
          this.tableData = this.tableData.concat(res.data.records)
        }
      } catch (error) {
        this.page.loading = false;
      }
    }
  },
  props: {
    size: {
      type: Number,
      default: 3
    },
    api: {
      type: Function,
      require: true
    },
    apiParams: {
      type: Object,
      require: true
    },
    tableHeader: {
      type: Array,
      require: true
    }
  }
}
</script>
