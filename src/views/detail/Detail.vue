<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'

  import {getDetail,Goods} from 'network/detail'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data(){
      return {
        id:null,
        topImages:[],
        goods: {}
      }
    },
    created() {
      // 保存传入的iid
      this.id = this.$route.params.id
      getDetail(this.id).then(res =>{

        // 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages

        // 获取商品详细信息的展示 就是第二个部分
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)

      })
    }
  }
</script>

<style scoped>

</style>
