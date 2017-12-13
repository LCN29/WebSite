<template>
    <div class="home">
        <section class="left">
            <div class="mask-bg"></div>
            <img class="headerIcon" :src="message.icon"/>
            <span class="name">LCN</span>
            <span>平淡透露着随意</span>
            <p v-for="(item,index) in message.attr" :key="index" :class="{active: swiperIndex==index}"
            @click.stop="chagneSwiper(index)">{{item}}</p>
        </section>

        <section class="right">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide>
                   <introduce-myself></introduce-myself>
                </swiper-slide>
                <swiper-slide>
                    <learned-content></learned-content>
                </swiper-slide>
                <swiper-slide>
                    <my-achievement></my-achievement>
                </swiper-slide>
            </swiper>
        </section>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import IntroduceMyself from './introduceMyself/IntroduceMyself.vue';
    import LearnedContent from './learnedContent/LearnedContent.vue';
    import MyAchievement from './myAchievement/MyAchievement.vue';

    export default {
        name: 'home',
        data(){
            return{
                swiperOption: {
                    effect: 'fade',
                    grabCursor: true,
                    virtualTranslate : true,
                    fade: {
                        crossFade: true,
                    },
                    onTransitionEnd: (swiper)=>{
                        /*   let len= this.message.attr.length;
                           let num= swiper.activeIndex%len;
                           if(swiper.swipeDirection==='next'){
                               if(num===0){
                                   this.swiperIndex= len-1;
                               }else{
                                   this.swiperIndex= num-1;
                               }
                           }*/
                    }
                },
                message: {
                    icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511843200784&di=0ffe36b486ac54c4fe5d795a93d14f2e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201610%2F06%2F20161006111920_8rfCi.thumb.700_0.jpeg',
                    attr: ['属性面板','技能卡','小成就']
                },
                swiperIndex: 0,
            }
        },
        components: {
            swiper,
            swiperSlide,
            IntroduceMyself,
            LearnedContent,
            MyAchievement,
        },
        methods: {
            chagneSwiper(index){
                console.log(index+"///"+this.swiperIndex);
                if(this.swiperIndex === index){
                    return;
                }
                this.swiper.slideTo(index, 1000, false);
                this.swiperIndex= index;
            },
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
        },
        mounted(){
            this.$nextTick(() => {
                this.initAudioEvent();
                this.keypressEvent();
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .home{
        display: flex;
        .left{
            flex: 1;
            margin-top: 40px;
            margin-right: 20px;
            margin-left: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: auto;
            border-radius: 10px;
            .mask-bg{
                position: absolute;
                width: 100%;
                height: 100%;
                background: url("../../assets/imgs/JoanOfArc.jpg");
                background-size: 100% 100%;
                border-radius: 4px;
                backdrop-filter: blur(10px);
                filter: blur(20px);
                z-index: -1;
            }
            .headerIcon{
                width: 100px;
                height: 100px;
                margin-top: 30px;
                border-radius: 50px;
                animation:iconmove 30s linear  0.2s infinite;
                border: 1px solid white;
            }
            .name{
                font-size: 30px;
                font-weight: 200;
                color: #5C3317;
                text-shadow: 1px 1px #545454;
                opacity: 1;
                margin-bottom: 0px;
            }
            span{
                color: #545454;
                font-size: 16px;
                opacity: .7;
                margin-bottom: 80px;
            }
            p{
                color: #545454;
                padding: 8px 0px;
                margin: 0 20px 0 40px;
                width: calc(100% - 60px);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                border-bottom: 1px solid rgba(255,255,255,.5);
                text-indent: 1em;
                cursor: pointer;
            }
            p:hover,.active{
                color: #FFFFCC;
                opacity: 0.8;
            }

            @keyframes iconmove{
                0% 	    { transform: scale(1) rotate(0deg); opacity: 1;}
                50% 	{ transform: scale(0.9) rotate(180deg); opacity: 0.8;}
                100% 	{ transform: scale(1) rotate(360deg); opacity: 1;}
            }
        }
        .right{
            flex: 3;
            margin-top: 40px;
            padding: 20px;
            position: relative;
            overflow: hidden;
            .swiper-container {
                position: absolute;
                width: calc(100% - 40px);
                height: calc(100% - 40px);
            }
        }
    }
</style>
