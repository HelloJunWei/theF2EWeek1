<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <div class="todo-list" :style="{overflow: over_flow}">
      <router-view v-on:lisitenOverFlow="lisitenOverFlow"></router-view>
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
      msg: 'Todo list',
      over_flow: 'scroll'
    }
  },
  methods:{
    lisitenOverFlow: function(data){
      this.over_flow = data;
    }
  }
}
</script>

<style scoped>
  .app{
    border: 1px solid;
    width: 500px;
    height: 650px;
    overflow: hidden;
    position: relative;
  }
  .todo-list{
    z-index: 1;
    height: 100%;
    overflow: auto;
    background-color: #eee;
  }
</style>