
const gameApi= {
    maxBlockNum: 0,
    that: null,
    //canvas 的宽
    canvasWidth: 400,
    //初始的块的多少
    blockNum: 2,
    gameView: null,
    //每次2个颜色的相差值
    reducedColor: 10000,


    init(num,_this){
        this.maxBlockNum= num;
        this.that= _this;

        let stage = new createjs.Stage("canvasView");
        //刷新帧数
        createjs.Ticker.setFPS(30);
        //给舞台添加 tick事件，自动刷新
        createjs.Ticker.addEventListener('tick',stage);
        //创建一个容器，所以的图案都放在里面
        this.gameView = new createjs.Container();
        //将容器放入舞台，显示
        stage.addChild(this.gameView);

        this.drawRect();
    },

    drawRect(){

        let that= this;
        let c1 = Math.floor(Math.random()*16777215);

        let c2= c1- this.reducedColor;

        if(c2<0){
            c2= c2+ this.reducedColor*2;
        }
        this.reducedColor= this.reducedColor-100;

        c1= c1.toString(16);
        c2= c2.toString(16);

        if(c1.length<6){
            let len= 6-c1.length;
            for(let i=0; i<len; i++){
                c1= "0"+c1;
            }
        }

        if(c2.length<6){
            let len= 6-c2.length;
            for(let i=0; i<len; i++){
                c2= "0"+c2;
            }
        }
        c1= '#'+c1;
        c2= '#'+c2;
        //可点击的块的位置，随机生成
        let x = parseInt(Math.random()*this.blockNum);
        let y = parseInt(Math.random()*this.blockNum);

        for(let indexX = 0 ; indexX <this.blockNum; indexX++){
            for(let indexY = 0; indexY <this.blockNum; indexY++){
                let r = new Rect(400,this.blockNum,c1,c2);
                this.gameView.addChild(r);
                //可以点击的哪个块，将其类型设置为2
                if(indexX === x && indexY ===y){
                    r.setRectType(2);
                }

                r.x = indexX*(400/this.blockNum);
                r.y = indexY*(400/this.blockNum);

                //获取块的类型
                if(r.getRectType()===2){
                    r.addEventListener('click',function(){
                        that.rightFunction();
                    });
                }else{
                    //点击了不可点击的块
                    r.addEventListener('click',function(){
                        that.falseFunction();
                    });
                }
            }
        }
    },

    rightFunction(){

        if(this.blockNum<this.maxBlockNum){
            this.blockNum++;
        }
        this.that.grade++;
        this.gameView.removeAllChildren();
        this.drawRect();

    },
    falseFunction(){
        this.that.showAlert= true;
    },

    //再来一局
    again(){
        this.blockNum= 2;
        this.gameView.removeAllChildren();
        this.drawRect();
    },

    close(){
        this.blockNum= 2;
        this.gameView.removeAllChildren();
        delete this.gameView;
    }
};



export default gameApi;




function Rect(width,num,color,RectColor){
    //创建一个对象指定到this
    createjs.Shape.call(this);

    //给块设置类型和颜色, 1 为不可点块， 2 可以点的块
    this.setRectType = function(type){
        this._RectType = type;
        switch(type){
            case 1 :
                this.setColor(color);
                break;
            case 2 :
                this.setColor(RectColor);
                break;
        }
    }

    //画出一个块
    this.setColor = function(colorString){
        //填充的颜色
        this.graphics.beginFill(colorString);
        //给边缘空出4px的边距
        this.graphics.drawRect(0,0,width/num-4,width/num-4);
        //结束绘图
        this.graphics.endFill();
    }

    //返回这个快的类型
    this.getRectType = function(){
        return this._RectType;
    }

    //设置默认类型为 1，
    this.setRectType(1);
}
Rect.prototype = new createjs.Shape();
