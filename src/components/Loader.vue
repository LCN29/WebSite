<template>
    <div class="loader" v-show="isshow" :style="{backgroundColor:loaderbackground}">
        <div class="loader-content">
            <div class="loader-range" :style="{borderYopColor:topbottomcolor,borderBottomColor:topbottomcolor,borderRightColor:leftrightcolor,borderLeftColor:leftrightcolor,opacity:borderopacity,animationDuration:borderduration}">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loader',
        props: {
            loaderwidth: {
                type: String,
                default: '40px',
            },
            loaderbackground: {
                type: String,
                default: '#2A323B',
            },
            topbottomcolor: {
                type: String,
                default: '#545a6a'
            },
            leftrightcolor: {
                type: String,
                default: '#d4d4db'
            },
            borderopacity: {
                type: String,
                default: '0.5'
            },
            borderduration: {
                type: String,
                default: '0.8s'
            },
            isshow: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    @import "../assets/styles/base";

    .loader{
        position: fixed;
        @include fill-father;
        z-index: 999;
        .loader-content{
            width: 40px;
            height: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%,-50%,0);

            .loader-range{
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                animation: rotate 0.8s linear infinite;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                border-top: 1px solid #545a6a;
                border-bottom: 1px solid #d4d4db;
                border-left: 1px solid #545a6a;
                border-right: 1px solid #d4d4db;
                opacity: 0.5;
                animation-name: load_cycle;
                @-webkit-keyframes load_cycle {
                    0% {
                        transform:rotateZ(-360deg);
                    }
                    100% {
                        transform:rotateZ(0deg);
                    }
                }
                @keyframes load_cycle {
                    0% {
                        transform:rotateZ(-360deg);
                    }
                    100% {
                        transform:rotateZ(360deg);
                    }
                }
            }
        }
    }
</style>
