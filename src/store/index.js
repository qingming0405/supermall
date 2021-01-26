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
      payload.checked = true
      state.cartList.push(payload)
    },
    cartListCheckedAll(state, checked){
      state.cartList.forEach(item => {
        item.checked = checked
      });
    },
    cartItemCheckedChange(state, payload){
      payload.checked = !payload.checked
      // console.log(state.cartList);
    }
  },
  actions: {
    // actions处理异步操作或复杂事件
    addCart(context, payload){
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct){
          context.commit('addCounter', oldProduct)
          resolve('商品数量+1')
        }
        else{
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('添加新商品')
        }
      })  
    }
  },
  modules: {
  },
  getters: {
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  }
})
