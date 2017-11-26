<template>
    <div class="my-content">

        <div class=" header clear">
            <ul class="left-menu clear">
                <router-link tag="li" to="/home">首页</router-link>
                <router-link tag="li" to="/music">音乐</router-link>
                <router-link tag="li" to="/game">游戏</router-link>
            </ul>
            <ul class="right-menu clear"  @mouseover="showWeatherInfo" @mouseleave="hideWeatherInfo">

                <li @mouseover="showWeatherInfo" @mouseleave="hideWeatherInfo">
                    <span>
                        {{city}}
                        <weather  v-if="weather.length>0" :isShow="showWeatherList" :weatherData="weather"></weather>
                    </span>
                </li>

                <router-link tag="li" to="/settings" class="settings" title="设置"></router-link>
            </ul>
        </div>
        <transition name="fade">
            <keep-alive>
                <router-view class="view-list"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>

    import Weather from './Weather.vue';

    import api from '../api/GlobalApi';

    let t;
    export default {
        name: 'my-content',
        data(){
            return{
                city: '',
                weather: [],
                showWeatherList: false,
            }
        },
        components: {
            Weather
        },
        methods: {
            getPlace(){
                api.getPlace()
                    .then(
                        res=> {
                            this.city= res.data.data.city;
                            this.getWeather();
                        },
                        err=> {
                            console.log(err);
                        }
                    );
            },
            getWeather(){
                api.getWeather(this.city)
                    .then(
                        res=> {
                            if(res.data.data.forecast !==undefined){
                                this.weather= res.data.data.forecast;
                            }
                        },
                        err=> {
                            console.log(err);
                        }
                    );
            },
            showWeatherInfo(){
                clearTimeout(t);
                this.showWeatherList = true;
            },
            hideWeatherInfo(){
                const _that = this;
                t = setTimeout(function () {
                    _that.showWeatherList = false;
                },800);
            },
        },
        mounted(){
            this.getPlace();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../assets/styles/base";
    @mixin my-li-style {
        float: left;
        margin: 0 14px;
        cursor:pointer;
        color: $text_color;
        font-size: 14px;
        font-family: $font-family;
        line-height: 40px;
        height: 39px;
        &.router-link-active{
            color:$text_color_active;
            border-bottom:1px solid red;
        }
    }

    .my-content {
        width: 100%;
        height: 100vh;
        .header {
            position: fixed;
            height: 40px;
            width: 100%;
            z-index: 998;
            .left-menu {
                float: left;
                padding-left: 20px;
                li {
                    @include my-li-style;
                }
            }
            .right-menu{
                float:right;
                padding-right: 20px;
                li{
                    @include my-li-style;
                    position: relative;
                }
                .settings{
                    background: url("../assets/svgs/settings.svg") no-repeat center center;
                    width: 20px;
                    background-size: contain;
                    &.router-link-active{
                        opacity: 0.7;
                    }
                }
            }
        }
        .view-list{
            height: 100vh;
            transform:translate3d(0,0,0);
            &.fade-enter-to,.fade-leave-to{
                transition: all 0.8s;
            }
            &.fade-enter,.fade-leave-to{
                opacity:0;
                transform:translate3d(0,50px,0);
            }
        }
    }

</style>
