<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false
      }
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //  创建时就开始监听了
      const refresh = this.debounce(this.$refs.scroll.scroll.refresh,200)
      this.$bus.$on('aaa',()=>{
        // refresh()
        this.$refs.scroll.scroll.refresh()
      })

      // 获取tabControl的offsetTop
      // 所有组件都有一个$el属性 用户获取组件中的元素
      // 但是必须要等图片加载完之后 拿到最终的offsetTop  要不然拿到的就是没有图片的offsetTop

    },
    methods:{
      // 防抖
      debounce(func,delay){
        let timer = null  // 为什么这个地方还会存在呢? 因为 你看 下面引用了  所以会存在
        return function (...args){
          if(timer)  clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
      },
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
          this.goods[type].list.push(...res.data.list)
          //   this.scroll && this.$refs.scroll.scroll.finishPullUp() 先判断是否存在
          this.$refs.scroll.scroll.finishPullUp()
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
        this.$refs.tabControl1.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
        // refs 拿到特定的组件或元素里面的属性和方法  回到顶部的方法 第一个是x 第二个是y 第三个是多久回到
      },
      contentScroll(positon){
        //  判断backTop是否显示
        this.isShowBackTop = (-positon.y) > 1000

      //  决定tabControl是否吸顶
        this.isTabFixed = (-positon.y)>this.tabOffsetTop

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
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
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    top: -1px;
    z-index: 9;
  }
</style>


