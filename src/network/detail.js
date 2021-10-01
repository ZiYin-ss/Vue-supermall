import {request1} from './request'

export function getDetail(iid){
  return request1({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class GoodsInfo{
  constructor(name,age) {
    this.name = name
    this.age = age;
  }
}

const p =new GoodsInfo('zq',18)  这个时候 p这个对象就有name和age属性了
