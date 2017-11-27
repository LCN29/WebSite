<template>
    <div class="game-grade">
        <div class="single" v-if="mode==='single'">
            <h1>本轮游戏中,您获得了<span> {{singleGrade}} </span>分</h1>
            <img src="../../../assets/imgs/comeon.jpg"/>
            <div class="selected">
                <div @click.stop="goHome">回到首页</div>
                <div @click.stop="seeRank">查看排行榜</div>
                <div @click.stop="updateGrade">上传分数</div>
            </div>
            <prompt-dialog :showPrompt="showPrompt" :title="title" @confirm="confirm" @cancel="cancel"></prompt-dialog>
        </div>
        <div class="double" v-if="mode==='double'">
            <div class="double-score-result">
                <h1 :class="{ winStyle : result.win }">{{result.title}}</h1>
                <h3>总共{{result.questionNum}}题，您答对了<span>{{result.rightNum}}</span>题</h3>
            </div>
            <ul class="dobule-score-title">
                <li>
                    <div>题目</div>
                    <div>您的答案</div>
                    <div>对手的答案</div>
                </li>
            </ul>
            <ul class="dobule-score-body">
                <li v-for="(item ,index) in grade">
                    <div>第{{index+1}}题</div>
                    <div :class="{right : item.one ==2, wrong : item.one==0}" ></div>
                    <div :class="{right : item.two ==2, wrong : item.two==0}"></div>
                </li>
            </ul>
            <p class="finish">
                <span @click.stop="finish">结束</span>
            </p>
        </div>
    </div>
</template>

<script>

    import api from './gradeOperation';
    import PromptDialog from '../../../components/PromptDialog.vue';

    export default {
        name: 'game-grade',
        data(){
            return{
                //显示的是哪个模式的数据
                mode: this.$route.params.mode || 'single',

                //single模式
                singleGrade: this.$route.params.singleGrade,
                showPrompt: false,
                title: '先给自己起一个名字吧!',

                //double模式
                type: this.$route.params.type,
                roomName: this.$route.params.room ,
                result: {
                    title: '您赢了',
                    questionNum: 0,
                    rightNum: 0,
                    win: true,
                },
                grade: [
                ],
            }
        },
        methods: {
            finish(){
                api.doubleClear();
                this.$router.push({name: 'home'});
            },
            goHome(){
                this.$router.push({name: 'home'});
            },
            seeRank(){
                console.log('查看排行榜');
            },
            updateGrade(){
                this.showPrompt= true;
            },
            confirm(){
                this.showPrompt= false;
                console.log('上传分数');
            },
            cancel(){
                this.showPrompt= false;
                console.log('取消');
            }
        },
        components: {
            PromptDialog
        },
        mounted(){
            if(this.mode === 'double'){
                api.doubleInit(this.type,this.roomName,this);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    .game-grade{
        .double{
            .double-score-result{
                display: flex;
                justify-content: center;
                flex-direction: column;
                h1{
                    text-align: center;
                    text-shadow: skyblue 1px 1px;
                }
                h3{
                    text-align: center;
                    span{
                        color: red;
                    }
                }
                .winStyle {
                    color: gold;
                    text-shadow: #000000 1px 2px;
                }
            }
            .dobule-score-body,.dobule-score-title{
                width: 450px;
                margin: 0 auto;
                li{
                    display: flex;
                    width: 100%;
                    background: pink;
                    border: 1px solid black;
                    border-top: 0px;
                    &:nth-child(1){
                        border-top: 1px solid black;
                    }
                    div{
                        flex: 1;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        border-left: 1px solid black;
                        margin: 2px 0px;
                        &:nth-child(1){
                            border-left: 0px;
                        }
                    }
                }
            }
            .dobule-score-body{
                div{
                    background: url("../../../assets/svgs/miss.svg") center center no-repeat;
                    background-size: contain;
                    &:nth-child(1){
                        background: pink;
                    }
                }
                .right{
                    background: url("../../../assets/imgs/right.png") center center no-repeat;
                    background-size: 50% 50%;
                }
                .wrong{
                    background: url("../../../assets/imgs/wrong.png") center center no-repeat;
                }
            }
            .finish{
                width: 452px;
                margin: 0 auto;
                text-align: right;
                span{
                    display: inline-block;
                    background: rgba(124,205,124, 0.8);
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                    cursor: pointer;
                    &:hover{
                        background: rgba(124,205,124, 1);
                    }
                }
            }
        }
        .single{
            width: 450px;
            height: 500px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            h1{
                text-align: center;
                color: white;
                text-shadow: rgba(123,232,33,0.5) 1px 1px;
                font-size: 24px;
                span{
                    color: red;
                    font-size: 30px;
                }
            }
            img{
                margin: 30px 0;
                width: 30%;
                border-radius: 10px;
                animation:mymove 10s linear  0.2s infinite alternate;
            }
            .selected{
                margin-top: 10px;
                display: flex;
                justify-content: space-around;
                div{
                    background: yellowgreen;
                    border: 1px solid white;
                    padding: 5px 10px;
                    border-radius: 2px;
                    cursor: pointer;
                    opacity: 0.8;
                    &:hover{
                        opacity: 1.0;
                    }
                    &:nth-child(1){
                        background: #9AFF9A;
                    }
                    &:nth-last-child(1){
                        background: #EE5C42;
                    }
                }
            }
            @keyframes mymove
            {
                0% 	{ transform: rotate(0deg); opacity: 1.0}
                50% 	{ transform: rotate(20deg); opacity: 0.8}
                100% 	{ transform: rotate(-20deg); opacity: 1.0}
            }
        }
    }

</style>
