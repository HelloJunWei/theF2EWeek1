<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
              新增事件
          </div>

          <div class="modal-body">
              <div class="form-group">
                <input class="form-control" type="text" v-model="todo.title">
              </div>
              <div class="form-group">
                 <input class="form-control" type="date" v-model="todo.alert_time">
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="3" v-model="todo.comment"></textarea>
              </div>
          </div>

          <div class="modal-footer">
              <button class="btn confirm-btn" @click="addList()">
                <span>新增</span>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import datePicker from 'vuejs-datepicker';
import {eventBus} from '../../js/main';
export default {
    components: {
      datePicker
    },
  	data () {
	    return {
	    	msg: 'home',
        todo:{
          title:'aa',
          alert_time: moment().format('YYYY-MM-DD'),
          comment:'',
          done: false,
          is_zoomed: false,
          translate_y: 'translateY(0px)',
        }
	    }
    },
    methods:{
      addList: function(data){
        this.$emit('close', false)
        eventBus.$emit('post', this.todo)
      }
    }
}
</script>
<style lang="scss" scoped>
	.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.input-group{
  margin:5px 0;
}



/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
