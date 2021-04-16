<template>
    <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <tab-control class="tab-control1"
                   :titles="titles"
                   ref="tabControl2"
                   @tabControlClick="tabControlClick"
                   v-show="isFixed"/>
      <scroll class="content"
              :currentProbe="3"
              :currentPullUp="true"
              ref="scroll"
              @scrollMore="scrollMore"
              @finishPullUp="finishPullUp">
        <Home-swiper :banners="banner" @swiperImgLoad="swiperImgLoad" />
        <recommend-view :recommends="recommend"/>
        <fea-true-view />
        <tab-control class="tab-control"
                     :titles="titles"
                     ref="tabControl1"
                     @tabControlClick="tabControlClick"/>
        <good-list :goods="showGoods" />
      </scroll>
      <back-top @click.native="backTopClick"  v-show="isShow"/>
    </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeaTrueView from "./childComps/FeaTrueView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodList from "components/content/goods/GoodList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  // import {getHomeMultidata} from "api/home";

  import {hdata,pop , news, sell, newLoad} from './shop-goods'
  import {debounce} from 'common/unit'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeaTrueView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banner: [],
        recommend: [],
        titles: ['流行','新款','精选'],
        goods: {
          "pop": {page: 0 , list: []},
          "new": {page: 0 , list: []},
          "sell": {page: 0 , list: []}
        },
        currentType: 'pop',
        isShow: false,
        isFixed: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个商品数据
      this.getHomeMultidata(hdata)
      //请求首页商品数据(流行/新款/精选)
      this.getHomeGoods('pop',pop)
      this.getHomeGoods('new',news)
      this.getHomeGoods('sell',sell)
    },
    mounted() {
      //监听消息总线事件 所以商品图加载完成之后 refresh Scroll对象scrollHeight高度
      //因为多张图片,会频繁的刷新scroll对象的滚动高度,所以等所有的图片都加载完成之后在刷新scroll对象的滚动高度,在此就需要加防抖函数
      let refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImgLoad',()=>{
        refresh()
      })
    },
    activated() {

    },
    deactivated() {

    },
    methods: {
      //事件点击事件
      tabControlClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          default:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      //回到顶部
      backTopClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      //显示回到顶部图标
      scrollMore(position) {
        this.isShow = (-position.y) > 600
        //tab-contrl组件吸顶效果
        this.isFixed = (this.$refs.tabControl1.$el.offsetTop) < (-position.y)
      },
      //上拉加载新数据
      finishPullUp() {
        this.getHomeGoods(this.currentType,newLoad)
        this.$refs.scroll.finishPullUp()
      },
      //事件监听轮播图加载
      swiperImgLoad() {
        this.$refs.scroll.refresh()

      },

      /**
       * 获取数据接口
       */
      getHomeMultidata(res) {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      },
      getHomeGoods(type,data) {
        this.goods[type].list.push(...data)
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
   /* height: 100vh;
    position: relative;*/
  }

  .home-nav {
    background-color: #ff8198;
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /*position: sticky;*/
    top: 44px;
    z-index: 9;
  }
  .tab-control1 {
    position: fixed;
    top: 44px;
    right: 0px;
    left: 0px;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 59px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
