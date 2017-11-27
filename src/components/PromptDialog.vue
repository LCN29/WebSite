<template>
    <div class="prompt-dialog" v-show="showPrompt">
        <div class="mask-bg"></div>
        <div class="dialog">
            <h3>{{title}}</h3>
            <input :placeholder="hint" v-model="val"/>
            <div>
                <span @click.stop="ok">确定</span>
                <span @click.stop="no">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'prompt-dialog',
        data(){
            return{
                val: '',
            }
        },
        props: {
            title: {
                type: String,
                default: '标题',
            },
            hint: {
                type: String,
                default: '提示'
            },
            showPrompt: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            ok(){
                this.$emit('confirm',this.val);
            },
            no(){
                this.$emit('cancel');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    .prompt-dialog{
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
                font-size: 14px;
                margin-bottom: 4px;
            }
            input{
                width: 100%;
                outline: none;
                padding: 5px;
                box-sizing: border-box;
            }
            div{
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 4px;
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
