import Vue from 'vue'
import App from '../component/App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
// import {todo_data}  from './todo_data'
// Vue.prototype.todo_data = todo_data
export const eventBus = new Vue();
Vue.use(VueRouter)
const router = new VueRouter({
	routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
