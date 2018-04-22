function Index(dom,use24H) {
    this.column=Array.from(dom);//组件类
    this.use24H=use24H;//时间
    this.classList=['visible','close','far','far','dis','dis'];//类名
    this.start();
}
//开始--》获取到当前时间
// --》当前时间 14 17 35 -->字符串141735
//-->六个数与六个类名为column的div分别对应上
//-->分别找到每一列为当前时间的数字垂直局中显示 --根据数字大小调节在Y轴上移动的距离
//-->同一列中不同数字位置不同 透明度不同（根据为每一个数字见不同的类名实现）

Index.prototype.start=function () {
    var self=this;
    setInterval(function () {
       var c=self.getClock();
       self.column.forEach(function (ele,index) {//遍历所有column类对象
           var n=+c[index];//第n列
           var offset=n*86;
           $(ele).css({
               'transform':'translateY(calc(50vh - ' + offset + 'px - ' + 43 + 'px))'  //对应数字垂直居中显示
           })
           Array.from(ele.children).forEach(function (ele2,index2) {//遍历column中的所有div
               var className=self.getClassName(n,index2);//获取类名
               $(ele2).attr('class',className)//动态添加类名
           })
       })
    },1000)//1秒刷新一次
}
Index.prototype.getClassName=function(n,index2){
    var className=this.classList.find(function (className,classindex) {
        return index2-classindex===n||index2+classindex===n;//查找符合此方法的值
    })
    return className||'';
}
Index.prototype.getClock=function () {
    var d=new Date();//获取当前时间
    return [this.use24H?d.getHours():d.getHours()%12||12,
    d.getMinutes(),d.getSeconds()].reduce(function (p,n) {//累加函数
        return (p+('0'+n).slice(-2));//保留后两位
    },'');
}
new Index($('.column'),true);//new一个对象
