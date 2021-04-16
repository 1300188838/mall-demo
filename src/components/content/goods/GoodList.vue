<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    /*图片两边布局  配合flex-wrap*/
    display: flex;
    flex-wrap: wrap;
    /*等分*/
    justify-content: space-around;

    padding: 2px;
  }
</style>
