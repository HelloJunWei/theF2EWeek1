<template>
  <div>
    <todo @lisitenOverFlow="lisitenOverFlow" :active="active"></todo>
  </div>
</template>

<script>
import Todo from '../list/Todo.vue'
export default {
	components:{
    	todo: Todo
  	},
  	data () {
	    return {
	    	active: 'unDone'
	    }
	},
	methods: {
		lisitenOverFlow: function(data) {
			this.$emit('lisitenOverFlow', data)
		}
	}
}
</script>
