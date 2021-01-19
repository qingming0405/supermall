<template>
  <div class="cart-list-item">
    {{product}}
  </div>
</template>

<script>

export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .cart-list-item{
    display: flex;
  }
</style>