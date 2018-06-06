<template>
  <div>
    <todo v-on:lisitenOverFlow="lisitenOverFlow"></todo>
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
	    	msg: 'home'
	    }
	},
	methods: {
		lisitenOverFlow: function(data) {
			this.$emit('lisitenOverFlow', data)
		}
	}
}
</script>
