<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- <scroll ref="scroll" class="content"> -->
       <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" 
                  @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    <!-- </scroll> -->
   
  </div>
</template>
  
<script>

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home'
// import Scroll from '../../components/common/scroll/Scroll.vue'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    // Scroll
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
      currentType: 'pop'
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
    }
  }
}
</script>
  
<style scoped>
  #home{
    padding-top: 44px;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>