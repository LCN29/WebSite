<template>
    <div class="game">
        <transition name="fade">
            <router-view class="game_content" name="GameView"></router-view>
        </transition>
    </div>
</template>

<script>

    export default {
        name: 'game',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../../assets/styles/base";

    .game{
        position: fixed;
        @include fill-father($top: 40px);
        padding: 10px 15px;
        .game_content{
            height: 90%;
            &.fade-enter-active, &.fade-leave-active {
                transition: opacity .5s
            }
            &.fade-enter, &.fade-leave-to{
                opacity: 0
            }
        }
    }
</style>
