
const gradeApi= {
    baseUrl: 'https://wd5687513773xuiafl.wilddogio.com',
    type: '',
    roomName: '',
    gradeRef: null,

    doubleInit( type, roomName,_this ){
        this.type= type;
        this.roomName= roomName;

        let gradeUrl= this.baseUrl+"/"+roomName+'/grade';
        wilddog.initializeApp({
            syncURL: gradeUrl
        });
        this.gradeRef = wilddog.sync().ref();
        this.getGrade(_this);
    },

    doubleClear(){
        console.log('结束');
        let roomUrl= this.baseUrl+"/"+this.roomName;
        wilddog.initializeApp({
            syncURL: roomUrl
        });
        let roomRef = wilddog.sync().ref();
        roomRef.remove();
    },

    getGrade(_this){
        let that= this;
        this.gradeRef.once('value',function(data){
            let myData = data.val();
            _this.result.questionNum = --myData.num;
            if('one' === _this.type){
                _this.result.win = myData.one.right >= myData.two.right;
                _this.result.title = myData.one.right >= myData.two.right ? '你赢了' : '你输了';
                _this.result.rightNum = myData.one.right;
                that.handlerGrade(myData.one,myData.two,_this);
            }else{
                _this.result.win = myData.two.right>=myData.one.right;
                _this.result.title = myData.two.right >=myData.one.right ? '你赢了' : '你输了';
                _this.result.rightNum = myData.two.right;
                that.handlerGrade(myData.two,myData.one,_this);
            }
        });
    },

    handlerGrade(myData,hisData,_this){

        /* 成绩中 0：答错了，1:没有回答  2答对了 */
        let tempObj = [];
        for(let i = 0; i<_this.result.questionNum; i++){
            let temp= {
                'one': 1,
                'two': 1,
            };
            tempObj.push(temp);
        }
        let len = 0;
        let index= 0;
        len = myData.rightArea ? myData.rightArea.length : 0;

        for(let i =0 ; i<len; i++){
            index = myData.rightArea[i]-1;
            tempObj[index].one = 2;
        }

        len = myData.worrgArea ?  myData.worrgArea.length : 0;
        for(let i =0 ; i<len; i++){
            index = myData.worrgArea[i]-1;
            tempObj[index].one = 0;
        }

        len = hisData.rightArea ? hisData.rightArea.length : 0;
        for(let i =0 ; i<len; i++){
            index = hisData.rightArea[i]-1;
            tempObj[index].two =2;
        }

        len = hisData.worrgArea ?  hisData.worrgArea.length : 0;
        for(let i =0 ; i<len; i++){
            index = hisData.worrgArea[i]-1;
            tempObj[index].two =0;
        }

        _this.grade= tempObj;
    }

};

export default gradeApi;
