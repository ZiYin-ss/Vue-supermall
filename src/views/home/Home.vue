<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data () {
      return {
        banner:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      this.getHomeGoods('sell')
    },
    methods:{
      // 网络请求相关
      getHomeMultidata() {
        getHomeMultidata().then(res =>{
          this.banner = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        this.goods[type].page += 1
        getHomeGoods(type,this.goods[type].page).then(res => {
            /*
              let totalNums = []
              const nums1 = [20,11,222] 将nums1数组的元素放到另外totalNums数组中
                1
                  for (let n of nums1){
                    totalNums.push(n)
                  }
                2
                  totalNums.push(...nums1)
                  这个也是 会自动把nums1里面的数据一个一个拿出来放到totalNums中

            */
          this.goods[type].list.push(...res.data.list)
        })
      },
      // 事件监听相关
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
        // refs 拿到特定的组件或元素里面的属性和方法  回到顶部的方法 第一个是x 第二个是y 第三个是多久回到
      }

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    padding-top: 44px;
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 43px;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
