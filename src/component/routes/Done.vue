<template>
    <todo :active="active"></todo>
</template>

<script>
import Todo from '../list/Todo.vue'
export default {
	components:{
		todo: Todo
	},
	data () {
		return {
			active: 'done',
		}
	},
	methods: {
	}
}
</script>
