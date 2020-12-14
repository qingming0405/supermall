<template>
  <div id="category">
    <button @click="btnClick">点击</button>
  </div>
</template>
  
<script>




export default {
  name: 'Category',
  mounted() {
    this.mitt.on('foo', e => {
      console.log(e);
    })
  },
  methods: {
    btnClick() {
      this.mitt.emit('foo')
    }
  }
}
</script>
  
<style scoped>
  
</style>