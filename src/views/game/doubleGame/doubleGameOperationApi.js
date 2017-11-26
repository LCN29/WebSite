
let obj = null;

const gameApi= {

    baseUrl: 'https://wd5687513773xuiafl.wilddogio.com',
    dataRef: null,
    gradeRef: null,
    game: null,

    score: 0,
    vueObj: null,
    questionNum: 5,
    type: null,

    initGame(_this,roomName,type){
        obj= this;
        this.vueObj = _this;
        this.type= type;
        this.initChildRef(roomName);
        this.game= new Game('moveBlock',this.rightFn,this.falseFn);

        let that= this;

        this.dataRef.on('value',function(snapshot){

            if(snapshot.val().gamedata !==undefined){
                let arr = snapshot.val().gamedata;
                let finish = snapshot.val().finish;
                if (finish === undefined) {
                    that.game.create(arr);
                } else {
                //    that.game.removeAndClear();
                    that.game = null;
                    _this.$router.push({name: 'gamegrade', params: {type: type,room: roomName,mode:'double'}});
                }
            }
        });

    },

    initChildRef(roomName){

        let dataUrl= this.baseUrl+"/"+roomName+'/gamedata';
        let gradeUrl= this.baseUrl+"/"+roomName+'/grade';

        wilddog.initializeApp({
            syncURL: dataUrl
        });
        this.dataRef= wilddog.sync().ref();

        wilddog.initializeApp({
            syncURL: gradeUrl
        });
        this.gradeRef = wilddog.sync().ref();
    },

    //3道题都答对
    rightFn(){
        obj.score++;
        obj.vueObj.score= obj.score+"/"+obj.questionNum;
        obj.gradeRef.once('value',function(gradeData){
            let myData = gradeData.val();
            let num = myData.num;
            let right,rightArea,worrgArea;

            if(obj.type === 'one'){
                right = myData.one.right;
                right++;
                rightArea = myData.one.rightArea || [];
                worrgArea = myData.one.worrgArea || [];
                rightArea.push(num);
                obj.gradeRef.update({
                    'num' : ++num,
                    'wrong' : 0,
                    one : {
                        'right' : right,
                        'rightArea' : rightArea,
                        'worrgArea' : worrgArea,
                    }
                });
            }else{
                right = myData.two.right;
                right++;
                rightArea = myData.two.rightArea || [];
                worrgArea = myData.two.worrgArea || [];
                rightArea.push(num);
                obj.gradeRef.update({
                    'num' : ++num,
                    'wrong' : 0,
                    two : {
                        'right' : right,
                        'rightArea' : rightArea,
                        'worrgArea' : worrgArea,
                    }
                });
            }

            console.log(num+"///"+obj.questionNum);
            if( num === (obj.questionNum+1)){
                obj.dataRef.update({
                    finish : 1,
                });
                return;
            }

            let arr= obj.createRandom();
            obj.dataRef.set({
                gamedata : arr
            });
        });

    },

    //回答错了
    falseFn(){

        obj.gradeRef.once('value',function(gradeData){
           let myData= gradeData.val();
           let num= myData.num;
           let wrongNum = myData.wrong;

            if( wrongNum === 0 ){
                wrongNum ++;
            }else{
                wrongNum = 0;
                num++;
            }

            let worrgArea,rightArea,right;

            if(obj.type === 'one'){
                worrgArea = myData.one.worrgArea || [];
                rightArea = myData.one.rightArea || [];
                right = myData.one.right;

                if(wrongNum === 1){
                    worrgArea.push(num);
                }else{
                   let temp = num - 1;
                    worrgArea.push(temp);
                }

                obj.gradeRef.update({
                    'num' : num,
                    'wrong' : wrongNum,
                    one : {
                        'right' : right,
                        'worrgArea' : worrgArea,
                        'rightArea' : rightArea,
                    }
                });
            }else{
                worrgArea = myData.two.worrgArea || [];
                rightArea = myData.two.rightArea || [];
                right = myData.two.right;
                if(wrongNum === 1){
                    worrgArea.push(num);
                }else{
                    let temp = num - 1;
                    worrgArea.push(temp);
                }

                obj.gradeRef.update({
                    'num' : num,
                    'wrong' : wrongNum,
                    two : {
                        'right' : right,
                        'worrgArea' : worrgArea,
                        'rightArea' : rightArea
                    }
                });
            }

            if(num === (obj.questionNum+1)){
                obj.dataRef.update({
                    finish : 1,
                });
                return;
            }

            if(wrongNum === 0){
                let arr = obj.createRandom();
                obj.dataRef.set({
                    gamedata : arr
                });
            }
        });

    },

    createRandom(){

        let arr = [];

        for(let i = 0; i<9; i++){
            arr[i] = Math.floor(Math.random()*16);
        }
        //确保文字的颜色为唯一的
        if(arr[1] === arr[4]){
            if(arr[4]=== arr[7]){
                arr[1]= Math.abs(arr[1]-1);
                arr[7]= Math.abs(arr[7]-4);
            }else{
                arr[4] = Math.abs(arr[4]-3);
            }
        }else{
            if(arr[1]=== arr[7]){
                arr[7]= Math.abs(arr[7]-4);
            }
        }
        return arr;
    }


};

export default gameApi;






function Game(canvasId,rightFunction,falseFunction){

    this.colors= [
        'red','orange','yellow','green','cyan','blue','purple',
        'indigo','white','black','grey','silver','gold','brown',
        'saddlebrown','pink'
    ];

    this.font = [
        '红','橙','黄','绿','青','蓝','紫','靛','白','黑','灰','银','金',
        '棕','褐','粉'
    ];

    this.RectColors= [
        'red','orange','yellow','green','cyan','blue','purple',
        'indigo','white','black','grey','silver','gold','brown',
        'saddlebrown','pink'
    ];

    this.canvasId = canvasId;
    //上面3个可以擦拭的块的数据
    this.eraserBlockData = [];
    this.matchBlock = null;
    this.eraserBlock = [];

    this.rightFunction = rightFunction;
    this.falseFunction = falseFunction;

}

Game.prototype.create=function(gameData){

    if(this.eraserBlock.length === 0){
        this.createData(gameData);
        this.createEraserZero();
        this.createMatchZero();
    }else{
        this.reStart(gameData);
    }
}


Game.prototype.createData=function(arr){

    var obj = null ;
    for(var i = 0; i<3; i++){
        obj = {};
        obj.word = this.font[arr[i*3]];
        obj.fontColor = this.colors[arr[i*3+1]];
        obj.bgColor = this.colors[arr[i*3+2]];
        this.eraserBlockData.push(obj);
    }

}

Game.prototype.createEraserZero=function(){

    for(var i = 0; i<3; i++){
        var id = 'eraser-block'+(i+1);
        var eraser = new Eraser(this.eraserBlockData[i].word,50,this.eraserBlockData[i].fontColor,this.eraserBlockData[i].bgColor,id);
        eraser.initShape();
        eraser.startGame();
        this.eraserBlock.push(eraser);
    }
}

Game.prototype.createMatchZero=function(){
    var answerColor = [];
    for(var i = 0; i<this.eraserBlockData.length;i++){
        answerColor[i] = this.eraserBlockData[i].fontColor;
    }
  //  var canvas = document.getElementById(this.canvasId);

    var w = 500;
    var h = 350;
    var height = Math.floor((h-70)/5);
    var width = Math.floor((w-50)/4);

    //正方形的边长
    var size = height>width ? width : height;

    this.RectColors.sort(this.randomsort);

    this.matchBlock = new Match02('moveBlock',this.RectColors,answerColor,size,this.rightFn.bind(this),this.falseFn.bind(this));
    this.matchBlock.buildShapes();
    this.matchBlock.startGame();
}

Game.prototype.randomsort=function(a,b){
    return Math.random()> 0.5 ? -1 : 1;
}

Game.prototype.reStart=function(arr){

    this.matchBlock.removeElem();
    for(var i = 0; i<this.eraserBlock.length;i++){
        this.eraserBlock[i].removeElem();
    }

    this.eraserBlockData = [];
    this.matchBlock = null;
    this.eraserBlock = [];
    this.create(arr);
}

Game.prototype.removeAndClear=function(){

    this.matchBlock.removeElem();
    for(var i = 0; i<this.eraserBlock.length;i++){
        this.eraserBlock[i].removeElem();
    }
    this.eraserBlockData = [];
    this.matchBlock = null;
    this.eraserBlock = [];
}

Game.prototype.rightFn=function(){
    this.rightFunction();
}

Game.prototype.falseFn = function(){
    this.falseFunction();
}

