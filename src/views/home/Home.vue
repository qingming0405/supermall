<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control ref="tabControl1" :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" v-show="isTabFixed" 
                  class="tab-control"></tab-control>
    <scroll ref="scroll" class="content" :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true" @pulling-up="loadMore">
      <home-swiper :banners="banners" @swiper-image-load="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" 
                  @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top v-show="isShowBackUp" @click="backClick"/>
  </div>
</template>
  
<script>

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home'

import {debounce} from 'common/utils.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      // isShowBackUp: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null
    }
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata(),

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
    //图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // // 监听全局事件
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.mitt.on('imgLoad', this.itemImgListener)
    
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    this.mitt.off('imgLoad',this.itemImgListener)
  },
  methods: {
    /**
     * 网络请求
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;

        this.$refs.scroll.finishedPullUp()
        this.$refs.scroll.refresh()
      })
    },
    /**
     * 事件监听
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0,500)
    // },
    contentScroll(position){
      // 判断backTop是否显示
      this.isShowBackUp = (-position.y) > 1000

      // 决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>
  
<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: relative;
    z-index: 9; */
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /* .fixed{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
  } */
</style>