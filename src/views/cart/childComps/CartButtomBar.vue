<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：¥{{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'CartButtomBar',
  components: {
    CheckButton

  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {
      // return !this.cartList.filter(item => !item.checked).length
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      this.$store.commit('cartListCheckedAll', !this.isSelectAll)
    }
  }
}
</script>

<style scoped>
  .buttom-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }

  .check-button{
    width: 22px;
    height: 22px;
    line-height: 24px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>