<template>
  <div class="cate-list-item">
    <div class="cate-item" v-for="(item,index) in goodsItems" :key="index">
      <img :src="item.img" @load="itemImgLoad">
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryListItem",
    props: {
      goodsItems: Array,
      default() {
        return []
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      itemImgLoad() {
        if (!this.isLoad) {
          this.$bus.$emit('itemImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .cate-item {
    display: inline-block;
    width: 30%;
    text-align: center;
    font-size: 14px;

    padding: 2px;
    margin-bottom: 20px;
    margin-left: 2px;
    margin-right: 2px;
  }

  .cate-item img {
    width: 80px;
    height: 80px;
  }
</style>
