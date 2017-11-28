<template>
    <div class="my-achievement">
        <div class="swiper-inner">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in data" key="item.id">
                    <project-card :project="item"></project-card>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    import data from './data';

    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import ProjectCard from '../../../components/ProjectCard.vue';

    export default {
        name: 'my-achievement',
        data(){
            return{
                data: data.project,
                swiperOption: {
                    effect: 'cube',
                    nested: true,
                    grabCursor: true,
                    cube: {
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            ProjectCard
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .my-achievement{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .swiper-inner {
            position: relative;
            overflow: hidden;
            height: 560px;
            width: 70%;
            padding: 30px 0;
            .swiper-container {
                height: 500px;
                width: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -50%;
                margin-top: -250px;
            }
            .swiper-slide {
                background-position: center;
                background-size: cover;
            }
        }
    }
</style>
