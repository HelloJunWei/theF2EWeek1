<template>
  <div>
    <div class="card" :class="{'is-zoomed': todo.is_zoomed}" v-for="(todo, index) in todoLists" @click = "changeIsZoom(index)" :style="{transform: todo.translate_y}">
    	<h1>{{todo.is_zoomed}}</h1>
    	{{todo.todo_title}}<br/>
    	{{todo.alert_time}}<br/>
    	{{todo.comment}}<br/>
    	{{todo.done}}<br/>
    	{{todo.todo_title}}<br/>
    	{{todo.alert_time}}<br/>
    	{{todo.comment}}<br/>
    	{{todo.done}}<br/>
    	{{todo.todo_title}}<br/>
    	{{todo.alert_time}}<br/>
    	{{todo.comment}}<br/>
    	{{todo.done}}<br/>

    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      todoLists: [{
    		todo_title: 'todo 1',
    		alert_time: moment().format('YYYY-MM-DD'),
    		comment:'comment 1',
    		done: false,
    		is_zoomed: false,
    		translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 2',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 2',
			done: false,
			is_zoomed: false,
			translate_y: 'translateY(0px)',
    	},
    	{
			todo_title: 'todo 3',
			alert_time: moment().format('YYYY-MM-DD'),
			comment:'comment 3',
			done: false,
			is_zoomed: false,
			translate_y: 'translateY(0px)',
    	}
    	],
    }
  },
  methods:{
  	changeIsZoom: function(index){
  		if(this.todoLists[index].is_zoomed == false){
  			var y_move = 70+(110*index);
  			this.$emit('lisitenOverFlow', 'visible');
  			this.todoLists[index].translate_y = `translateY(-${y_move}px)`;
  		}
  		else{
  			var y_move =0;
  			this.todoLists[index].translate_y = `translateY(${y_move}px)`;
  			setTimeout(index=>{
  				this.$emit('lisitenOverFlow', 'scroll')
  			},500)
  		}
  		this.todoLists[index].is_zoomed = !this.todoLists[index].is_zoomed;
  	}
  }
}
</script>

<style lang="scss" scoped>
	.card{
		z-index: 2;
		border: 1px solid red;
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
	}
</style>
