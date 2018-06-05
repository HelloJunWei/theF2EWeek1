<template>
<div class="footer">
  <ul class="nav">
    <a class="nav-item">
      <router-link to="/">home</router-link>
    </a>
    <a class="nav-item">
      <router-link to="/done">已完成</router-link>
    </a>
    <a class="nav-item">
      <router-link to="/undone">未完成</router-link>
    </a>
  </ul>
</div>

</template>

<script>
export default {
  data () {
    return {
      msg: 'footer'
    }
  }
}
</script>

<style scoped>
  .footer{
    position: absolute;
    z-index: 2;
    bottom: 0;
    border: 1px solid;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
</style>
