<template>
    <div class="project-card">
        <div class="text">
            <div class="title">
                <p>Demo{{project.id}}</p>
                <p class="name">{{project.name}}</p>
                <p><a :href="project.git" target="_blank">GitHub</a></p>
            </div>
            <p class="technology">技术栈:&nbsp;&nbsp;{{project.technology}}</p>
            <p class="describe">{{project.describe}}</p>
        </div>
        <div class="image">
            <img v-for=" (item,index) in project.imgs" :key="index" :src="item" @click.stop="clickImg(item)"/>
        </div>
        <div class="image-preview" v-show="isShow" @click.stop="hideImg">
            <img :src="selectedImg" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project-card',
        data(){
            return{
                selectedImg: 'https://s1.ax1x.com/2017/11/28/haDWF.png',
                isShow: false,
            }
        },
        props: {
            project: {
                Object,
                default: {
                    id: 1,
                    name: '项目名',
                    git: 'http://www.baidu.com',
                    technology: '所用技术',
                    describe: '描述',
                    imgs: [
                        'http://a3.topitme.com/7/ab/08/1128050634f0408ab7o.jpg',
                        'http://img2.imgtn.bdimg.com/it/u=3376651901,946504129&fm=27&gp=0.jpg',
                        'http://im6.leaderhero.com/wallpaper/user/201508/26/c8d5e65b-b.jpg',
                    ]
                }
            }
        },
        methods: {
            hideImg(){
                this.isShow= false;
                this.selectedImg= '';
            },
            clickImg(src){
                console.log(src);
                this.isShow= true;
                this.selectedImg= src;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .project-card{
        width: 100%;
        height: 100%;
        background:  -webkit-linear-gradient(#56CCF2, #007991);
        position: relative;
        .text{
            height: 40%;
            .title{
                display: flex;
                height: auto;
                background: orange;
                justify-content: space-around;
                p{
                    font-size: 16px;
                    margin-top: 12px;
                    padding-left: 4px;
                    width: 20%;
                    text-align: center;
                    a{
                        color: dodgerblue;
                    }
                }
                .name{
                    width: 50%;
                    margin: 6px 5% 0;
                    text-align: center;
                    font-size: 20px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    text-shadow: 1px 1px rgba(255,255,255,0.5);
                }
            }
            .technology{
                height: auto;
                text-indent: 2em;
                margin: 8px 0;
                white-space: normal;
            }
            .describe{
                height: auto;
                overflow: auto;
                text-indent: 2em;
                padding: 8px;
                text-shadow: 1px 1px rgba(255,255,255,0.3);
            }
        }
        .image{
            height: 60%;
            padding-bottom: 4px;
            box-sizing: border-box;
            img{
                width: 30%;
                height: 100%;
                margin-right: 2.5%;
                border-radius: 6px;
                &:nth-child(1){
                    margin-left: 2.5%;
                }
            }

        }
        .image-preview{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.6);
            img{
                height: 96%;
                display: block;
                margin: 2% auto;
            }
        }
    }
</style>
