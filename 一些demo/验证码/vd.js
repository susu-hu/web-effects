;(function(){
var data = [];//验证码数据
function picVerificationCode(config){
	/*
	验证码:数字和字母组成
	@param config {Object} 配置参数
	@param config.container {DOM元素} 验证码显示容器 必填
	@param config.num {Number} 验证码个数 非必填
	@param config.iconum {Number} 背景斑点个数 非必填
	@param config.changeBtn {DOM元素数组} 点击刷新验证码 非必填
	@param config.strFontSize {Array} 验证码字符大小 非必填
	@param config.width {Number} 验证码显示容器宽度 非必填
	@param config.height {Number} 验证码显示容器高度 非必填
	@param config.background {String} 验证码显示容器背景颜色 非必填
	@param config.cimgRefresh {Boolean} 是否点击验证码图片后刷新验证码 非必填
	*/
	//参数判断
	if(dataType(config)!='Object'){
		console.log('参数必须是object')
		return
	}
	if(!config.container||!isElement(config.container)){
		console.log('container参数必须是Dom元素')
		return;
	}
	//参数初始化(默认值)
	var defalutConfig = {
		num:4,
		iconum:10,
		width:160,
		height:40,
		background:'#ddd',
		fsize:[18,20,22,16],
		cimgRefresh:true
	}
	var config = Object.assign({},defalutConfig,config);//合并参数
	var verificationCode=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
	var tlist = [],//验证码字符数组
	color=[],//字符颜色
	rote=[],//字符旋转角度
	fsize=[];//字符字体大小
	config.container.innerHTML = '';//初始化验证码容器
	for(var i = 0;i<config.num;i++){
		var a = '';
		for(var j=0;j<3;j++){
			a+=randomNum(255).toString(16)
		}
		if(a.length == 4||a.length == 5){
			a = a.substr(0,3)
		}
		color.push('#'+a)
		if(config.fsize[i]){
			fsize.push(config.fsize[i]+'px')
		}else{
			fsize.push(config.fsize[randomNum(0,config.fsize.length-1)]+'px')	
		}
		tlist.push(verificationCode[randomNum(61)]);
		rote.push(randomNum(-45,45));
	}
	//设置验证码容器样式
	var box = config.container
	box.style.background = config.background;
	box.style.width = config.width+'px';
	box.style.height = config.height+'px';
	box.style.lineHeight = config.height+'px';
	box.style.display = 'inline-block';
	box.style.position = 'relative';
	box.style.textAlign = 'center';
	box.style.padding = 0;
	box.style.userSelect = 'none';
	var boxWidth = box.offsetWidth;
	var boxHeight = box.offsetHeight;
 
	var IconColor=[];//斑点颜色
	for(var m=0;m<config.iconum;m++){
		var threeColor = '';
		for(var j=0;j<3;j++){
			threeColor +=randomNum(255).toString(16)
		}
		if(threeColor.length == 4||threeColor.length == 5){
			threeColor = threeColor.substr(0,3)
		}
		IconColor.push('#'+threeColor)
	}
	for(var n=0;n<config.iconum;n++){
		var eltag = document.createElement("div");
		eltag.style.background = IconColor[n];
		eltag.style.position = 'absolute';
		eltag.style.width = '3px';
		eltag.style.height = '3px';
		eltag.style.borderRadius = '50%';
		eltag.style.top = randomNum(boxHeight-2)+'px';
		eltag.style.left = randomNum(boxWidth-2)+'px'
		box.appendChild(eltag)//添加斑点
	}
	for(var k=0;k<config.num;k++){
		//添加验证码字符
		var span = document.createElement("span");
		span.innerHTML=tlist[k];//内容
		span.style.color=color[k];//颜色
		span.style.fontSize=fsize[k];//字体大小
		span.style.display = 'inline-block';
		span.style.width = Math.floor((config.width/config.num))+'px';
		if(supportCss3('transform')){
			//浏览器如果支持css3 transform则设置
			span.style.transform='rotate('+rote[k]+'deg)';//旋转角度
		}
		box.appendChild(span)
	}
	//点击刷新验证码
	if(config.cimgRefresh){
		config.container.addEventListener('click',function(){
			picVerificationCode(Object.assign({},config,{cimgRefresh:false,changeBtn:null}))
		},true)
	}
	if(dataType(config.changeBtn)=='Array'){
		config.changeBtn.forEach(function(item,index){
			if(!isElement(item))return;
			item.addEventListener('click',function(){
				picVerificationCode(Object.assign({},config,{cimgRefresh:false,changeBtn:null}))
			},true)
		})
	}
	config.container.setAttribute('data-verificode',tlist)
	data = tlist;
	return tlist;
}
/******获取验证码数据******/
function getData(){
	return data
}
/******数组乱序******/
function shuffle(arr) {
  var length = arr.length,
    randomIndex,
    temp;
  while (length) {
    randomIndex = Math.floor(Math.random() * (length--));
    temp = arr[randomIndex];
    arr[randomIndex] = arr[length];
    arr[length] = temp
  }
  return arr;
}
/******判断浏览器是否支持某个css属性*******/
function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };
 
    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));
 
    humpString.push(_toHumb(style));
 
    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;
 
    return false;
}
/******判断js变量是否是DOM元素*******/
function isElement(OBJ){
	return HTMLElement?OBJ instanceof HTMLElement:(OBJ && typeof OBJ === 'object' &&(OBJ.nodeType === 1||OBJ.nodeType === 9) && typeof OBJ.nodeName === 'string')
}
/******判断数据类型*******/
function dataType(data){
	if(data === null) return 'Null';
	if(data === undefined) return 'Undefined';
	return Object.prototype.toString.call(data).slice(8,-1);
 
}
/******获取[a,b]范围内的随机数******/
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}
window.verifiCode = {
	picVerificationCode:picVerificationCode,
	getData:getData,
	shuffle:shuffle,
	supportCss3:supportCss3,
	isElement:isElement,
	dataType:dataType,
	randomNum:randomNum
 
}
})();
 