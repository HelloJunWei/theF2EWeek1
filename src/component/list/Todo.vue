<template>
  <div>
      <div v-for="(todo, index) in filter" class="card" :class="{'is-zoomed': todo.is_zoomed}" @click = "isZoom(todo,index)" :style="{transform: todo.translate_y }">
        <div class="tag-bg" :class="computedTag(todo)">
        </div>
        <div class="form-group">
          <h3>{{todo.todo_title}}</h3>
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
          <textarea class="form-control" rows="3" v-model="todo.comment"></textarea>
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
  </div>
</template>

<script>
import {eventBus} from '../../js/main';
import '../../css/btn.scss'

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
      return item.done
    })
    return this.changeTag(result, tag)
  },

  unDone(todo, tag){
    var result = todo.filter(item=>{
      return !item.done
    })
    return this.changeTag(result, tag)
  },
}

export default {
  props:['active'],
  data () {
    return {
      todoLists: [{
    		todo_title: 'todo 1',
    		alert_time: moment().format('YYYY-MM-DD'),
    		comment:'comment 1',
    		done: true,
    		is_zoomed: false,
        disable: false,
        todo_tag:'blue',
    		translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 2',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 2',
			done: false,
			is_zoomed: false,
      disable: false,
      todo_tag:'red',
			translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 3',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 3',
			done: false,
			is_zoomed: false,
      disable: false,
      todo_tag:'purple',
			translate_y: 'translateY(0px)',
    	},
      {
      todo_title: 'todo 4',
      alert_time: moment().format('YYYY-MM-DD'),
      comment:'comment 4',
      done: false,
      is_zoomed: false,
      disable: false,
      todo_tag:'blue',
      // translate_y: 'translateY(0px)',
      },
      {
      todo_title: 'todo 5',
      alert_time: moment().format('YYYY-MM-DD'),
      comment:'comment 5',
      done: false,
      is_zoomed: false,
      disable: false,
      todo_tag:'red',
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
        console.log(now_index)
  			var y_move = 70+(170*now_index);
  			this.$emit('lisitenOverFlow', 'visible');
  			this.todoLists[index].translate_y = `translateY(-${y_move}px)`;
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
        var _this = this.todoLists[index]
        setTimeout(index=>{
          this.$emit('lisitenOverFlow', 'scroll')
          _this.disable =false
        },500)
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
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
		border-radius: 5px;
		transition: .7s;
		background: #fff;
  		cursor: pointer;
		height: 150px;
		overflow:  hidden;
		position: relative;
		&:hover{
			box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
		}
		&:active{
			transform: translateY(5px);
			box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
		}
		&.is-zoomed {
		  position: absolute;
		  transition: .7s;
      // top: 0;
	    height: 600px !important;
	    overflow: scroll;
	    z-index: 1000;
	    width: 479px;
	    margin-top: 5px;
	  }
    h3{
      margin: 0
    }
    .form-group{
      padding: 5px
    }
    .tag-bg{
      height: 100px;
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
	}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
