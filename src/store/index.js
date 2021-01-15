import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: []
  },
  mutations: {
    // mutations唯一的目的就是修改state中状态
    // mutations中每个方法尽可能完成的事件比较单一一点
    addCounter(state, payload){
      payload.count++
    },
    addToCart(state, payload){
      state.cartList.push(payload)
    }
  },
  actions: {
    // actions处理异步操作或复杂事件
    addCart(context, payload){
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        context.commit('addCounter', oldProduct)
      }
      else{
        payload.count = 1
        context.commit('addToCart', payload)
      }
      console.log(context.state.cartList);
    }
  },
  modules: {
  },
  getters: {
    cartLength(state){
      return state.cartList.length
    }
  }
})
