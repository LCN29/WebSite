<template>
    <div class="learned-content">
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in data" key="item.key">
                <skill-card :content="item"></skill-card>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import SkillCard from '../../../components/SkillCard.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';

    export default {
        name: 'learned-content',
        data(){
            return {
                data: [
                    { key: 1, type: 'JS', explain: 'React-Native+Redux', proficiency: '可以做事',other: '用于开发跨平台移动端应用，个人感觉最熟练的技能之一', leave: 'one'},
                    { key: 2, type: 'JS', explain: 'MUI', proficiency: '可以做事', other: '还可以，能做项目，借助文档，可以开发出简单的H5 app',leave: 'one'},
                    { key: 3, type: 'Web', explain: 'H5+CSS+JS', proficiency: '可以做事',other: '最早学的语言，打算用来应聘的存在，一入前端深似海，，，', leave: 'one'},
                    { key: 4, type: 'JS', explain: 'Vue+Vue全家桶', proficiency: '可以做事',other: '前端三大框架之一，这个网站所用的主体框架',leave: 'one'},
                    { key: 5, type: 'Java', explain: 'Android', proficiency: '应该可以做事', other:'学的时间最长的语言，感觉基础最好的存在',leave: 'two'},
                    { key: 6, type: 'JS', explain: 'React', proficiency: '给点时间时间，应该就能干活了', other: '前端三大框架之一,为了学习React-Native学习了一下，目前处于了解，不会做项目的框架',leave: 'three'},
                    { key: 7, type: 'CSS', explain: 'Sass', proficiency: '给点时间时间，应该就能干活了', other: 'css的预编语言，算是关于css的编程语言，为了学习Vue,顺便在项目中，应用了一下',leave: 'three'},
                    { key: 8, type: 'PHP', explain: 'ThinkPhp5.0', proficiency: '还需要学习',other: '为了前端接口，学习的的php框架，现在处于了解，懂一部分的状态', leave: 'four'},
                    { key: 9, type: 'JS打包管理工具', explain: 'WebPack', proficiency: '还需要学习', other: '前端很流行的资源打包工具，利用得好，可以让自己的项目运行得更快，正在学习中',leave: 'four'},
                    { key: 10, type: 'JS', explain: 'Swiper框架', proficiency: '还需要学习', other: '为了做这个网站，现学现用的js切换框架',leave: 'four'},
                    { key: 11, type: 'JS', explain: 'jquery', proficiency: '还需要学习',other: '以前学过，现在基本忘光的js包，但是又是前端中神器般的存在，学，学，一定学', leave: 'four'},
                ],
                swiperOption: {
                    nested: true,
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop: true,
                    coverflow: {
                        rotate: 30,
                        stretch: 10,
                        depth: 60,
                        modifier: 2,
                        slideShadows : true
                    }
                }
            }
        },
        components: {
            SkillCard,
            swiper,
            swiperSlide
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
    .learned-content{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        .swiper-container {
            width: 100%;
            padding-bottom: 50px;
        }
        .swiper-slide {
            width: 300px;
            height: 400px;
        }
    }

</style>
