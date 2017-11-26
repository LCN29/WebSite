<template>
    <div class="game-grade">
        <div class="single" v-if="mode==='single'">
            单人模式
        </div>
        <div class="double" v-if="mode==='double'">
            <h1 :class="{ winStyle : win }">{{result}}</h1>
            <h4>总共 {{questionNum}} 题，你答对了<span>{{rightNum}}</span>题</h4>
            <ul>
                <li>
                    <a>你的成绩</a>
                    <div v-for="(item, index) in myGrade" key="item" :class="{right : item==2, wrong : item==0}">
                        <p>第{{index+1}}题</p>
                    </div>
                </li>
                <li>
                    <a>对手的成绩</a>
                    <div v-for="(item, index) in hisGrade" key="item" :class="{right : item==2, wrong : item==0}">
                        <p>第{{index+1}}题</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import api from './gradeOperation';

    export default {
        name: 'game-grade',
        data(){
            return{
                //显示的是哪个模式的数据
                mode: this.$route.params.mode || 'double',

                //double模式
                result : '您赢了',
                questionNum : 0,
                rightNum : 0,
                win : true,
                type: this.$route.params.type || 'one',
                /* 成绩中 0：答错了，1:没有回答  2答对了 */
                myGrade : [],
                hisGrade : [],
                roomName: this.$route.params.room || 'room',
            }
        },
        mounted(){
            if(this.mode === 'double'){
                api.doubleInit(this.type,this.roomName,this);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrong {
        background: rgba(238,0,0,0.8);
    }
    .right {
        background: rgba(124,205,124, 0.8);
    }

</style>
