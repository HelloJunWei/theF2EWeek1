 import Home from '../component/routes/Home.vue';
 import Done from '../component/routes/Done.vue';
 import UnDone from '../component/routes/UnDone.vue';

 export const routes =[
 	{path: '', name: 'home', component: Home},
 	{path: '/done', name: 'done', component: Done},
 	{path: '/undone', name: 'undone', component: UnDone}
 ] 	
