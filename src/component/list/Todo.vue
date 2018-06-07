<template>
  <div>
      <div v-for="(todo, index) in todoLists" class="card" :class="{'is-zoomed': todo.is_zoomed}" @click = "isZoom(index)" :style="{transform: todo.translate_y}">
        <div class="form-group">
          <input type="text" class="form-control" v-model=todo.todo_title>
        </div>
        <div class="form-group">
          <label for="">提醒時間</label>
          <input class="form-control" type="date" v-model="todo.alert_time">
        </div>
      	{{todo.comment}}<br/>
      	{{todo.done}}<br/>
        {{todo.is_zoomed}}
        <div class="form-group">
          <div>
            <button class="btn confirm-btn" @click = "notZoom(index)">
              <span>修改</span>
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {eventBus} from '../../js/main';
import '../../scss/btn.css'
export default {
  data () {
    return {
      todoLists: [{
    		todo_title: 'todo 1',
    		alert_time: moment().format('YYYY-MM-DD'),
    		comment:'comment 1',
    		done: false,
    		is_zoomed: false,
        disable: false,
    		translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 2',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 2',
			done: false,
			is_zoomed: false,
      disable: false,
			translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 3',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 3',
			done: false,
			is_zoomed: false,
      disable: false,
			translate_y: 'translateY(0px)',
    	}
    	],
    }
  },
  methods:{
  	isZoom(index) {
      if(this.todoLists[index].disable){
        return
      }
      if(!this.todoLists[index].is_zoomed){
  			var y_move = 70+(110*index);
  			this.$emit('lisitenOverFlow', 'visible');
  			this.todoLists[index].translate_y = `translateY(-${y_move}px)`;
  		  this.todoLists[index].is_zoomed = true
        this.todoLists[index].disable = true
      }
  	},
    notZoom(index) {
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
  }
}
</script>

<style lang="scss" scoped>
	.card{
		z-index: 2;
		margin: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
		border-radius: 5px;
		transition: .7s;
		background: #fff;
  		cursor: pointer;
		height: 100px;
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
	    height: 500px !important;
	    overflow: scroll;
	    z-index: 10;
	    width: 479px;
	    margin-top: 5px;
	  }
    .form-group{
      padding: 20px
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
