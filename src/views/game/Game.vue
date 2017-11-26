<template>
    <div class="game">
        <h1>{{getTitleHint}}</h1>
        <transition name="bounce">
            <router-view class="game_content" name="GameView"></router-view>
        </transition>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: 'game',
        computed: {
            ...mapGetters([
                'getTitleHint',
            ]),
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../../assets/styles/base";

    .game{
        position: fixed;
        @include fill-father($top: 40px);
        padding: 10px 15px;
        h1{
            width: 100%;
            text-align: center;
            height: 40px ;
            font-size: 30px;
            line-height: 40px;
        }
        .game_content{
            &.bounce-enter-active {
                animation: bounce-in .5s;
            }
            &.bounce-leave-active {
                animation: bounce-in .5s reverse;
            }
        }
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }



</style>
