import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

import Home from '@/views/home/Home';

const Music= r=> require.ensure([],()=> r(require('@/views/music/Music')) ,'music');
const Settings= r=> require.ensure([],()=> r(require('@/views/settings/Settings')) ,'settings');
const PlayList= r=> require.ensure([],()=> r(require('@/views/music/playList/PlayList')) ,'playlist');
const CollectList= r=> require.ensure([],()=> r(require('@/views/music/collectionList/CollectionList')) ,'collectionlist');
const TopList= r=> require.ensure([],()=> r(require('@/views/music/topList/TopList')) ,'toplist');
const SearchView= r=> require.ensure([],()=> r(require('@/views/music/searchView/SearchView')) ,'searchView');


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/music',
            component: Music,
            children: [
                {
                    path: '/',
                    redirect: store.getters.getMusicRouter, //重定向到上一次的路由地址
                },
                {
                    path: '/music/playlist',
                    components: {
                        ListInfo: PlayList,
                    }
                },
                {
                    path: '/music/playlist/:id',
                    components: {
                        ListInfo: PlayList,
                    }
                }
            ],
        },
        {
            path: '/settings',
            component: Settings,
        }
    ]
})
