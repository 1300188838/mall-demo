<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="left" @click="GoBackClick"><img src="~assets/img/common/back.svg"></div>
      <div slot="center">分类</div>
    </nav-bar>

    <scroll
      class="content"
      :currentProbe="3"
      :currentPullUp="true"
      @scrollMore="scrollMore"
      ref="categoryScroll"
      @finishPullUp="finishPullUp">
      <cate-nav-bar :cateList="cateList"
                    @itemClick="itemClick"
                    :currentIndex="currentIndex"/>
      <category-list :goods="goods"/>
    </scroll>


  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CateNavBar from "components/common/navbar/CateNavBar";
  import CategoryList from "components/content/categorys/CategoryList";

  import allGoods from './category.shop'
  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Category",
    data() {
      return {
        cateList: ['推荐', '手机', '女装', '女鞋', '男装'],
        currentIndex: 0,
        goods: []
      }
    },
    components: {
      Scroll,
      NavBar,
      CateNavBar,
      CategoryList
    },
    created() {
      this.getTypeShoping(allGoods)
    },
    mounted() {
      this.$bus.$on('itemImgLoad', () => {
        this.$refs.categoryScroll.refresh()
        console.log(this.$refs.categoryScroll.getscrollHeight);
      })
    },
    methods: {
      //返回上一级菜单
      GoBackClick() {
        this.$router.go(-1);
      },
      //分类菜单点击事件
      itemClick(index) {
        console.log(index);
        this.currentIndex = index
        this.getTypeShoping(allGoods)
      },
      scrollMore(position) {
        console.log(position);
      },
      finishPullUp() {
        this.$refs.categoryScroll.finishPullUp()
      },
      getTypeShoping(allGoods) {
        this.goods = allGoods[this.currentIndex.toString()]
      }
    }
  }
</script>

<style scoped>
  .category-nav {
    background-color: #fff;
    color: #717171;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    /*overflow: hidden;*/

    /*position: absolute;*/
    top: 44px;
    bottom: 59px;
    left: 0;
    right: 0;
  }
</style>
