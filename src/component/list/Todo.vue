<template>
    <draggable v-model="todoLists" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <div v-for="(todo, index) in filter" class="card" :class="{'is-zoomed': todo.is_zoomed}" @click="isZoom(todo,index)" :style="{transform: todo.translate_y}" ref="card">
        <div class="tag-bg" :class="computedTag(todo)">
        </div>
        <div class="form-group">
          <h3 :class="{'is-done': todo.done ==1}" >{{todo.todo_title}}</h3>
        </div>
        <div class="form-group">
          完成:
          <label class="radio">
            <input type="radio" class="all" v-model="todo.done" value="1">
            <span>是</span>
          </label>
          <label class="radio">
            <input type="radio" class="all" v-model="todo.done" value="0">
            <span>否</span>
          </label>
        </div>
        <div class="form-group">
          <label for="">標題</label>
          <input type="text" class="form-control" v-model=todo.todo_title>
        </div>
        <div class="form-group">
          <label>標記</label>
          <div>
            <select class="form-control" v-model="todo.todo_tag">
              <option value="blue">藍色</option>
              <option value="red">紅色</option>
              <option value="purple">紫色</option>
            </select>
          </div>
        </div> 
        <div class="form-group">
          <label for="">提醒時間</label>
          <input class="form-control" type="date" v-model="todo.alert_time">
        </div>
        <div class="form-group">
          <label for="">備註</label>
          <textarea class="form-control" rows="2" v-model="todo.comment"></textarea>
        </div>  
        <div class="form-group">
          <div class="edit-btn">
            <button class="btn confirm-btn" @click = "notZoom(todo)">
              <span>修改</span>
            </button>
            <button class="btn cancel-btn" @click = "notZoom(todo)">
              <span>取消</span>
            </button>
          </div>
        </div>
      </div>
    </draggable>  
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import {eventBus} from '../../js/main';
import '../../css/btn.scss';
import draggable from 'vuedraggable'
const filterFn = {
  changeTag(list, tag){
    var result =[]
    if(tag != 'all'){
      list.forEach(obj=>{
        if(obj.todo_tag == tag){
          result.push(obj)
        }
      })
      return result
    }
    return list
  },

  all(todo, tag){
    return this.changeTag(todo, tag)
  },

  done(todo, tag){
    var result = todo.filter(item=>{
      return item.done == 1
    })
    return this.changeTag(result, tag)
  },

  unDone(todo, tag){
    var result = todo.filter(item=>{
      return item.done == 0
    })
    return this.changeTag(result, tag)
  },
}

export default {
  props:['active'],
  components: {
    draggable,
  },
  data () {
    return {
      todoLists: [{
    		todo_title: 'todo 1',
    		alert_time: moment().format('YYYY-MM-DD'),
    		comment:'comment 1',
    		done: 0,
    		is_zoomed: false,
        disable: false,
        todo_tag:'blue',
    		translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 2',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 2',
			done: 0,
			is_zoomed: false,
      disable: false,
      todo_tag:'red',
			translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 3',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 3',
			done: 1,
			is_zoomed: false,
      disable: false,
      todo_tag:'purple',
			translate_y: 'translateY(0px)',
    	},],
      tag:'all'
    }
  },
  computed: {
    filter () {
      return filterFn[this.active](this.todoLists, this.tag)
    },
  },
  methods:{
    computedTag(todo){
      return `tag-${todo.todo_tag}` 
    },
  	isZoom(todo, now_index) {
      var index;
      var _this = this.todoLists.find((obj, i)=>{
        index = i
        return obj == todo
      })
      if(this.todoLists[index].disable){
        return
      }
      if(!this.todoLists[index].is_zoomed){
        var y_move = 70+(170*now_index);
        var _this = this.todoLists[index];
        setTimeout(()=>{
          _this.translate_y = `translateY(-${y_move}px)`;
        },150)
  		  this.todoLists[index].is_zoomed = true
        this.todoLists[index].disable = true
      }
  	},
    notZoom(todo) {
      var index;
      var _this = this.todoLists.find((obj, i)=>{
        index = i
        return obj == todo
      })
      if(this.todoLists[index].is_zoomed){
        var y_move =0;
        this.todoLists[index].translate_y = `translateY(${y_move}px)`;
        var _this = this.todoLists[index];
        setTimeout(()=>{
          _this.disable =false
        },100)
        this.todoLists[index].is_zoomed = false
      }
    }
  },
  created(){
    eventBus.$on('post', (data)=>{
      this.todoLists.push(data)
    })
    eventBus.$on('changeTag', (tag)=>{
      this.tag = tag
    })
  }
}
</script>

<style lang="scss" scoped>
	.card{
		z-index: 2;
		margin: 20px 10px;
		box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		// transition: 2s;
		background: #fff;
  	cursor: pointer;
		height: 150px;
		overflow:  hidden;
    position: relative;
		&:hover{
			box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
		}
		&.is-zoomed {
      animation-name: popUP;
      animation-duration: 1s;
      animation-fill-mode: forwards;
	    z-index: 1000;
	    margin-top: 5px;
	  }
    h3{
      margin: 0
    }
    .form-group{
      padding: 5px;
      margin-bottom: 5px;
    }
    .tag-bg{
      min-height: 95px;
    }
    .tag-red{
      background-image: linear-gradient(to top, #ffb199 0%, #ff0844 100%);
    }
    .tag-blue{
      background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    }
    .tag-purple{
      background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
    }
    .edit-btn{
      display: flex;
      justify-content: flex-end;
    }
    .radio{
      display: inline-block;
    }
    .is-done{
      text-decoration: line-through;
    }
	}

@keyframes popUP {
  0%{
    width: 479px;
  }
  25%{
    transform: scale(0.95);
    position: fixed;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.8);
  }

  75%{
    // position: fixed;
    height: 620px;
    width: 479px;
  }
  100% {
    position: fixed;
    height: 620px ;
    width: 479px;
  }
}



</style>
