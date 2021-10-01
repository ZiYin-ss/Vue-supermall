<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo.vue",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .info-title{
    font-size: 15px;
    margin: 10px 10px;
    font-weight: bolder;
  }
  .info-price{
    margin: 0 10px;
    height: 40px;
  }
  .n-price{
    font-size: 25px;
    color: orangered;
  }
  .o-price{
    font-size: 10px;
    margin-left: 5px;
    text-decoration:line-through;
  }
  .discount{
    position: relative;
    top:-10px;
    margin-left:10px;
    border-radius:60% ;
    background-color: deeppink;
    color: white;
  }
  .info-other{
    display: flex;
    height: 30px;
  }
  .info-other span{
    flex: 1;
    text-align: center;
    font-size: 13px;
    color: pink;
  }
  .info-other span:first-child{
    text-align: left;
    margin-left: 5px;
  }
  .info-service{
    font-size: 12px;
    height: 30px;
    display: flex;
  }
  .info-service span{
    flex: 1;
  }
  .info-service span:first-child{
    margin-left: 10px;
  }
  .info-service img{
    width: 12px;
    height: 12px;
  }


</style>
