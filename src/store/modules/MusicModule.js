
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

    //当前音乐已经播放的时间 12323232格式为这个  需要将其改为 12:34这个
    currentMusicTime: 0,

    //音乐播放状态
    musicIsPlay: true,

    // 当前音乐的持续时间  23: 00
    currentMusicDuration: 0,

};

const getters= {

    getCurrentMusic: state=> state.currentMusic,
    getMusicPosition: state=> state.musicPosition,
    getCurrentMusicTime: state=> state.currentMusicTime,
    getMusicIsPlay: state=> state.musicIsPlay,

    getMusicList: state=> state.musicList.content,



    getCurrentMusicDuration: state=> state.currentMusicDuration,
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
    }
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


    initMusicSheet({ commit },id){
        commit(types.NETWORKREQUEST);
        MusicApi.getMusicSheet(id)
            .then(
                response=> {
                    commit(types.NETWORKREQUESTEND);
                    commit(types.SETMUSICLIST,response.data.playlist.tracks);
                },
                res=> {
                    commit(types.NETWORKREQUESTEND);
                }
            )
    },

    setCurrentMusicDuration({commit},time){
        commit(types.SETCURRENTMUSICDURATION,time);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
