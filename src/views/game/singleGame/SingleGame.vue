<template>
    <div class="single-game">
        <div class="game-body">
            <div>
                得分:<span>{{grade}}</span>
            </div>
            <canvas id='canvasView' width="400px" height="400px"></canvas>
        </div>
        <alert-dialog :title="title" :selected="selected" @confirm="confirm" @cancel="cancel" :showAlert="showAlert"></alert-dialog>
    </div>
</template>

<script>
    import AlertDialog from '../../../components/AlertDialog.vue';
    import api from './singleGameOperation';
    export default {
        name: 'single-game',
        data(){
            return{
                num: this.$route.params.num,
                grade: 0,
                showAlert: false,
                title: "游戏结束，是否需要再来一局呢？",
                selected: [
                    '再来一局',
                    '不了'
                ],
            }
        },
        components: {
            AlertDialog
        },
        methods: {
            confirm(){
                this.showAlert= false;
                this.grade= 0;
                api.again();
            },
            cancel(){
                this.showAlert= false;
                api.close();
                this.$router.push({name: 'gamegrade', params: {mode:'single',singleGrade:this.grade}});
            },
        },
        mounted(){
            api.init(this.num,this);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .single-game{
        width: 450px;
        margin: 0 auto;
        position: relative;
        .game-body{
            width: 400px;
            margin: 0 auto;
            div{
                text-align: right;
                font-size: 20px;
                margin-bottom: 10px;
                span{
                    font-size: 16px;
                    color: red;
                    margin-left: 10px;
                }
            }
            #canvasView{
                background: wheat;
                margin: 0 auto;
                border-radius: 5px;
                padding-top: 4px;
                padding-left: 4px;
            }
        }
    }
</style>
