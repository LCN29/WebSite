
import * as types from '../mutation-types';

const state= {

    titleHint: '选择游戏模式吧',

};

const getters= {
    getTitleHint: state=> state.titleHint,
};

const mutations= {

    [types.SETTITLEHINT](state,title){
        state.titleHint= title;
    }
};

const actions= {
    setTitleHint({commit},title){
        commit(types.SETTITLEHINT,title);
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
