<template>
    <div class="double-game">
        <h3>请选择文字对应的背景颜色</h3>
        <div class='eraser-zero'>
            <canvas id="eraser-block1" width="50px" height="50px"></canvas>
            <canvas id="eraser-block2" width="50px" height="50px"></canvas>
            <canvas id="eraser-block3" width="50px" height="50px"></canvas>
        </div>
        <div class="move-zero">
            <canvas id="moveBlock" width="500px" height="350px"></canvas>
        </div>

        <div class='num'>
            <p>得分  <span id='fenshu' >{{score}}</span></p>
        </div>
    </div>
</template>

<script>

    import { mapActions } from 'vuex';
    import api from './doubleGameOperationApi';


    export default {
        name: 'double-game',
        data(){
            return{
                name: this.$route.params.room,
                type: this.$route.params.type,
                score: '0/5',
            }
        },
        methods: {
            ...mapActions([
                'setTitleHint',
            ]),
        },
        mounted(){
            this.setTitleHint("双人游戏进行中...");
            api.initGame(this,this.name,this.type);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .double-game{
        background: yellowgreen;
        height: 100%;
        h3{
            background: rebeccapurple;
            text-align: center;
        }
        .eraser-zero{
            flex : 1;
            display: flex;
            justify-content: center;
            margin-top: 10px;

            canvas{
                border: 1px solid black;
                margin: 0px 30px;
            }
        }

        .move-zero{
            margin-top: 10px;
            display: flex;
            justify-content: center;

            canvas {
                border: 1px solid black;
                background: wheat;
            }
        }

        .num{
            p{
                text-align: center;
                height: 30px;
                line-height: 30px;
                margin-bottom: 10px;
            }
            span {
                color : red
            }
        }

    }
</style>
