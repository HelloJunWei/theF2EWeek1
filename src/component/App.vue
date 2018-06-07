<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <div class="add-btn-side">
      <button class="btn-add" @click="showModal = true"><i class="fas fa-plus"></i> </button>
    </div>
    <add-list v-if="showModal" @close="showModal = false">
    </add-list>
    <div class="todo-list" :style="{overflow: over_flow}">
      <router-view @lisitenOverFlow="lisitenOverFlow"></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import footer from './footer.vue';
  import addList from './modal/addList.vue'
export default {

  components:{
    appFooter: footer,
    addList: addList,
  },
  data () {
    return {
      showModal: false,
      msg: 'Todo list',
      over_flow: 'scroll',
      todo_data:{}
    }
  },
  methods:{
    lisitenOverFlow(data) {
      this.over_flow = data;
    },
  }
}
</script>

<style lang="scss" scoped>
  .app{
    border-radius: 10px;
    width: 500px;
    height: 650px;
    box-shadow: 1px 1px 5px rgba(0,0,0,.4);
    overflow: hidden;
    position: relative;
    background-color: rgba(238, 238, 238,.4);
  }
  .todo-list{
    z-index: 1;
    height: 100%;
    overflow: auto;
  }
  .add-btn-side{
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 80px;
    right: 20px;
    z-index: 100;
  }
  .btn-add{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: #fff;
    background-color: #f91d58;
    box-shadow: 5px 5px 5px rgba(0,0,0,.4);
    transition: .2s;
    &:active{
      transform: translateY(5px);
      box-shadow: 5px 0px 15px rgba(0, 0, 0, 0.8);
    }
  }
</style>