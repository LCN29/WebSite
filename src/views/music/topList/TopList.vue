<template>
    <div class="top-list">
        <p class="toplist_title">网易音乐排行榜</p>

        <div class="toplist_content">
            <div class="toplist_l" v-for="(item,index) in musicRank">
                <div class="toplist_detail" :title="item.title+',每日更新'" @click.stop="openTopList(item.id)" >
                    <img :src="item.pic" :alt="item.alt">
                </div>
            </div>
        </div>

        <p class="toplist_title">热门歌单</p>
        <div class="toplist_content" v-if="getHotSongSheet">
            <div class="toplist_l" v-for="(item,index) in getHotSongSheet">
                <div class="toplist_detail" :title="item.name" @click.stop="openTopList(item.id)" >
                    <img :src="(item.coverImgUrl).replace('.jpg','?param=250y250')" :alt="item.alt">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters,mapActions } from 'vuex';

    export default {
        name: 'top-list',
        data(){
            return{
                musicRank : [
                    { id: 3779629, title: '云音乐新歌榜，每天更新', alt: "云音乐新歌榜", pic: 'https://p3.music.126.net//N2HO5xfYEqyQ8q6oxCw8IQ==//18713687906568048.jpg?param=250y250'},
                    { id: 19723756, title: '云音乐飙升榜，每天更新', alt: "云音乐飙升榜", pic: 'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=250y250'},
                    { id: 3778678, title: '云音乐热歌榜，每周四更新', alt: "云音乐热歌榜", pic: 'https://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=250y250'},
                    { id: 10520166, title: '云音乐电音榜，每周五更新', alt: "云音乐电音榜", pic: 'http://p1.music.126.net/4mh2HWH-bd5sRufQb-61bg==/3302932937414659.jpg?param=250y250'},
                    { id: 180106, title: 'UK排行榜"', alt: "UK排行榜周榜", pic: 'https://p3.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=250y250'},
                    { id: 71385702, title: '云音乐ACG音乐榜，每周四更新', alt: "云音乐ACG音乐榜", pic: 'http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=250y250'},
                    { id: 60198, title: '云音乐ACG音乐榜，每周三更新', alt: "美国Billboard周榜", pic: 'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=250y250'},
                    { id: 60131, title: '日本Oricon周榜，每周三更新', alt: "日本Oricon周榜", pic: 'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=250y250'},
                ],
            }
        },
        computed: {
            ...mapGetters([
                'getHotSongSheet',
            ]),
        },
        methods: {
            ...mapActions([
                'setHotSongSheet',
            ]),
            openTopList(id){
                this.$router.push({name: 'topsheet', params: {id: id}});
            }
        },
        mounted () {
            this.setHotSongSheet();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    @import "../../../assets/styles/base";
    .top-list{
        padding-left: 15px;
        .toplist_title{
            font-size: 18px;
            color: $text_color;
        }
        .toplist_content{
            display: flex;
            flex-wrap: wrap;
            padding-left: 15px;
            margin-bottom: 40px;
            .toplist_l{
                width: calc(20% - 30px);
                padding: 15px;
                .toplist_detail{
                    cursor: pointer;
                    width: 100%;
                    position: relative;
                    &:before{
                        content: attr(title);
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        background: rgba(0,0,0,0.3);
                        color: #fff;
                        font-size: 14px;
                        padding: 0 5px;
                        box-sizing: border-box;
                    }
                    &:after{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        //../../../assets/imgs/coverall.png
                        background: url('../../../assets/imgs/coverall.png') 0 0 ;
                        background-size:  272%;
                    }
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
</style>
