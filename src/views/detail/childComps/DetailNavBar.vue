<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in titles" :key="index" class="title-item" 
              :class="{active: index===currentIndex}" @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('title-click', index)
    },
    backClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .back img{
    margin-top: 10px;
  }
  .title{
    display: flex;
    font-size: 13px;
    /* justify-content: space-around; */
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: red;
  }

</style>