<template>
    <div class="collection-list">
        <div class="music_list_title">
            <span class="music_index"></span>
            <span class="music_name">歌曲</span>
            <span class="music_singer">歌手</span>
            <span class="music_album">专辑</span>
            <span class="music_duration">时长</span>
        </div>
        <div class="music_list_content">
            <div class="music_list" v-if="getMusicCollectList"
                 v-for="(item, index) in getMusicCollectList"
                 :key="item.id" :data-musicid="item.id" :data-pic="item.picUrl"
                 @click="clickPlayItem(item,index)"
            >
                <span class="music_index">
                    <span v-show="getCurrentMusic.id !== item.id" >{{index+1}}</span>
                    <img  v-show="getCurrentMusic.id === item.id" src="http://www.daiwei.org/vue/bg/wave.gif" alt="未曾遗忘的青春">
                </span>

                <span class="music_name">
                    <span>{{item.name}}</span>
                    <div class="hover_menu">
                        <img src="../../../assets/svgs/delete.svg" @click.stop="deleteMusic(item.id)"/>
                    </div>
                </span>

                <span class="music_singer">
					<span @click.stop="searchMusic">{{item.singer}}</span>
				</span>

                <span class="music_album">
					<span @click.stop="getAlbum(item.albumId)">{{item.album}}</span>
				</span>

                <span class="music_duration">{{item.duration}}</span>

            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters,mapActions } from 'vuex';
    import api from '../musicOperationApi';

    export default {
        name: 'collection-list',
        data(){
            return{
                kind: 'collection',
            }
        },
        methods: {
            ...mapActions([
                'deleteCollectedMusic',
                'setPlayingKind',
            ]),
            getMusicFormat(time){
                return api.getMusicFormat(time);
            },
            clickPlayItem(item,index){
                //点击播放某一项
                let data={
                    id: item.id,
                    name: item.name,
                    picurl: item.picurl,
                    singer: item.name,
                    musicindex: index,
                    duration: item.duration,
                };
                api.clickIndex(data,this);
            },
            deleteMusic(id){
                this.deleteCollectedMusic(id);
            },
            searchMusic(ev){
                //查询音乐
                this.$router.push({name: 'searchsheet', params: { w: ev.target.innerHTML }});
            },
            getAlbum(id){
                //获取专辑
                console.log(id+"获取专辑");
            },
        },
        computed: {
            ...mapGetters([
                'getMusicCollectList',
                'getCurrentMusic',
            ]),
        },
        mounted(){
            this.$nextTick(() => {
                this.setPlayingKind(this.kind);
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

    @import "../../../assets/styles/base";

    .collection-list{
        padding-left: 20px;
        padding-top: 10px;
        flex-direction: column;
        .music_list_title,.music_list {
            height: 50px;
            display: flex;
            border-bottom: 1px solid $border_bottom_color_opacity;
            span{
                font-size: 14px;
                color: $text_Light_color;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 50px;
                height: 50px;
                cursor: pointer;
                &.music_index{
                    width: 50px;
                    height: 50px;
                    justify-content: center;
                    margin-right: 10px;
                    text-align: center;
                    img{
                        height: 10px;
                        width: 10px;
                        margin-top: 20px;
                    }
                }
                &.music_name{
                    width: calc(50% - 50px);
                    position: relative;
                    text-overflow: ellipsis;
                }
                &.music_singer,&.music_album{
                    width:20%;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                &.music_duration{
                    width: 10%;
                    text-indent: 10px;
                }
            }
        }

        .music_list_content{
            overflow: auto;
            height:calc(100% - 50px);
            .music_list:hover{
                .hover_menu{
                    display: inline-block;
                }
            }
            .hover_menu{
                height: 25px;
                width: 25px;
                margin-top: 12.5px;
                position: absolute;
                right: 50px;
                top: 0px;
                display: none;
            }
        }

        /* 滚动条部分 */
        ::-webkit-scrollbar {
            width:10px;
        }

        /* 轨道 */
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            -webkit-border-radius: 5px;
            border-radius: 5px;
        }

        /* 手柄 */
        ::-webkit-scrollbar-thumb {
            -webkit-border-radius: 5px;
            border-radius: 5px;
            background:rgba(200,200,200,0.9);
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        }
        /* 手柄激活态 */
        ::-webkit-scrollbar-thumb:window-inactive {
            background: rgba(200,200,200,0.4);
        }
    }

</style>
