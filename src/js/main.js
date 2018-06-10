import Vue from 'vue'
import App from '../component/App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
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
