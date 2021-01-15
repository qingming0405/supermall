<template>
  <nav-bar>
    <template v-slot:center>
      购物车({{cartLength}})
    </template>
  </nav-bar>
</template>
  
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
  
import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['cartLength'])
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
  }
}
</script>
  
<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>