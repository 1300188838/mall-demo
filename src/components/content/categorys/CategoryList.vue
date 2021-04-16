<template>
  <div class="category">
    <div v-for="(value,key) in goods" :key="key">
      <span>{{value.title}}</span>
      <category-list-item :goodsItems="value.list"/>
    </div>
  </div>
</template>

<script>

  import CategoryListItem from "./CategoryListItem";
  export default {
    name: "CategoryList",
    props: {
      goods: {
        type: Array,
        default: null
      }
    },
    components: {
      CategoryListItem
    }
  }
</script>

<style scoped>
  .category {
    position: fixed;
    right: 0px;
    top: 44px;
    bottom: 49px;
    left: 80px;

  }
</style>
