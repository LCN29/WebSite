<template>
    <div class="weather">
        <transition name="fade-up">
            <div class="weather-content" v-if="isShow">
                <!--半透明背景-->
                <div class="bg-info"></div>
                <span class="weather-tips" v-show="!weatherData.length">暂时没有天气信息哦，请刷新页面重试！</span>

                <div class="weather-detail" v-if="weatherData">
                    <div class="weather-today" v-if="weatherData[0]">
                        <div class="top-today">
                            <span class="left-info">今天</span>
                            <span class="right-info" :title="weatherData[0].date">{{weatherData[0].date}}</span>
                        </div>
                        <span class="type-today" :title="weatherData[0].type">{{weatherData[0].type}}</span>
                        <span class="wendu-today" :title="getRightWendu(weatherData[0].low, weatherData[0].high)">
                            {{getRightWendu(weatherData[0].low, weatherData[0].high)}}
                        </span>
                        <span class="wind-today" :title="weatherData[0].fx + ' ' + weatherData[0].fl">
                            {{weatherData[0].fx}} {{weatherData[0].fl}}
                        </span>
                        <span class="notice-today" :title="weatherData[0].notice">{{weatherData[0].notice}}</span>
                    </div>
                    <div class="weather-other" v-if="weatherData" v-for="(item,index) in weatherData" v-show="index > 0 && index < 4">
                        <span class="weather-time">{{index === 1 ? '明天:' : (index === 2 ? '后天:' : '大后天:')}}</span>
                        <span class="weather-type" :title="item.type">{{item.type}}</span>
                        <span class="weather-wendu" :title="getRightWendu(item.low, item.high)">{{getRightWendu(item.low, item.high)}}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'weather',
        props: {
            weatherData:{
                type: Array,
                default: [],
            },
            isShow: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            getRightWendu(l, h){
                return l.split(' ')[l.split(' ').length - 1] + ' ~ ' + h.split(' ')[l.split(' ').length - 1];
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../assets/styles/base";

    .weather{
        width: auto;
        height: auto;
        position: absolute;
        top: 36px;
        right: -30px;
        .weather-content{
            height: auto;
            width: 280px;
            overflow: hidden;
            padding: 15px;
            &.fade-up-enter-to,&.fade-up-leave-to{
                transition: all 0.5s 0.2s
            }
            &.fade-up-enter,&.fade-up-leave-to{
                opacity: 0;
                transform: translate3d(0,50px,0);
            }
            .bg-info{
                position: absolute;
                @include fill-father;
                background-color: black;
                opacity: 0.3;
                z-index: -1;
                border-radius: 10px;
            }
            .weather-tips{
                font-size: 12px;
                color: white;
                display: inline-block;
                text-align: center;
                width: 100%;
            }
            .weather-detail{
                width: 100%;
                .weather-today{
                    width: 100%;
                    height: auto;
                    padding-bottom: 5px;
                    border-bottom: 1px solid $border_bottom_color_opacity;
                    .top-today{
                        width: 100%;
                        height: 50px;
                        .left-info{
                            display: inline-block;
                            width: 100px;
                            font-size: 28px;
                        }
                        .right-info{
                            display: inline-block;
                            width: auto;
                            font-size: 14px;
                        }
                    }
                    span{
                        display: block;
                        margin: 0;
                        padding: 4px 0;
                        font-size: 12px;
                        height: auto;
                        line-height: 1.5;
                    }
                }
                .weather-other{
                    width: 100%;
                    overflow: hidden;
                    height: 40px;
                    border-bottom:1px dashed $border_bottom_color_opacity;
                    padding: 4px 0;
                    .weather-wendu,.weather-type,.weather-time{
                        display: inline-block;
                        height: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 12px;
                    }
                    .weather-wendu{
                        width: 30%;
                    }
                    .weather-time{
                        width: 20%;
                    }
                    .weather-type{
                        width: 30%;
                    }
                }
            }

        }
    }

</style>
