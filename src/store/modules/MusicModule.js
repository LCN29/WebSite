
import * as types from '../mutation-types';
import MusicApi from '../../api/MusicApi';

const state= {

    //当前播放的歌曲
    currentMusic: {
        id: '',
        name: 'Each and All ',
        url: './static/default.mp3',
        duration: '05:17',
        singer: 'livetune/Fukase',
        picurl: './static/default.jpg',
        lyric: "",
        /* 在页面列表中的位置 */
        musicindex: -1,
    },

    //显示歌词的标签
    lrcElem: '',

    //当前歌曲的歌词位置
    musicPosition: 0,

    //当前音乐已经播放的时间 12323232
    currentMusicTime: 0,

    //音乐播放状态
    musicIsPlay: true,

    // 当前音乐的持续时间  123456
    currentMusicDuration: 0,

    //当前播放的音乐为哪个表的  music默认 collection收集的 top 排行榜的 search  搜索的
    playingKind: 'music',

    // 音乐推荐列表
    musicList: {},

    // 收集歌曲列表
    musicCollectList: localStorage.getItem('musicCollectList') ? JSON.parse(localStorage.getItem('musicCollectList')): [],

    //热门歌单
    hotSongSheet: {},

    //top 歌曲列表
    topList: {},

    //搜索出来的列表
    searchList: [],

};

const getters= {

    getLrcElem: state=> state.lrcElem,
    getCurrentMusic: state=> state.currentMusic,
    getMusicPosition: state=> state.musicPosition,
    getCurrentMusicTime: state=> state.currentMusicTime,
    getMusicIsPlay: state=> state.musicIsPlay,
    getMusicList: state=> state.musicList.content,
    getCurrentMusicDuration: state=> state.currentMusicDuration,
    getMusicCollectList: state=> state.musicCollectList,
    getHotSongSheet: state=> state.hotSongSheet,
    getTopList: state=> state.topList,
    getPlayingKind: state=> state.playingKind,
    getSearchList: state=> state.searchList,
};

const mutations= {

    [types.SETLRCELEM](state,elem){
        state.lrcElem= elem;
    },
    [types.SETCURRENTMUSIC](state,music){
        state.currentMusic= music;
    },

    [types.SETMUSICPOSITION](state,position){
        state.musicPosition= position;
    },

    [types.SETCURRENTMUSICTIME](state,time){
        state.currentMusicTime= time;
    },

    [types.SETMUSICISPLAY](state,status){
        state.musicIsPlay= status;
    },

    [types.SETMUSICLIST](state,content){
        state.musicList= { ...state.musicList, content };
    },

    [types.SETCURRENTMUSICDURATION](state,time){
        state.currentMusicDuration= time;
    },

    [types.ADDCOLLECTEDMUSIC](state,music){
        let list= state.musicCollectList;
        list.forEach((item)=>{
            if(music.id=== item.id){
                //歌曲已经收藏过了
                return;
            }
        });
        music.musicindex= list.length;
        state.musicCollectList.push(music);
        localStorage.setItem('musicCollectList', JSON.stringify(list));
    },

    [types.DELETECOLLECTEDMUSIC](state,id){
        let list= state.musicCollectList;
        list.forEach((item,i)=>{
            if(id=== item.id){
                //找到要删除的音乐 删除并把最后一个的音乐索引变为i
                state.musicCollectList.splice(i, 1);
                state.musicCollectList[state.musicCollectList.length-1].musicindex= i;
                localStorage.setItem('musicCollectList', JSON.stringify(list));
                return;
            }
        });

    },

    [types.SETHOTSONGSHEET](state,list){
        state.hotSongSheet= list;
    },

    [types.SETPLAYINGKIND](state,kind){
        state.playingKind= kind;
    },

    [types.SETTOPLIST](state,content){
        if(state.topList.length !==0){
            state.topList= {};
        }
        state.topList= content;
    },

    [types.RESETSEARCHLIST](state){
        state.searchList= [];
    },

    [types.SETSEARCHLIST](state,content){
        content.forEach((value,index)=>{
            state.searchList.push(value);
        });
    }

};

const actions= {

    setLrcElem({ commit }, elem){
        commit(types.SETLRCELEM, elem);
    },

    setCurrentMusic({commit},music){
        commit(types.SETCURRENTMUSIC,music);
    },

    setMusicPosition({commit},position){
        commit(types.SETMUSICPOSITION,position);
    },

    setCurrentMusicTime({commit},time){
        commit(types.SETCURRENTMUSICTIME,time);
    },

    setMusicIsPlay({commit},status){
        commit(types.SETMUSICISPLAY,status);
    },

    setMusicList({commit,rootState},id){

        const musicList= rootState.MusicModule.musicList;
        if(musicList.content !==undefined){
            //数据已存在，直接渲染就行了
            return;
        }
        commit(types.SETNETSTATE,true);
        MusicApi.getMusicList(id)
            .then(
                res=> {
                    commit(types.SETNETSTATE,false);
                    commit(types.SETMUSICLIST,res.data.playlist.tracks);
                },
                err=> {
                    commit(types.SETNETSTATE,false);
                    console.log("错误了");
                }
            );
    },

    setCurrentMusicDuration({commit},time){
        commit(types.SETCURRENTMUSICDURATION,time);
    },

    addCollectedMusic({commit},music){
        commit(types.ADDCOLLECTEDMUSIC,music);
    },

    deleteCollectedMusic({commit},id){
        commit(types.DELETECOLLECTEDMUSIC,id);
    },

    setHotSongSheet({commit,rootState}){
        if(rootState.MusicModule.hotSongSheet[0] !== undefined){
            return;
        }

        commit(types.SETNETSTATE,true);
        MusicApi.getHotSongSheet()
            .then(
                res=> {
                    commit(types.SETNETSTATE,false);
                    commit(types.SETHOTSONGSHEET,res.data.playlists);
                },
                err=> {
                    commit(types.SETNETSTATE,false);
                }
            );
    },

    setTopList({commit},id){
        commit(types.SETNETSTATE,true);
        MusicApi.getMusicList(id)
            .then(
                res=> {
                    commit(types.SETNETSTATE,false);
                    commit(types.SETTOPLIST,res.data.playlist.tracks);
                },
                err=> {
                    commit(types.SETNETSTATE,false);
                }
            );
    },

    setPlayingKind({commit},kind){
        commit(types.SETPLAYINGKIND,kind);
    },

    resetSearchList({commit}){
        commit(types.RESETSEARCHLIST);
    },

    setSearchList({commit},word,pageNum){
        commit(types.SETNETSTATE,true);
        MusicApi.searchMusic(pageNum,word)
            .then(
                res=> {
                    commit(types.SETNETSTATE,false);
                    if(res.data.code === -1){
                        return;
                    }
                    commit(types.SETSEARCHLIST,res.data.result.songs);
                },
                err=> {
                    commit(types.SETNETSTATE,false);
                }
            );
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
