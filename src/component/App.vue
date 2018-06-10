<template>
  <div class="app">
    <div class="header">
      <span style="margin-right: 5px">標記:</span>
      <label class="radio">
        <input @change="changeTag"type="radio" class="all" v-model="tag" value="all">
        <span>全部</span>
      </label>
      <label>
        <input @change="changeTag"type="radio" class="blue" v-model="tag" value="blue">
        <span>藍色</span>
      </label>
      <label class="radio">
        <input @change="changeTag"type="radio" class="red" v-model="tag" value="red">
        <span>紅色</span>
      </label>
      <label class="radio">
        <input @change="changeTag"type="radio" class="purple" v-model="tag" value="purple">
        <span>紫色</span>
      </label>
    </div>
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
  import '../css/btn.scss'
  import {eventBus} from '../js/main';
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
      over_flow: 'scroll',
      tag: 'all'
    }
  },
  methods:{
    lisitenOverFlow(data) {
      this.over_flow = data;
    },
    changeTag(){
      eventBus.$emit('changeTag', this.tag)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app{
    border-radius: 10px;
    width: 500px;
    height: 650px;
    box-shadow: 1px 1px 15px rgba(0,0,0,.5);
    overflow: hidden;
    position: relative;
    background-color: rgba(238, 238, 238,.4);
    .header{
      margin: 20px 0 10px 30px;
      font-size: 20px;
    }
    .radio{
      display: inline-block;
    }
  }
  .todo-list{
    z-index: 1;
    height: 82%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
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