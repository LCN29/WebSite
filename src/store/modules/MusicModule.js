
import * as types from '../mutation-types';
import MusicApi from '../../api/MusicApi';

const state= {

    // 音乐显示列表,musicSheet等内容都是由他提供，
    musicList: {},

    //当前播放的歌曲
    currentMusic: {
        id: '',
        name: 'Each and All ',
        url: '/static/default.mp3',
        duration: '05:17',
        singer: 'livetune/Fukase',
        picurl: '/static/default.jpg',
        lyric: "",
        /* 在页面列表中的位置 */
        musicindex: -1,
    },

    //当前歌曲的歌词位置
    musicPosition: 0,

    //当前音乐已经播放的时间 12323232
    currentMusicTime: 0,

    //音乐播放状态
    musicIsPlay: true,

    // 当前音乐的持续时间  123456
    currentMusicDuration: 0,

    // 收集歌曲的内容
    musicCollectList: localStorage.getItem('musicCollectList') ? JSON.parse(localStorage.getItem('musicCollectList')): [],
};

const getters= {

    getCurrentMusic: state=> state.currentMusic,
    getMusicPosition: state=> state.musicPosition,
    getCurrentMusicTime: state=> state.currentMusicTime,
    getMusicIsPlay: state=> state.musicIsPlay,
    getMusicList: state=> state.musicList.content,
    getCurrentMusicDuration: state=> state.currentMusicDuration,
    getMusicCollectList: state=> state.musicCollectList,
};

const mutations= {

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
        state.musicCollectList.unshift(music);
        localStorage.setItem('musicCollectList', JSON.stringify(list));
        console.log(state.musicCollectList);
    },

    [types.DELETECOLLECTEDMUSIC](state,id){

        let list= state.musicCollectList;
        list.forEach((item,i)=>{
            if(id=== item.id){
                //找到要删除的音乐
                console.log("找到了");
                state.musicCollectList.splice(i, 1);
                localStorage.setItem('musicCollectList', JSON.stringify(list));
                return;
            }
        });

    },

};

const actions= {

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

    addCollectedMusic({commit,rootState},music){
        commit(types.ADDCOLLECTEDMUSIC,music);
    },

    deleteCollectedMusic({commit},id){
        commit(types.DELETECOLLECTEDMUSIC,id);
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};
