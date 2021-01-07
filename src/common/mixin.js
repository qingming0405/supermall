import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    // 监听全局事件
    this.itemImgListener = () => {
      this.refresh()
    }
    this.mitt.on('imgLoad', this.itemImgListener)
  }
}