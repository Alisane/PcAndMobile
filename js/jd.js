window.onload=function(){
	search();
	timeBack();
	// bannerEffect();
	// startTime();
}
	// 头部的搜索效果
	function search(){
	// 1.获取当前banner高度
	var banner=document.querySelector(".jd_banner");
	var bannerHeight=banner.offsetHeight;
	var search=document.querySelector(".jd_search");
	//2.获取当前屏幕滚动时，banner滚动出屏幕的距离,监听屏幕滚动事件
	window.onscroll=function(){
		var offetTop=document.body.scrollTop;
		//3.计算比例值，获取透明度，设置背景颜色样式
		var opacity=0;
		if(offetTop<=bannerHeight){
			opacity=offetTop/bannerHeight;
			// 设置样式
			search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
			console.log("aa");
		}
	}}

$(function () {//入口函数
    /*思路：
    1.添加首尾两张图片
    2.重新设置图片盒子的宽度和图片的宽度
    3.开启定时器，实现自动轮播
    4.添加移动端的滑动事件，实现手动轮播
    5.添加过度效果结束之后的监听
    */

    //轮播图父盒子
    var banner = $(".jd_banner");
    //获得父盒子的宽度
    var bannerWidth = banner.width();
    //获得父盒子中的轮播图盒子
    var imgBox = banner.find("ul:first-of-type");
    //获得父盒子中的点标记盒子
    var indicators = banner.find("ul:eq(1)");
    var first = imgBox.find("li:first-of-type");
    var last = imgBox.find("li:last-of-type");
    //将两张图片添加到首尾位置  first.clone():将first复制一份
    imgBox.append(first.clone());
    last.clone().insertBefore(first);

    //利用子元素将父元素撑开  li->ul->banner
    var lis = imgBox.find("li");

    var count = lis.length;
    console.log(count);//10在首位动态的加了两张图片
    //设置li的宽度
    imgBox.width(count * bannerWidth);
    lis.each(function(index,value){
        $(lis[index]).width(bannerWidth);
    });
    //轮播图偏移一张
    imgBox.css("left",-bannerWidth);
    //开启定时器
    var index = 1;
    //图片的轮播效果
    var imgAnimation=function(){
        //zepto中直接使用animate函数实现图片过渡和过渡完之后实现的回调函数
        imgBox.animate(
            {"left":-index*bannerWidth},
            200,
            "ease-in-out",
            function () {
                //判断是否到第一张或最后一张
                if(index === count-1){
                    index = 1;
                    imgBox.css("left",-index*bannerWidth);
                } else if(index === 0){
                    index = count-2;
                    imgBox.css("left", -index*bannerWidth);
                }
                //设置点标记
                indicators.removeClass("active").eq(index-1).addClass("active");
            }
        );
    };
    /*开启定时器*/
    var timerId=setInterval(function(){
        index++;
        /*开启过渡*/
        /*设置定位*/
        /*在zepto中直接使用animate函数来实现
        * 1.需要添加动画效果的样式--对象
        * 2.动画的耗时
        * 3.动画的速度函数 animation-timing-function
        * 4.当前动画执行完毕之后的回调*/
        imgAnimation();
    },2000);

    //实现手动滑动  zepto中的滑动是tap
    imgBox.on("swipeLeft",function () {
        clearInterval(timerId);
        index++;
        imgAnimation();
    });
    imgBox.on("swipeRight",function () {
        clearInterval(timerId);
        index--;
        imgAnimation();
    });
});



	
// // 倒计时
function timeBack() {
	//1.获取用于展示时间的span
	var spans=document.querySelector(".jd_sh_time").querySelectorAll("span");
	//2.设置初始的倒计时时间，以秒作为单位
	var totalTime=3700;
	//3.开启定时器
	var timeId=setInterval(function(){
		totalTime--;
		if(totalTime<0){
			clearInterval(timeId);//清除时钟
			return;

		}
		var hour=Math.floor(totalTime/3600);
		var min=Math.floor(totalTime%3600/60);
		var second=Math.floor(totalTime%60);
		//console.log(hour+"  "+min+"  "+second);
		spans[0].innerHTML=Math.floor(hour/10);
		spans[1].innerHTML=Math.floor(hour%10);
		spans[3].innerHTML=Math.floor(min/10);
		spans[4].innerHTML=Math.floor(min%10);
		spans[6].innerHTML=Math.floor(second/10);
		spans[7].innerHTML=Math.floor(second%10);
	},1000);
}
// //轮播图 自动轮播  手动轮播
// // 思路：
// // 1.在首尾添加图片31230
// // 2.修改页面结构与样式
// // 3.设置默认偏移 参照自身： trandform:translateX(-10%); 参照父容器：position:relative;left:-100%;定位元素撑不开div的
//
// //轮播图
// function bannerEffect(){
// 	/*1.设置修改轮播图的页面结构
// 	 a.在开始位置放最后一张图片
// 	 b.在结束位置放最前一张图片
// 	 */
// 	/*1.1获取轮播图结构*/
// 	var banner=document.querySelector(".jd_banner");
// 	/*1.2获取图片容器*/
// 	var imgBox=banner.querySelector("ul:first-of-type");
// 	console.log(imgBox);
// 	/*1.3获取第一张图片*/
// 	var first=imgBox.querySelector("li:first-of-type");
// 	/*1.4获取最后一张图片*/
// 	var last=imgBox.querySelector("li:last-of-type");
// 	/*1.5在首尾插入两张图片 cloneNode复制一个dom元素 */
// 	imgBox.appendChild(first.cloneNode(true));
// 	imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);//inserBefore(需要插入的元素，位置)
//
// 	/*2设置对应的样式*/
// 	/*2.1获取所有li元素*/
// 	var lis=imgBox.querySelectorAll("li");
// 	// 2.2获取li元素的数量
// 	var count=lis.length;
// 	//2.3获取banner的宽度
// 	var bannerWidth=banner.offsetWidth;
// 	//2.4设置图片盒子的宽度
// 	imgBox.style.width=count*bannerWidth+"px";
// 	//2.5设置每一个li元素的宽度
// 	for(var i=0;i<lis.length;i++){
// 		lis[i].style.width=bannerWidth+"px";
// 	}
// 	/*3.设置默认偏移*/
// 	imgBox.style.left=-bannerWidth+"px";
//
// 	/*4.当屏幕发生变化时，重新开始计算*/
// 	window.onresize=function(){
// 	//4.1获取banner的宽度,覆盖全局的宽度值
// 	bannerWidth=banner.offsetWidth;
// 	//4.2设置图片盒子的宽度
// 	imgBox.style.width=count*bannerWidth+"px";
// 	//4.3设置每一个li元素的宽度
// 	for(var i=0;i<lis.length;i++){
// 		lis[i].style.width=bannerWidth+"px";
// 	}
// 	//4.4重新设置定位置
// 	imgBox.style.left=-index*bannerWidth+"px";
// 	}
//
// 	// 实现点标记
// 	var setIndicators=function(index){
// 		var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
// 		//先清除其他li元素的active
// 		for(var i=0;i<indicators.length;i++){
// 			indicators[i].classList.remove("active");
// 		}
// 		indicators[index-1].classList.add("active");
// 	}
// 	//5.实现自动轮播
// 	var index=1;//初始展示图片的索引值
// 	var timerId;
// 	var startTime=function(){
// 	 timerId=setInterval(function(){
// 		//5.1变换索引
// 		index++;
// 		//5.2添加过度效果
// 		imgBox.style.transition="left 0.5s ease-in-out";
// 		//5.3设置偏移
// 			imgBox.style.left=(-index*bannerWidth)+"px";
// 		setTimeout(function(){
// 			//5.4判断是否到最后一张，如果是则执行下面代码
// 			if(index==count-1){
// 			index=1;
// 			/*如果一个元素的某个属性之前添加过过渡效果。那么过度属性会一直存在，
// 			如果不想要，则需要清除过度效果*/
// 			imgBox.style.transition="none";
// 			//偏移到指定位置
// 			imgBox.style.left=(-index*bannerWidth)+"px";
// 			}
// 		},500);
// 	},1000);
// }
// 	//6.实现手动轮播
// 	//细节---touch事件的触发，必须保证元素具有宽高值
// 	//touchstart
// 	//touxhmove
// 	//touchend
// 	//1.获取到初始手指触摸的地方
// 	var startX,moveX,distanceX;
// 	var isend=true;
// 	imgBox.addEventListener("touchstart",function(e){
// 		console.log("123");
// 		// 清除定时器
// 		clearInterval(timerId);
// 		//获取当前手指起始的位置
// 		startX=e.targetTouches[0].clientX;
// 	});
// 	// 为图片添加触摸事件--滑动过程
// 	imgBox.addEventListener("touchmove",function(e){
// 		if(isend){
// 		moveX=e.targetTouches[0].clientX;
// 		// 计算坐标差异值
// 		distanceX=moveX-startX;
// 		// 为了保证效果正常,清除之前的过渡效果
// 		imgBox.style.transition="none";
// 		// 实现元素的偏移，left参照最原始的坐标
// 		// 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离
// 		imgBox.style.left=(-index*bannerWidth+distanceX)+"px";
// 		}
// 	});
//
// 	//2.获取到手指滑动过程中的坐标值,计算出相对于起始位置的偏移值，通过left样式实现图片的偏移
// 	//3.在松开手指之后，判断当前滑动的距离，如果超出指定的范围，就翻下一页
// 	imgBox.addEventListener("touchend",function(e){
// 		isend=false;
// 		//判断当前滑动的距离，如果超出指定的范围100px
// 		if(Math.abs(distanceX)>100){
// 			// 判断滑动的方向
// 			if(distanceX>0){
// 				index--;
// 			}else{
// 				index++;
// 			}
// 			imgBox.style.transition="left 0.5s ease-in-out";
// 			imgBox.style.left=-index*bannerWidth+"px";
// 		}
// 		else if(Math.abs(distanceX)>0){
// 			imgBox.style.transition="left 0.5s ease-in-out";
// 			imgBox.style.left=-index*bannerWidth+"px";
// 		}
// 		startX=0;
// 		moveX=0;
// 		distanceX=0;
// 		startTime();
// 	});
// 	// webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕时，会触发这个事件
// 	imgBox.addEventListener("webkitTransitionEnd",function(){
// 		if(index==count-1){
// 			index=1;
// 			imgBox.style.transition="none";
// 			imgBox.style.left=-index*bannerWidth+"px";
// 		}
// 		else if(index==0){
// 			index=count-2;
// 			imgBox.style.transition="none";
// 			imgBox.style.left=-index*bannerWidth+"px";
// 		}
// 		//设置点标记
// 		setIndicators(index);
// 		// setTimeout(function(){
// 		isend=true;
// 		clearInterval(timerId);
// 		 startTime();//},500);
//
// 	});
//
// }