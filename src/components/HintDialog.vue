<template>
    <div class="hint-dialog" v-show="showHint">
        <div class="mask-bg" @click.stop="ok" ></div>
        <div class="dialog" :style="dialogStyle" @keyup.13.stop="ok" tabindex="0" contenteditable="true">
            <h3>{{title}}</h3>
            <div @click.stop="ok">
                <span >确定</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hint-dialog',
        props: {
            title: {
                type: String,
                default: '标题',
            },
            showHint: {
                type: Boolean,
                default: true,
            },
            dialogStyle: {
                type: String,
                default: "width: 10%;"
            }
        },
        methods: {
            ok(){
                this.$emit('confirm');
            },
        },
        mounted(){
            document.querySelector('.dialog').focus();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    .hint-dialog{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        .mask-bg{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 10;
            background: rgba(0,0,0, 0.7 );
        }
        .dialog{
            position: absolute;
            width: 80%;
            left: 10%;
            padding: 10px 10px 0px;
            border-radius: 5px;
            top: 30%;
            box-sizing: border-box;
            background: white;
            z-index: 11;
            h3{
                font-size: 18px;
                margin-bottom: 4px;
                text-align: center;
            }
            div{
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 10px;
                margin-bottom: 5px;
                span{
                    flex: 1;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    font-size: 18px;
                    cursor: pointer;
                    border-radius: 2px;
                    &:nth-child(1){
                        background: red;
                    }
                    &:nth-last-child(1){
                        background: yellowgreen;
                    }
                }
            }

        }


    }
</style>
