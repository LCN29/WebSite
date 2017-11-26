

/*
	所有形状的基类
 	@type 形状类型
 	@color 颜色
 */
function Shape(type, color){
	createjs.Shape.call(this);
	this.type = type;
	this.color = color;
}

for(var i in createjs.Shape.prototype){
	Shape.prototype[i] = createjs.Shape.prototype[i];
}

Shape.prototype.getType=function(){
	return this.type;
}

Shape.prototype.getColor=function(){
	return this.color;
}

//原型继承
function extend(obj){
	for( var i in Shape.prototype ){
		obj[i] = Shape.prototype[i]
	}
}

/*--------------------------------------------------------------------------*/


/*
 	矩形
  	@type 形状类型
 	@color 颜色
 	@width @height 形状的宽，高
 */

function Rectangle(type,color,width,height){
	Shape.call(this,type,color);
	this.width = width;
	this.height = height;
	this.firstPositon = {};

}

//继承Shape的原型
extend(Rectangle.prototype);

//开始画图
Rectangle.prototype.drawRectangle=function(targetX,targetY){

	//绘图
	this.graphics.beginFill(this.color);
	this.graphics.drawRect(0,0,this.width,this.height);
	this.graphics.endFill();

	//修改位置
	this.changePosition(targetX,targetY);
	//保存第一次所在的位置
	this.saveFirstPosition(targetX,targetY);

}

//改变位置
Rectangle.prototype.changePosition=function(targetX,targetY){
	this.x = targetX-this.width/2;
	this.y = targetY-this.height/2;
};

//保存第一次的位置
Rectangle.prototype.saveFirstPosition=function(targetX,targetY){
	this.firstPositon = {
		x : targetX-this.width/2,
		y : targetY-this.height/2
	}
};

//获取第一次的位置
Rectangle.prototype.getFirstPosition=function(targetX,targetY){
	return this.firstPositon;
};


/*--------------------------------------------------------------------------*/

/*
 	具有边框的矩形（空心的）
  	@type 形状类型
 	@color 中间的颜色
 	@strokeColor 边框的颜色
 	@width @height 形状的宽，高
 */

function Stroke(type,color,strokeColor,width,height){

	Shape.call(this,type,color);

	this.strokeColor = strokeColor;
	this.width = width;
	this.height = height;

}

//继承Shape的原型
extend(Stroke.prototype);

//绘图
Stroke.prototype.drawStroke=function(targetX,targetY){

	this.graphics.beginStroke(this.color);
	this.graphics.beginFill(this.strokeColor);
	this.graphics.drawRect(0,0,this.width,this.height);
	this.graphics.endFill();
	this.changePosition(targetX,targetY);
}

//修改位置
Stroke.prototype.changePosition=function(targetX,targetY){
	this.x = targetX-this.width/2;
	this.y = targetY-this.height/2;
}


/***************************************************************/


/*
 	文字类
 */

function Text(){
	createjs.Text.call(this);
}


for(var i in createjs.Text.prototype){
	Text.prototype[i] = createjs.Text.prototype[i];
}

Text.prototype.setContent=function(text,font,color){
	this.text = text;
	this.font = font ? font : 'bold 36px Arial';
	this.color = color ? color : 'black';
};

Text.prototype.setColor=function(color){
	this.color = color;
};


/*--------------------------------------------------------------------------*/
/*
 	具有背景颜色的文字
 */


function BackgroundText(){
	createjs.Container.call(this);
}

for(var i in createjs.Container.prototype){
	BackgroundText.prototype[i] = createjs.Container.prototype[i];
}

BackgroundText.prototype.create=function(content,size,fontColor,backgroundColor){

	var rect = new Rectangle('rectangle',backgroundColor,size,size);
	rect.drawRectangle(size/2,size/2);

	var txt = new Text();
	var font = 'bold '+ size +'px Arial';
	txt.setContent(content,font,fontColor);
	var bounds = txt.getBounds();

	var rect = new Rectangle('rectangle',backgroundColor,Math.ceil(bounds.width),Math.ceil(bounds.height));
	rect.drawRectangle(Math.ceil(bounds.width)/2,Math.ceil(bounds.height)/2);

	this.addChild(rect);
	this.addChild(txt);
}


/*--------------------------------------------------------------------------*/

/*
 	被一个遮罩遮住的文字
 */

function MaskText(){
	BackgroundText.call(this);
	this.greyShape = null ;
}

for( var i in BackgroundText.prototype ){
	MaskText.prototype[i] = BackgroundText.prototype[i];
}


MaskText.prototype.addMask=function(){

	var maskTxtShape = new Shape(); //子遮罩
	maskTxtShape.graphics.beginFill("#ff0000");
	maskTxtShape.graphics.drawCircle(0,0,0);
	this.mask = maskTxtShape;

	this.greyShape = new createjs.Shape();//灰色图层
	this.greyShape.graphics.beginFill("#999999");
	var bounds = this.getBounds();
	this.greyShape.graphics.drawRect(0,0,Math.ceil(bounds.width),Math.ceil(bounds.height));
	this.greyShape.graphics.endFill();
	return this.greyShape;
}

MaskText.prototype.addEraseLayer=function(){
	var eraseShape = new Shape();
	eraseShape.graphics.beginFill("rgba(255,255,255,1)");
	eraseShape.compositeOperation = "destination-out";//叠加方式
	return eraseShape;
}

MaskText.prototype.setPosition=function(targetX,targetY){
	this.x = targetX;
	this.y = targetY;
	this.greyShape.x = targetX;
	this.greyShape.y = targetY;
}



/*******************************************************************/


/*
 * 舞台类，
 	@canvas canvas id
 */


function Stage(canvas){
	createjs.Stage.call(this,canvas);
}

//原型继承
for(var i in createjs.Stage.prototype){
	Stage.prototype[i] = createjs.Stage.prototype[i];
}

// 点击stage,让某个元素到达自己面前
Stage.prototype.addWipe=function(container,eraseLayer){
	var _this = this;
	this.addEventListener('stagemousedown',function(ev){
		_this.fnWipeDown(ev,container,eraseLayer);
	});
};

Stage.prototype.fnWipeDown = function(ev,container,eraseLayer){
	this.handlerWipe(ev,container,eraseLayer);

	var _this = this;
	this.addEventListener('stagemousemove',function(ev){
		_this.fnWipeMove(ev,container,eraseLayer);
	});

	this.addEventListener('stagemouseup', function(){
		_this.endWipeMove();
	});

}

Stage.prototype.fnWipeMove = function(ev,container,eraseLayer){
	this.handlerWipe(ev,container,eraseLayer);
}

Stage.prototype.endWipeMove=function(){
	this.removeEventListener("stagemousemove",this.handlerWipe);
}

Stage.prototype.handlerWipe=function(ev,container,eraseLayer){
	container.mask.graphics.drawCircle(ev.rawX,ev.rawY,10).closePath();
	eraseLayer.graphics.drawCircle(ev.rawX,ev.rawY,10).closePath();
}


/*	给元素添加运动元素
 	@elem  运动的元素
 	@fn  运动结算时的回调函数
 */
Stage.prototype.startMove=function(elem,fn){
	this.fnDown(elem,fn);
}

//按下时，可以触发
Stage.prototype.fnDown=function(elem,fn){

	var _this = this;
	this.addEventListener('stagemousemove',function(ev){
		_this.fnMove(ev,elem);
	});

	this.addEventListener('stagemouseup', function(ev){
		_this.endMove(elem,fn);
	});

}

//运动中的处理函数
Stage.prototype.fnMove = function(ev,elem){
	elem.changePosition(ev.stageX,ev.stageY);
}

//抬起，既运动处理函数
Stage.prototype.endMove = function(elem,fn){
	this.removeAllEventListeners();
	fn(elem);
}





/*******************************************************************/

/*
 	给定一个 canvas和可以选择的颜色可以生成一个可以选择匹配的模板

 	canvasId  画布id
 	colors    可以选择的颜色数组

 */

function Match( canvasId ,colors){

	this.colors = colors;
	this.canvase = document.getElementById(canvasId);
	this.stage = new Stage(canvasId);
	this.rects = [];
	this.strokes = [];
	this.score = 0;
}

Match.prototype.buildShapes=function(){

	//获取canvas 的宽高
	var width = parseInt(this.canvase.getAttribute('width'));
	var height = parseInt(this.canvase.getAttribute('height'));

	//一行要生成几个
	var num = this.colors.length;

	//如果生成num个，每个的宽为
	var rectWidth = Math.floor(width/num);
	// 如果生成2行，每个的高为
	var rectHeight = Math.floor(height/2);


	// -10  块与快之间的间隙 从可以生成的宽高中，选一个小的，作为正方形的边长
	var size = rectWidth > rectHeight ? rectHeight-20 : rectWidth-20;

	// 第一行的 y轴中心
	var strokeHeight = (height-2*size)/4+size/2;

	//第二行的y轴中心
	var rectangleHeight = height/2+strokeHeight;

	//拷贝一组新的颜色，后面打乱，生成第二行
	var colors2=[];
	for(var i=0;i<num;i++){
        colors2[i]=this.colors[i];
   	}


	var rect, stroke;
	for (var i = 0; i < num ; i++) {

		stroke = new Stroke('stroke',this.colors[i],'white',size,size);
		stroke.drawStroke(size/2*(2*i+1)+20*i+10 ,strokeHeight);
	    this.stage.addChild(stroke);
	    this.strokes.push(stroke);

	    //随机从第二组里面取一种颜色，然后删掉
	    var r = Math.floor(Math.random() * colors2.length);
	   	rect = new Rectangle('rectange',colors2[r],size,size);
	   	rect.drawRectangle(size/2*(2*i+1)+20*i+10,rectangleHeight);
	 	this.stage.addChild(rect);

		//添加按下事件
		var _this = this;
	 	rect.addEventListener("mousedown", function(ev){
	 		_this.startDrag(ev);
	 	});

	    this.rects.push(rect);
	    colors2.splice(r, 1);
	}
}

Match.prototype.startGame=function(){

	//设置舞台以60帧/s的速率自动刷新刷新
	var _this = this;
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", function(e) {
		_this.stage.update();
	});
}

Match.prototype.startDrag=function(ev) {

	var rect = ev.target;
	//将按下的元素提到所有元素的最上层
	this.stage.setChildIndex(rect, this.stage.getNumChildren()-1);
	//调用舞台的移动事件
  	this.stage.startMove(rect,this.stopDrag.bind(this));
}

//移动停止 抬起事件
Match.prototype.stopDrag=function(elem){

	var rect = elem;
	var stroke = null;
	//从数组中找到和选择的长方形一样颜色的空心矩形
  	for(var i in this.strokes){
  		if(rect.getColor()===this.strokes[i].getColor()){
  			stroke = this.strokes[i];
  			break;
  		}
  	}

  	//设置pt为全局的数据，
	var pt = stroke.globalToLocal(this.stage.mouseX, this.stage.mouseY);

	//抬起的点在空心矩形的内部吗？
	if (stroke.hitTest(pt.x, pt.y)) {
		rect.removeAllEventListeners();
		this.score++;
  		createjs.Tween.get(rect).to({
	        x: stroke.x,
	        y: stroke.y
	    }, 200, createjs.Ease.quadOut).call(this.checkGame.bind(this));
	}else{
		createjs.Tween.get(rect).to(
			rect.getFirstPosition(),
			200,
			createjs.Ease.quadOut
		);
	}
}

Match.prototype.checkGame=function() {
	if (this.score == this.colors.length) {
	    alert('你赢了!');
	}
}



/*
 	一个被遮罩遮住的文字块，可以擦除遮罩
 	文字块的 背景，文字，文字的颜色会不同

 	@content : 文字内容
 	@fontSize : 文字大小
 	@backgroundColor : 背景颜色
 	@canvasId : canvas id
 */


function Eraser(content,fontSize,fontColor,backgroundColor,canvasId){
	this.stage = new Stage(canvasId);
	createjs.Touch.enable(this.stage);
	this.eTxt = new MaskText();
	this.eTxt.create(content,fontSize,fontColor,backgroundColor);
    this.first= true;
}

Eraser.prototype.initShape=function(){

	//遮罩
	var mask = this.eTxt.addMask();
	this.stage.addChild(mask);

	//可擦图层
	var eraseLayer = this.eTxt.addEraseLayer();
	this.stage.addChild(eraseLayer);
	this.stage.addChild(this.eTxt);
	this.stage.addWipe(this.eTxt,eraseLayer);
}

Eraser.prototype.startGame=function(){
	//设置舞台以60帧/s的速率自动刷新刷新
	var _this = this;
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", function(e) {
		_this.stage.update();
	});
}

Eraser.prototype.changePosition=function(targetX,targetY){
	this.eTxt.setPosition(targetX,targetY);
}

Eraser.prototype.removeElem=function(){
    if(	this.first){
        this.first= false;
    }else {
        this.stage.removeAllChildren();
    }

}


/*
 	给定一个 canvas和可以选择的颜色可以生成一个可以选择匹配的模板

 	canvasId  画布id
 	colors    可以选择的颜色数组

 */


function Match02( canvasId ,rectColors, answerColor,size,fn,finishFn){

	this.rectColors = rectColors;
	this.answerColor = answerColor;
	this.size = size;
	this.canvase = document.getElementById(canvasId);
	this.stage = new Stage(canvasId);
	createjs.Touch.enable(this.stage);
	this.rects = [];
	this.strokes = [];
	this.score = 0;
	this.index = 0;
	this.selectColor = '';
	this.fn = fn? fn : null;
	this.finishFn = finishFn ? finishFn : null;
}

Match02.prototype.buildShapes=function(){

	//获取canvas 的宽高
	var width = 500;
	var height = 350;

	var marginLeft = (width-this.size*4)/5;
	var marginTop = (height-this.size*5-10)/6;

	var rect, stroke;

	for(var i = 0; i<4; i++){
		var x = (marginLeft+this.size)*i+marginLeft+this.size/2;
		for( var j = 0; j<4; j++){
			var y = (marginTop+this.size)*j+marginTop+this.size/2;
	   		rect = new Rectangle('rectange',this.rectColors[i*4+j],this.size,this.size);
	   		rect.drawRectangle(x,y);
	 		this.stage.addChild(rect);
	 		rect.key=i*4+j;

	 		var _this = this;
		 	rect.addEventListener("mousedown", function(ev){
		 		_this.startDrag(ev);
		 	});

		    this.rects.push(rect);
		}
	}

	var h = (marginTop+this.size)*4+marginTop+10+this.size/2; // y轴
	var left = (width-(this.size+20)*3)/2;//x轴的左边距

	for(var k = 0; k<3; k++){
		var strokeX = (this.size+20)*k+20+this.size/2+left;
		stroke = new Stroke('stroke','black','white',this.size,this.size);
		stroke.drawStroke(strokeX ,h);
		this.stage.addChild(stroke);
	    this.strokes.push(stroke);
	}
}

Match02.prototype.startGame=function(){

	//设置舞台以60帧/s的速率自动刷新刷新
	var _this = this;
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", function(e) {
		_this.stage.update();
	});
}

Match02.prototype.startDrag=function(ev) {

	var rect = ev.target;
	//将按下的元素提到所有元素的最上层
	this.stage.setChildIndex(rect, this.stage.getNumChildren()-1);
	//调用舞台的移动事件
  	this.stage.startMove(rect,this.stopDrag.bind(this));
}

//移动停止 抬起事件
Match02.prototype.stopDrag=function(elem){

	var rect = elem;
	var stroke = this.strokes[this.index];
	this.selectColor = this.rectColors[rect.key];

  	//设置pt为全局的数据，
	var pt = stroke.globalToLocal(this.stage.mouseX, this.stage.mouseY);

	//抬起的点在空心矩形的内部吗？
	if (stroke.hitTest(pt.x, pt.y)) {
		rect.removeAllEventListeners();
		this.score++;

       createjs.Tween.get(rect).to({
	        x: stroke.x,
	        y: stroke.y
	    }, 200, createjs.Ease.quadOut).call(this.checkGame.bind(this));

	}else{
		createjs.Tween.get(rect).to(
			rect.getFirstPosition(),
			200,
			createjs.Ease.quadOut
		);
	}
}

Match02.prototype.checkGame=function() {


	if(this.answerColor[this.index]!==this.selectColor){
		this.stage.removeAllChildren();
		this.finishFn&& this.finishFn();
	}else{
		if(this.score === 3){
			this.fn&& this.fn();
		}else{
			this.index++;
		}
	}
}

Match02.prototype.removeElem=function(){
	this.stage.removeAllChildren();
}
