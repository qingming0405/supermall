<template>
  <div class="check-button" :class="{check: beChecked}" @click="selectItem">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>

export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beChecked: this.isChecked
    }
  },
  watch: {
    isChecked:function(newValue) {
      this.beChecked = newValue
    }
  },
  methods: {
    selectItem(){
      this.$emit('be-checked')
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check{
    background-color: red;
    border-color: red;
  }
</style>