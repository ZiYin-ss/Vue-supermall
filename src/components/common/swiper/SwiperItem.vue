<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
    /*flex-shrink: 0;   这个是因为当flex-shrink 不等于0的时候会被压缩的 把4个图片放到一个界面上面*/
  }

  .slide img {
    width: 100%;
  }
</style>
