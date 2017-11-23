import Vue from 'vue';
import Vuex from 'vuex';

import MusicModule from './modules/MusicModule';

import * as types from './mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {

    //一开始进入音乐的路由
    musicRouter: '/music/playlist',
    //显示加载进度圈
    showLoading: false,
    //音乐播放标签<audio>
    audioEle: '',

    //显示歌词的标签
    lrcElem: '',

};

const getters = {
    getMusicRouter: state=> state.musicRouter,
    getShowLoading: state=> state.showLoading,
    getAudioEle: state=> state.audioEle,
    getLrcElem: state=> state.lrcElem,
};

const mutations= {
    //修改音乐路由
    [types.SETMUSICROUTER](state, data){
        state.musicRouter= data;
    },
    //设置网络状态，是否显示加载...
    [types.SETNETSTATE](state,status){
        state.showLoading= status;
    },
    //3，设置音乐播放标签<audio>
    [types.SETAUDIOELE](state,audio){
        state.audioEle= audio;
    },
    //4,设置歌词播放的控件
    [types.SETLRCELEM](state,elem){
        state.lrcElem= elem;
    }
};

const actions= {
    setMusicRouter({ commit }, data){
        commit(types.SETMUSICROUTER, data);
    },
    setNetState({commit},status){
        commit(types.SETNETSTATE,status);
    },
    setAudioEle({commit},audio){
        commit(types.SETAUDIOELE,audio);
    },
    setLrcElem({ commit }, elem){
        commit(types.SETLRCELEM, elem);
    }
};


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        MusicModule,
    },
    strict: debug,
});

export default store;
