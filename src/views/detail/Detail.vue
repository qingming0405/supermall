<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll ref="scroll" class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @image-load="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommends"/>
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
      // itemImgListener: null
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

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
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
    imageLoad(){
      this.refresh()
      // this.$refs.scroll.refresh()
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