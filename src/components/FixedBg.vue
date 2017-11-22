<template>
    <div class="fixed-bg" :style="{ backgroundImage: 'url('+imgPath+')',backgroundSize:imgSize, backgroundPosition: imgPosition}">
        <div class="mask" :style="{ backgroundColor: maskColor, opacity: maskOpacity}"></div>
    </div>
</template>

<script>
    export default {
        name: 'fixed-bg',
        data(){
            return {
                imgSize: 'cover',
                imgPosition: 'center center'
            }
        },
        props: {
            imgPath: {
                type: String,
                default: 'http://pic.ytqmx.com:82/2014/0701/18/01.jpg'
            },
            maskColor: {
                type: String,
                default: 'transparent'
            },
            maskOpacity: {
                type: String,
                default: '0.5'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../assets/styles/base";

    .fixed-bg{
        position: fixed;
        @include fill-father;
        z-index: -2;
        background-color: #000;

        .mask{
            position: fixed;
            @include fill-father;
            z-index: -1;
        }
    }

</style>
