import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';

import MusicModule from './modules/MusicModule';
import GameModule from './modules/GameModule';



Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {

    //一开始进入音乐的路由
    musicRouter: '/music/playlist',
    //显示加载进度圈
    showLoading: false,
    //音乐播放标签<audio>
    audioEle: '',
};

const getters = {
    getMusicRouter: state=> state.musicRouter,
    getShowLoading: state=> state.showLoading,
    getAudioEle: state=> state.audioEle,

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
};


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        MusicModule,
        GameModule,
    },
    strict: debug,
});

export default store;
