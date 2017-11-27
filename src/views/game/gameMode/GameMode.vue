<template>
    <div class="game-mode">
        <div class="singer-mode">
            <h3>单人模式</h3>
            <router-link tag="p" to="/game/singlegame/10">简单模式</router-link>
            <router-link tag="p" to="/game/singlegame/15">困难模式</router-link>
            <router-link tag="p" to="/game/singlegame/20">地狱模式</router-link>
        </div>

        <div class="double-mode">
            <h3>双人模式</h3>
            <p @click.stop="createRoom">创建房间</p>
            <p @click.stop="joinRoom">加入房间</p>
            <prompt-dialog :title="title" hint="请输入房间号" @confirm="confirm" @cancel="cancel" :showPrompt="showPrompt"></prompt-dialog>
        </div>
    </div>
</template>

<script>

    import api from './gameModeOperationApi';
    import PromptDialog from '../../../components/PromptDialog.vue';

    export default {
        name: 'game-game',
        data(){
            return{
                title: "创建房间",
                showPrompt: false,
                createARoom: false,
            }
        },
        components: {
            PromptDialog,
        },
        methods: {
            confirm(roomName){
                this.showPrompt= false;
                if(roomName ===""){
                    alert("房间名不可为空");
                    return;
                }

                if(this.createARoom){
                    api.createRoom(roomName,this);
                }else{
                    api.joinRoom(roomName,this);
                }

            },
            cancel(){
                this.showPrompt= false;
            },
            createRoom(){
                this.title= "创建房间";
                this.showPrompt= true;
                this.createARoom= true;
            },
            joinRoom(){
                this.title= "加入房间";
                this.showPrompt= true;
                this.createARoom= false;
            },
            noRoom(){
                alert('该房间不存在');
            },
        },
        mounted(){
            api.init();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    @import "../../../assets/styles/base";

    .game-mode{
        height: 100%;
        display: flex;
        padding-bottom: 50px;
        justify-content: center;
        align-items: center;
        .singer-mode,.double-mode{
            display: flex;
            flex-direction: column;
            width: 282px;
            height: 500px;
            font-size: 10px;
            margin: 0px 100px;
            h3{
                color: $text_color_active;
                text-align: center;
                margin-top: 30px;
                font-size: 20px;
                margin-bottom: 20px;
            }
            p{
                font-size: 16px;
                color: $text_color_active;
                text-align: center;
                border-radius: 5px;
                border: 2px solid white;
                width: 150px;
                padding: 10px 0px;
                margin: 10px auto;
            }
        }
        .singer-mode{
            background: url("../../../assets/imgs/single_bg.jpg") no-repeat center center;
            background-size: 100% 100%;
        }
        .double-mode{
            background: url("../../../assets/imgs/double_bg.jpg") no-repeat center center;
            background-size: 100% 100%;
            position: relative;
        }
    }
</style>
