<template>
  <div id="detail">
    <detail-nav-bar @title-click="titleClick"></detail-nav-bar>
    <scroll ref="scroll" class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @image-load="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
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
import {itemListenerMixin} from 'common/mixin.js'


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
      getThemeTopY: null
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
  mixins: [itemListenerMixin],
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
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 100)
    },
    imageLoad(){
      this.refresh()
      // this.$refs.scroll.refresh()

      this.getThemeTopY()
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
    height: calc(100% - 44px);
  }
</style>