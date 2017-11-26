<template>
    <div class="game-mode">
        <div class="singer-mode">
            <span>单人模式</span>
            <div>简单模式<br/>最多有10*10个块</div>
            <div>困难模式<br/>最多有15*15个块</div>
            <div>地狱模式<br/>最多有20*20个块</div>
        </div>

        <div class="double-mode">
            <span>双人模式</span>
            <div @click.stop="createRoom">创建房间</div>
            <div @click.stop="joinRoom">加入房间</div>
        </div>
    </div>
</template>

<script>

    import api from '../gameOperationApi';

    export default {
        name: 'game-game',
        methods: {
            createRoom(){
                let s =prompt("创建房间","room");
                api.createRoom(s,this);
            },
            joinRoom(){
                let s =prompt("加入房间","room");
                api.joinRoom(s,this);
            },
            noRoom(){
                alert('该房间不存在');
            }
        },
        mounted(){
            api.init();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    .game-mode{
        background: yellowgreen;
        height: 100%;
        display: flex;
        padding-bottom: 50px;
        .singer-mode,.double-mode{
            flex: 1;
            flex-direction: column;
            margin:10px;
            background: green;
            align-items: center;
            justify-content: center;
            display: flex;
            font-size: 40px;
            div{
                text-align: center;
            }
        }
    }
</style>
