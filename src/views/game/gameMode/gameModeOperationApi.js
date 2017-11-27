
const gameApi= {

    one: true,
    ref: null,
    roomRef: null,
    dataRef: null,
    gradeRef: null,

    init(){
        wilddog.initializeApp({
            syncURL: 'https://wd5687513773xuiafl.wilddogio.com',
        });
        this.ref= wilddog.sync().ref();
    },

    createRoom(name,_this){
        this.roomRef = this.ref.child(name);
        this.roomRef.set({
            'roomName' : name,
            'personNum': 1,
            'state' : 0,
        });
        this.listenJoinRoom(_this,name);
    },

    listenJoinRoom(_this,name){
        let that = this;
        this.roomRef.on("value", function(data) {
            let myData = data.val();
            if(myData.personNum === 2 ){
                that.roomRef.update({
                    'state' : 1,
                });
                that.dataRef= that.roomRef.child('gamedata');
                that.gradeRef = that.roomRef.child('grade');

                if( myData.grade === undefined){
                    that.gradeRef.set({
                        num : 1,
                        wrong : 0,
                        one : {
                            right : 0,
                            rightArea : [],
                            worrgArea : [],
                        },
                        two : {
                            right : 0,
                            rightArea : [],
                            worrgArea : [],
                        }
                    });
                }

                if(myData.gamedata === undefined ){
                    let arr = that.createRandom();
                    that.dataRef.set({
                        gamedata : arr
                    });
                }

                _this.$router.push({name: 'doublegame', params: {type: "one", room: name}});
            }
        });

    },

    joinRoom(name,_this){

        this.roomRef = this.ref.child(name);
        let that = this;
        this.roomRef.once('value',function(data){
            let myData = data.val();

            if(myData === null){
                _this.noRoom();
            }else{
                that.roomRef.update({
                    "personNum" : 2
                });
                that.listenStartGame(_this,name);
            }
        });
    },

    listenStartGame(_this,name){
        let that= this;
        this.roomRef.on("value", function(data) {
            let myData = data.val();
            //
            if(myData.personNum === 2 && myData.state === 1){
                if(that.one){
                    that.one= false;
                    _this.$router.push({name: 'doublegame', params: {type: "two",room: name}});
                  //  that.clear();
                }

            }
        });
    },

    clear(){
        this.one= true;
        this.ref= null;
        this.roomRef= null;
        this.dataRef= null;
        this.gradeRef= null;
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
