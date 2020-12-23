<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
        <template v-slot:default>
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </template>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isload: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isload){
        this.$emit('swiper-image-load')
        this.isload = true //只发一次事件即可
      }
    }
  }
}
</script>