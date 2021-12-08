(function() {
  var $w = $(window);
  $w.on('scroll', function() {
            let scrollNow = window.pageYOffset;
            let pageClientHeight = document.documentElement.clientHeight;

            let scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            ) - pageClientHeight; // Full Window Height minus the viewport height
            
            let fullWindowHeightInPercentage = Math.round(
                (scrollNow / scrollHeight) * 100 
            );
            
            let percentage = document.getElementById('percentage');
            percentage.style.width = fullWindowHeightInPercentage + '%';
  });
}());

$(function(){
	let model={
		/*info:function(title,title2,url){
			let html=`<a href="${url}" target="_blank">
						<div class="position-f left-0 bottom-0 background-white align-center padding-top-10 z-index-10 line-height-30 padding-10 width-560" style="background: #e42837; margin-left: -280px; left: 50%; border-radius: 10px 10px 0px 0px">
							<span class="block color-white font-size-24">${title}</span>
							<span class="block color-white font-size-16" style="color: #ffe7a5">${title2}</span>
						</div>
					</a>`;
				return $("body").append(html);
		},*/
		info:function(title,title2,url){
			let html=`<a href="${url}" target="_blank">
						<div class="position-f left-0 bottom-0 background-white align-center padding-top-10 z-index-10 line-height-30 padding-10 width-560" style="background: #e42837; margin-left: -186px; left: 50%; border-radius: 10px 10px 0px 0px">
							<span class="block color-white font-size-24">${title}</span>
							<span class="block color-white font-size-16" style="color: #ffe7a5">${title2}</span>
						</div>
					</a>`;
				return $("body").append(html);
		},
		info2:function(url){
			let html=`<a href="${url}" target="_blank">
						<div class="position-f width-50 height-160 radius-30 background-eee border-0 border-eee right-20 top-120 z-index-1000 align-center pointer">
							<div class="float-right margin-5 width-40 height-40 radius-40 overflow-hidden">
							<img width="40" src="http://www.100sucai.com/images/weixin/me.jpg">
							</div>
							<span class=" inline-block font-size-18 bold color-666">赞
							<br>赏
							<br>支
							<br>持
							</span>
						</div>
					</a>`;
				return $("body").append(html);
		},
		info3:function(){
			let html=`<div class="position-f right-10 bottom-10 z-index-1000">
						<div class="width-150 height-250 line-height-30 background-red color-white padding-10 font-size-16" style="background: #282c34">
							<div class="width-80 height-auto margin-auto padding-top-20">
								<a href="http://www.good1230.com/react/" target="_blank">
									<img src="http://www.good1230.com/dist/server/images/article_title/1599033988.png" class="width-80">
								</a>
							</div>
							<a href="http://www.good1230.com/react/" target="_blank" class="block none-line color-white"><strong class="font-size-18">React+Element</strong><br/>开发的后台系统</a>
							<a href="https://github.com/huanglongjiang/good-react-element" target="_blank" class="block none-line color-white margin-top-10">Github下载源码</a>
						</div>
						<div class="width-150 height-250 line-height-30 background-red color-333 padding-10 font-size-16" style="background: #f8f8f8">
							<div class="width-80 height-auto margin-auto padding-top-20">
								<a href="http://www.good1230.com/good_vue2/#/index" target="_blank">
									<img src="http://www.good1230.com/dist/server/images/article_title/1533981109.png" class="width-80">
								</a>
							</div>
							<a href="http://www.good1230.com/good_vue2/#/index" target="_blank" class="block none-line color-333"><strong class="font-size-18">Vue+Element</strong><br/>开发的后台系统</a>
							<a href="https://github.com/huanglongjiang/good-vue2" target="_blank" class="block none-line color-333 margin-top-10">Github下载源码</a>
						</div>
					</div>`;
				return $("body").append(html);
		},
	}
	//model.info("进入后台管理系统","http://www.good1230.com/good_vue2/#/role","http://www.good1230.com/good_vue2/#/role")
	model.info2("http://www.100sucai.com/html/Pay.html")
	//model.info3()
})

/*<span class="block color-white font-size-24">${title}</span>
<span class="block color-white font-size-16" style="color: #ffe7a5">${title2}</span>*/