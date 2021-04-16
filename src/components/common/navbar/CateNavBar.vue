<template>
  <div class="cate-nav-bar">
    <div
         :class="{active: index === currentIndex}"
         v-for="(item,index) in cateList"
         @click="itemClick(index)"
         :key="index" >
      <slot>{{item}}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CateNavBar",
    props: {
      cateList: {
        type: Array,
        default() {
          return []
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      itemClick(index) {
        this.$emit("itemClick",index)
      }
    }
  }
</script>

<style scoped>
  .cate-nav-bar {
    position: fixed;
    left: 0px;
    top: 44px;
    bottom: 49px;
    background-color: #f6f6f6;
    width: 80px;
  }
  .cate-nav-bar div {
    height: 50px;
    font-variant: normal;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
  }
  .active {
    background-color: #fff;
    color: #ff0000;
  }
</style>
