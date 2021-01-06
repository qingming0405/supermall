<template>
  <swiper>
    <swiper-item class="swiper-item" v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    topImages: function (newValue, oldValue) {
      // console.log(newValue);
    }
  }
}
</script>

<style scoped>
 .swiper-item{
   height: 350px;
   overflow: hidden;
 }
 .swiper-item img{
   width: 100%;
 }
</style>