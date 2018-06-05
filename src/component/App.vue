<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <div class="todo-list">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import footer from './footer.vue'
export default {

  components:{
    appFooter: footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
  .app{
    border: 1px solid;
    width: 500px;
    height: 500px;
    overflow: hidden;
    position: relative;
  }
  .todo-list{
    height: 100%;
    max-height: 410px;
    overflow-y: auto;
    background-color: #eee;
  }
</style>