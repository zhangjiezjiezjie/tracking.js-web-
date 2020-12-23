<template>
  <div class="el-menu">
    <router-link class="el-menu-item" v-for="nav in navList" :to="nav.router" :key="nav.router" >{{nav.name}}</router-link>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      msg: '',
      pShow:false,
      navList:[
        {
          "name": "Animate",
          "router": "/animate"
        },
        {
          "name": "test",
          "router": "/test"
        },
        {
          "name": "trackingTest",
          "router": "/trackingTest"
        }
      ]

    }
  },
  methods:{
    fade () {
      this.pShow = !this.pShow;
    },
    animateData () {

    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
