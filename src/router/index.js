import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

import Home from '@/views/home/Home';

const Music= r=> require.ensure([],()=> r(require('@/views/music/Music')) ,'music');
const Settings= r=> require.ensure([],()=> r(require('@/views/settings/Settings')) ,'settings');
const PlayList= r=> require.ensure([],()=> r(require('@/views/music/playList/PlayList')) ,'playlist');
const CollectionList= r=> require.ensure([],()=> r(require('@/views/music/collectionList/CollectionList')) ,'collectionlist');
const TopList= r=> require.ensure([],()=> r(require('@/views/music/topList/TopList')) ,'toplist');
const TopSheet= r=> require.ensure([],()=> r(require('@/views/music/topList/TopSheet')) ,'topsheet');

const SearchView= r=> require.ensure([],()=> r(require('@/views/music/searchView/SearchView')) ,'searchView');
const SearchSheet= r=> require.ensure([],()=> r(require('@/views/music/searchView/SearchSheet')) ,'searchsheet');

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
                    path: '/music/playlist/:id',
                    components: {
                        ListInfo: PlayList,
                    }
                },
                {
                    path: '/music/playlist',
                    components: {
                        ListInfo: PlayList,
                    }
                },
                {
                    path: '/music/collectionlist',
                    components: {
                        ListInfo: CollectionList,
                    }
                },
                {
                    path: '/music/toplist',
                    components: {
                        ListInfo: TopList,
                    }
                },
                {
                    path: '/music/topsheet',
                    name:'topsheet',
                    components: {
                        ListInfo: TopSheet,
                    }
                },
                {
                    path: '/music/searchview',
                    components: {
                        FullScreen: SearchView,
                    }
                },
                {
                    path: '/music/searchsheet',
                    name: 'searchsheet',
                    components: {
                        ListInfo: SearchSheet,
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
