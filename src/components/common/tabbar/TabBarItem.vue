<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    
    <!-- <img src="../../assets/img/tabbar/home.png" alt="">
    <div>首页</div> -->
  </div>
</template>
  
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#1296db'
    }
  },
  data(){
    return {
      // isActive: false,
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path
      // return path.indexOf(this.path) !== -1//indexOf报错
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
  
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  /* .tab-bar-item img{
    width: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  } */
</style>