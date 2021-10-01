import {request1} from './request'

export function getDetail(iid){
  return request1({
    url:'/detail',
    params:{
      iid
    }
  })
}

// export class GoodsInfo{
//   constructor(name,age) {
//     this.name = name
//     this.age = age;
//   }
// }
// const p =new GoodsInfo('zq',18)  这个时候 p这个对象就有name和age属性了

export class  Goods{   // 把数据封装到类里面 让别人面向这个对象开发
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}
