
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
            _this.questionNum = --myData.num;
            if('one' === _this.type){
                _this.win = myData.one.right >myData.two.right;
                _this.result = myData.one.right >myData.two.right ? '你赢了' : '你输了';
                _this.rightNum = myData.one.right;
                that.handlerGrade(myData.one,myData.two,_this);
            }else{
                _this.win = myData.two.right>myData.one.right;
                _this.result = myData.two.right >myData.one.right ? '你赢了' : '你输了';
                _this.rightNum = myData.two.right;
                _this.handlerGrade(myData.two,myData.one,_this);
            }
        });
    },

    handlerGrade(myData,hisData,_this){
        for(let i = 0; i<this.questionNum; i++){
            _this.myGrade.push(1);
            _this.hisGrade.push(1);
        }
        let len= 0;
        let index= 0;
        len = myData.rightArea ? myData.rightArea.length : 0;

        for(let i =0 ; i<len; i++){
            index = myData.rightArea[i]-1;
            _this.myGrade[index] = 2;
        }

        len = myData.worrgArea ?  myData.worrgArea.length : 0;
        for(let i =0 ; i<len; i++){
            index = myData.worrgArea[i]-1;
            _this.myGrade[index] = 0;
        }

        len = hisData.rightArea ? hisData.rightArea.length : 0;
        for(let i =0 ; i<len; i++){
            console.log(i);
            index = hisData.rightArea[i]-1;
            _this.hisGrade[index] =2;
        }

        len = hisData.worrgArea ?  hisData.worrgArea.length : 0;
        for(let i =0 ; i<len; i++){
            index = hisData.worrgArea[i]-1;
            _this.hisGrade[index] =0;
        }
    }

};

export default gradeApi;
