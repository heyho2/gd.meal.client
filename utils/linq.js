/** 删除 **/
Array.prototype.delete = function (index) {
  if (index < 0) {
    return this;
  }
  return this.slice(0, index).concat(this.slice(index + 1, this.length));
}
//筛选 return [] 条件 是委托参数数组对象，返回bool
Array.prototype.where = function (func) {
  let list2 = [];
  this.forEach(element => {
    if (func(element)) {
      list2.push(element);
    }
  });
  return list2;
}
//筛选 return 第一个{} 条件 是委托，参数数组对象，返回bool
Array.prototype.first = function (func) {
  return this.where(func)[0];
}
//映射 return 第一个[] 条件 是委托，参数数组对象，返回新对象
Array.prototype.select = function (func) {
  let list2 = [];
  this.forEach(element => {
    list2.push(func(element));
  });
  return list2;
}

//var ddd=[{a:1,b:2},{a:3,b:2}];
//var sss1=ddd.where(function(item){return item.a==1;})
//var sss2=ddd.where(item=>item.a==1);
//var sss3=ddd.first(item=>item.a==1);
//
//var sss=ddd.select(item=>{return {
//	name:item.a,
//	code:item.a
//}});
