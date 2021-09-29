<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true
      })
      this.scroll.scrollTo(0,0)  // 回到顶部的方法 第一个是x 第二个是y
    }
  }
</script>

<style scoped>

</style>
