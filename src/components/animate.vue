<template>
  <div>
    <h1 @click="fade">{{msg}}</h1>
    <transition
      name="fade"
      enter-active-class="fadeInDown"
      leave-active-class="fadeOutUp"
    >
      <p v-show="pShow">{{msg}}</p>
    </transition>
    <select name="" id="" v-model="animateDefault" @change="animate">
      <!-- v-model="animate.key" -->
      <option v-for="animate in animateList"  value="" :key="animate.key">{{animate.key}}</option>
    </select>
    <transition
      name="fade"
      enter-active-class="fadeInDown"
      leave-active-class="fadeOutUp"
    >
      <p v-show="pShow">测试vue2-animate</p>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "animate",
    data() {
      return {
        msg: 'animate测试',
        pShow: false,
        animateDefault:'',
        animateList: this.getAnimate()
      }
    },
    methods: {
      fade() {
        this.pShow = !this.pShow;
      },
      getAnimate(){
        var animate = [
          {
            name:'bounce',
            key:'bounceUp',
            in:'bounceInDown',
            out:'bounceOutUp'
          },
          {
            name:'bounce',
            key:'bounceLeft',
            in:'bounceInLeft',
            out:'bounceOutRight'
          }
        ];
        return animate;
      }
    }
  }
</script>

<style scoped>

</style>
