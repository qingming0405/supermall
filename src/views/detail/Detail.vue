<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @title-click="titleClick"></detail-nav-bar>
    <scroll ref="scroll" class="content" :probeType="2" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @image-load="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top v-show="isShowBackUp" @click="backClick"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {debounce} from 'common/utils.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 店铺信息
      this.shop = new Shop(data.shopInfo)
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    })
  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {
    // //图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // // 监听全局事件
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.mitt.on('imgLoad', this.itemImgListener)
  },
  unmounted() {
    this.mitt.off('imgLoad',this.itemImgListener)
  },
  methods: {
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    imageLoad(){
      this.refresh()
      // this.$refs.scroll.refresh()

      this.getThemeTopY()
    },
    contentScroll(position){
      const positionY = -position.y
      let lastY = Number.MAX_VALUE
      for(let i=this.themeTopYs.length-1; i>=0; i--){
        if(this.currentIndex!==i && positionY>=this.themeTopYs[i] && positionY<lastY){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
          lastY = this.themeTopYs[i]
          break
        }
      }

      // 判断backTop是否显示
      this.isShowBackUp = (-position.y) > 1000
    },
    addToCart(){
      // 获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      // 将商品添加到购物车
      this.$store.commit('addCart', product)
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background: #ffffff;
    height: 100vh;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }
</style>