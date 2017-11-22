<template>
    <div class="music">
        <!--  music_bg 图片朦胧 mask_bg加上一层遮罩，mask_linear_bg最下层一层黑色，挡住Fixbg -->
        <div class="music_bg" :style="{background:'url('+getCurrentMusic.picurl+') no-repeat'}">
            <div class="mask_bg" ></div>
        </div>
        <div class="mask_linear_bg"></div>

        <div class="music_content">
            <div class="music_body">
                <div class="left_list">
                    <div class="music_nav">
                        <router-link tag="span" to="/music/playlist" class="todo_btn playing_btn">正在播放</router-link>
                        <router-link tag="span" to="/music/playlist1" class="todo_btn playing_btn">我的收藏</router-link>
                        <router-link tag="span" to="/music/playlist2" class="todo_btn playing_btn">排行榜/歌单</router-link>
                        <router-link tag="span" to="/music/playlist3" class="todo_btn playing_btn">搜索音乐</router-link>
                    </div>

                    <transition name="silde-top">
                        <router-view class="list_content" name="ListInfo"></router-view>
                    </transition>
                </div>

                <!--全屏显示-->
                <transition name="silde-top">
                    <router-view class="music_wrapper" name="fullscreen"></router-view>
                </transition>

                <div class="right_info">
                    <div class="bg-info">
                        <img class="music-bg" :src="getCurrentMusic.picurl"/>
                    </div>
                    <div class="lrc-content" ref="lrcContent">
                        <div class="lrc-wrapper" ref="lrcWrapper">
                            <p class="lrc-item" v-if="!getCurrentMusic.lyric" >纯音乐,请欣赏</p>
                            <p class="lrc-item" v-if="getCurrentMusic.lyric"  v-for="(item, key, index) in getCurrentMusic.lyric"
                               :class="{ active: getMusicPosition === index+1 }"
                            >
                                {{item}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="music_ctrl">

                <div class="left_ctrl">
                    <div class="music_detail_ctrl">
                        <div title="上一曲 ←" @click.stop="playPrev"></div>
                        <div class="playPause" :class="getMusicIsPlay ? 'pause': 'play'" title="播放/暂停 space" @click.stop="playPause"></div>
                        <div title="下一曲 →" @click.stop="playNext"></div>
                    </div>

                    <div class="music_progress">
                        <div class="music_current_detail">
                             <span class="music_c_name">
                                {{ getCurrentMusic.name}}
                                -
                                {{ getCurrentMusic.singer}}
                            </span>
                            <span class="music_c_time">
                                {{  getCurrentMusicTime }}
                                /
                                {{ getCurrentMusic.duration }}
                            </span>
                        </div>
                        <div class="music_progress_bar" @click="clickProgress" id="music_progress">
                            <div class="duration" id="music_progressD">
                                <div class="buffering" :style="{ width:`${bufferingP }%`}"></div>
                                <div class="real" :style="{width: getMusicPro}"></div>
                            </div>
                            <div class="range" :style="{left: `${getMusicPro}`}"
                                 @mousedown="dragMouseDown"
                            >
                            </div>
                        </div>
                    </div>

                </div>

                <div class="right_ctrl" >
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex';

    export default {
        name: 'music',
        data(){
            return {
                bufferingP: 0, //已经缓冲的进度
                isDrag: false, //当前是否处于进度条拖动状态
            }
        },
        computed: {
            ...mapGetters([
                'getCurrentMusic',
                'getMusicPosition',
                'getCurrentMusicTime',
                'getMusicIsPlay',
            ]),
        },
        methods: {
            ...mapActions([
                'setMusicRouter',
                'setLrcElem',
            ]),
            getMusicFormat(time){
                return time+":00";
            },
            clickProgress(){
                //点击了进度条
            },
            playPrev(){
                //播放上一曲
            },
            playPause(){
                //播放/暂停
            },
            playNext(){
                //播放下一曲
            },
            getMusicPro(){
                //当前已播放占了总时间的多少
                return 35+"%";
            },
            dragMouseDown(){
                //拖动进度条事件
            },
            initAudioEvent(){

            },
            keypressEvent(){

            }
        },
        watch: {
            '$route' (to, from) {
                this.setMusicRouter(to.path);
            }
        },
        mounted(){
            this.setLrcElem(this.$refs.lrcContent);
            this.$nextTick(() => {
                this.initAudioEvent();
                this.keypressEvent();
            });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../../assets/styles/base";
    .music{
        .music_bg{
            position: fixed;
            @include fill-father;
            background-position: center center;
            background-size: cover;
            z-index: -2;
            backdrop-filter: blur(10px);
            filter: blur(16px);
            .mask_bg{
                position: fixed;
                @include fill-father;
                z-index: -1;
                background: rgba(0,0,0,0.5);
            }
        }

        .mask_linear_bg{
            position: absolute;
            @include fill-father;
            background: #000;
            z-index: -3;
        }

        .music_content{
            position: fixed;
            @include fill-father($top: 40px ,$bottom: 30px);
            padding: 15px;
            .music_body{
                width: 100%;
                height: calc(100% - 80px);
                display: flex;

                .left_list{
                    flex: 1;
                    overflow: hidden;
                    padding-left: 20px;
                    .music_nav{
                        height: 60px;
                        display: flex;
                        align-items: center;
                        .todo_btn{
                            height: 32px;
                            line-height: 32px;
                            color: $text_Light_color;
                            border: 1px solid $border_bottom_color_deep;
                            border-radius: 2px;
                            padding: 0 15px;
                            margin: 10px;
                            font-size: 14px;
                            cursor: pointer;
                            &:hover,&.router-link-active{
                                color: $text_color_hover;
                                border-color: $border_bottom_color;
                            }
                        }
                    }
                    .list_content{
                        height: calc(100% - 60px);
                        width: 100%;
                        overflow: auto;
                    }
                }
                .right_info{
                    width: 310px;
                    position: relative;

                    .bg-info{
                        display: block;
                        width: 186px;
                        height: 186px;
                        margin: 0 auto;
                        position: relative;
                        &:after{
                            content: '';
                            background: url("../../assets/imgs/cd_block.png") no-repeat;
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: -20px;
                            bottom: 0;
                        }
                        .music-bg{
                            width: 176px;
                            height: 176px;
                            border: none;
                            position: absolute;
                            top: 5px;
                            left: 5px;
                            border-radius: 4px;
                        }
                    }
                    .lrc-content{
                        position: absolute;
                        @include fill-father($top:200px,$bottom: 15px);
                        overflow: hidden;
                        padding: 20px 0;
                        .lrc-item{
                            width: 100%;
                            height: auto;
                            min-height: 26px;
                            line-height: 26px;
                            text-align: center;
                            font-size: 12px;
                            color: $text_Light_color;
                            &.active{
                                color:#A7EEBE
                            }
                        }
                    }
                }
            }
            .music_ctrl{
                width: 100%;
                height: 80px;
                display: flex;
                .left_ctrl{
                    flex: 1;
                    display: flex;
                    .music_detail_ctrl{
                        display: flex;
                        align-items: center;
                        div{
                            display: inline-block;
                            width: 38px;
                            height: 38px;
                            margin: 0 10px;
                            transition: 0.5s;
                            cursor: pointer;
                            opacity: 0.5;
                            background: url("../../assets/svgs/next.svg") center center;
                            background-size: contain;
                            &.playPause{
                                width: 46px;
                                height: 46px;
                            }
                            &.play{
                                background: url("../../assets/svgs/play.svg") center center;
                                background-size: contain;
                            }
                            &.pause{
                                background: url("../../assets/svgs/pause.svg") center center;
                                background-size: contain;
                            }
                            &:hover{
                                opacity: 1;
                            }
                            &:nth-child(1){
                                transform:rotate(180deg);
                            }
                        }
                    }
                    .music_progress{
                        display: flex;
                        padding: 0 20px;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        flex: 1;

                        .music_current_detail{
                            margin-bottom: 10px;
                            width: 100%;
                            display: block;
                            height: auto;
                            color: $text_Light_color;
                            margin-bottom: 10px;
                            font-size: 0;
                            overflow: hidden;
                            margin-bottom: 22px;
                            .music_c_name{
                                display: inline-block;
                                width: calc(100% - 115px);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                font-size: 16px;
                                vertical-align: top;
                            }
                            .music_c_time{
                                width: 110px;
                                display: inline-block;
                                font-size: 16px;
                                vertical-align: top;
                                text-align: right;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                        .music_progress_bar{
                            width: 100%;
                            height: 2px;
                            cursor: pointer;
                            position: relative;
                            &:before{
                                content: '';
                                position: absolute;
                                bottom: 2px;
                                width: 100%;
                                height: 10px;
                                background: transparent;
                            }
                            .duration{
                                width: 100%;
                                height: 2px;
                                background:$progress_color;
                                border-radius: 1px;
                                position: relative;
                                .buffering{
                                    width: 20%;
                                    height: 2px;
                                    background: $buffering_color;
                                    border-radius: 1px;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    transition: width 0.3s;
                                }
                                .real{
                                    width: 0%;
                                    position: absolute;
                                    height: 2px;
                                    left: 0;
                                    background: $real_color;
                                    border-radius: 1px;
                                }
                            }
                            .range{
                                width: 6px;
                                height: 6px;
                                margin-top: -4px;
                                margin-left: 0;
                                border-radius: 50%;
                                background-color: #f00;
                                position: absolute;
                                left: 0;
                                z-index: 2;
                                cursor: pointer;
                                &:before{
                                    content: " ";
                                    display: block;
                                    position: absolute;
                                    width: 24px;
                                    height: 24px;
                                    background: radial-gradient(rgba(0, 0, 0, 0) 20%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 60%);
                                    border-radius: 50%;
                                    top: 50%;
                                    margin-top: -12px;
                                    margin-left: -9px;
                                    cursor: pointer;
                                    outline: 0;
                                    -webkit-tap-highlight-color: transparent;
                                }
                            }
                        }
                    }
                }
                .right_ctrl{
                    width: 310px;
                }
            }
        }
    }
</style>
