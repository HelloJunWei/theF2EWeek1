<template>
<div class="footer">
    <div class="nav-item">
        <router-link to="/">
          <i class="fas fa-home fa-2x"></i>
        </router-link>
    </div>
    <div class="nav-item">
        <router-link to="/done"><i class="fas fa-check-circle fa-2x"></i></router-link>
    </div>
    <div class="nav-item">
        <router-link to="/unDone"><i class="fas fa-list-ol fa-2x"></i></router-link>
    </div>
</div>

</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
export default {
  data () {
    return {
      msg: 'footer'
    }
  }
}
</script>

<style scoped>
  .footer{
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 40px;
    background-color: #fff;
  }
  .nav-item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 10px 0;
  }
  a{
    color: rgba(0,0,0,0.4);
  }
</style>
