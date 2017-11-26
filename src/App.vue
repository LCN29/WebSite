<template>
  <div id="app">
      <loader loaderbackground="rgba(0,0,0,0.3)" :isshow="getShowLoading"></loader>
      <fixed-bg></fixed-bg>
      <my-content></my-content>
      <audio  :src="getCurrentMusic.url" ref="myAudio"></audio>
  </div>
</template>

<script>
    import FixedBg from './components/FixedBg.vue';
    import Loader from './components/Loader.vue';
    import MyContent from './components/MyContent.vue';

    import { mapGetters,mapActions } from 'vuex';

    export default {
        name: 'app',
        components: {
            FixedBg,
            Loader,
            MyContent,
        },
        computed: {
            ...mapGetters([
                'getShowLoading',
                'getCurrentMusic',
                'getAudioEle',
            ]),
        },
        methods: {
            ...mapActions([
                'setAudioEle',
                'setPlace',
            ]),
        },
        mounted(){
            this.setAudioEle(this.$refs.myAudio);
        //    this.$refs.myAudio.play();
        }
    }
</script>

<style lang="scss" type="text/scss">
    @import "./assets/styles/base";

    #app{
        audio{
            display: none;
        }
    }
</style>
