
import api from '../../api/MusicApi';
import store from '../../store';
import * as types from '../../store/mutation-types';

import $ from 'jquery';

const musicApi = {

    lastLyric: 0,
    lyric: {},    // 解析的歌詞

    // 获取音乐时长的 00:11的格式
    getMusicFormat(time) {
        const minT = Math.floor(time / 1000 / 60) >= 10 ? Math.floor(time / 1000 / 60) : '0' + Math.floor(time / 1000 / 60)
        const minS = Math.floor(time / 1000 % 60) >= 10 ? Math.floor(time / 1000 % 60) : '0' + Math.floor(time / 1000 % 60)
        return minT + ':' + minS
    },

    //点击播放某一项
    clickIndex(data,that){
        api.getMusicInfo(data.id)
            .then(
                res=> {
                    // 如果代码不允许被播放（付费音乐）
                    if (res.data.data[0].url === null) {

                        const currentMusic = {
                            musicindex: store.getters.getCurrentMusic.musicindex ? store.getters.getCurrentMusic.musicindex + 1 :  1,
                        };
                        store.commit(types.SETCURRENTMUSIC,currentMusic);
                        this.playNextPrev(that, true);
                        return;
                    }

                    const newData= { ...data, url: musicApi.replaceUrl(res.data.data[0].url)};
                    this.getMusicLrc(newData, that);
                },
                err=> {
                    console.log(err);
                }
            );
    },

    //播放上一首/下一首  false: 上一首  true: 下一首
    playNextPrev(that, isNext){
        let index = store.getters.getCurrentMusic.musicindex || 0;
        let length = store.getters.getMusicList.length ;
        const musiclist = store.getters.getMusicList || [];
        if (isNext) {
            index++;
            if (index > length - 1) {
                index= 0;
            }
        }else{
            index--;
            if (index < 0) {
                index= length - 1;
            }
        }
        api.getMusicInfo(musiclist[index].id)
            .then(
                res=> {
                    // 如果代码不允许被播放（付费音乐）
                    if (res.data.data[0].url === null) {
                        const currentMusic = {
                            musicindex: store.getters.getCurrentMusic.musicindex ? store.getters.getCurrentMusic.musicindex + 1 : 1,
                        };
                        store.commit(types.SETCURRENTMUSIC, currentMusic);
                        this.playNextPrev(that, true);
                        return;
                    }
                    const newData = {
                        id: musiclist[index].id,
                        name: musiclist[index].name,
                        url: musicApi.replaceUrl(res.data.data[0].url),
                        singer: musiclist[index].ar[0].name,
                        duration: musicApi.getMusicFormat(musiclist[index].dt),
                        picurl: musiclist[index].al.picUrl,
                        musicindex: index,
                    };
                    this.getMusicLrc(newData, that);
                },
                (err) => {
                    console.log(err)
                }
            );
    },

    //暂停/播放
    playPause(){
        try {
            const ele = store.getters.getAudioEle;
            if (!(ele.src.indexOf('.mp3') > 0)) return;
            if (ele.paused) {
                ele.play()
            } else {
                ele.pause()
            }
            store.commit(types.SETMUSICISPLAY, !ele.paused);
        } catch (e) {
            return;
        }
    },

    //获取歌词
    getMusicLrc(data, that){
        api.getMusicLrc(data.id)
            .then(
                res=> {
                  /*  let parseLrc = {};*/
                    if (res.data.lrc === undefined) {
                        /*parseLrc= {'0': '纯音乐,请欣赏'};*/
                        this.lyric = {'0': '纯音乐,请欣赏'};
                    }else{
 /*                       parseLrc = this.parseLrc(res.data.lrc.lyric);*/
                        this.lyric = this.parseLrc(res.data.lrc.lyric);
                    }
                    // 初始化最後一個lrc
                    this.lastLyric = -1;

                    const currentMusic= { ...data, lyric: this.lyric };

                    store.commit(types.SETCURRENTMUSIC,currentMusic);
                    that.$nextTick(() => {
                        try {
                            store.getters.getAudioEle.load();
                            store.getters.getAudioEle.play();
                        } catch (e) {
                            return;
                        }
                    });
                    // 设置歌词位置
                    store.commit(types.SETMUSICPOSITION,0);
                    //将显示歌词的部分重置为0，否则下一首播放时，显示的是上一次的位置
                    $('.lrc-content').stop().animate({scrollTop: 0}, 1000);
                    // 设置播放状态
                    store.commit(types.SETMUSICISPLAY, true);
                },
                err=> {
                    console.log(err);
                }
            );
    },

    //给 audio添加事件
    initAudioEvent(that){

        const ele = store.getters.getAudioEle;
        // 本地音乐初始化  （收藏的歌曲）
        this.getLocalMusic();

        ele.onloadedmetadata = () => {
        };

        // 音乐播放结束事件
        ele.onended = () => {
            this.playNextPrev(that, true)
        };

        ele.ontimeupdate = function () {
            if (!that.isDrag) {
                const duration = Math.floor(ele.duration);
                const currentT = Math.floor(ele.currentTime);
                musicApi.scrollLyric(currentT);
                store.commit(types.SETCURRENTMUSICTIME,currentT);
                store.commit(types.SETCURRENTMUSICDURATION,duration );
            }
        };

        // 监听缓冲的进度
        ele.onprogress = function () {
            const durationT = Math.floor(ele.duration);
            try {
                if (ele.buffered.length > 0) {
                    let bufferedT = 0;
                    for (let i = 0; i < ele.buffered.length; i++) {
                        bufferedT += ele.buffered.end(i) - ele.buffered.start(i);
                        if (bufferedT > durationT) {
                            bufferedT = durationT;
                            console.log('缓冲完成');
                        }
                    }
                    let bufferedP = Math.floor((bufferedT / durationT) * 100);
                    that.bufferingP = bufferedP;
                }
            } catch (e) {
                return;
            }
        };
    },

    // 滚动歌词到指定句
    // 参数：当前播放时间（单位：秒）
    scrollLyric (time) {

        if (this.lyric === '') return false;
        time = parseInt(time);  // 时间取整
        if (this.lyric === undefined || this.lyric[time] === undefined) return false;  // 当前时间点没有歌词

        if (this.lastLyric === time) return true; // 歌词没发生改变

        let i = 0;  // 获取当前歌词是在第几行

        for (let k in this.lyric) {
            if (k > time) break;
            i++;
        }

        this.lastLyric = time; // 记录方便下次使用

        store.commit(types.SETMUSICPOSITION, i);

        try {
            let scroll = (document.getElementsByClassName('lrc-item')[0].offsetHeight * i) - store.getters.getLrcElem.offsetHeight / 2;
            $('.lrc-content').stop().animate({scrollTop: scroll}, 1000);
        }catch (e) {
            return;
        }
    },

    //点击了进度条的某个位置

    clickProgress(ev){
        const ele = store.getters.getAudioEle;
        const durationT = ele.duration;
        const e = ev || window.event;
        const l = e.offsetX;
        const w = document.getElementById('music_progressD').offsetWidth;
        console.log(l + '------------' + w);
        ele.currentTime = Math.floor(l / w * durationT);
        this.refreshLyric(ele.currentTime);
    },

    // 刷新進度的歌詞
    refreshLyric (time) {
        if (this.lyric === '') return false;
        time = parseInt(time);  // 时间取整
        let i = 0;
        for (let k in this.lyric) {
            if (k >= time) break;
            i = k ;    // 记录上一句的
        }
        this.scrollLyric(i);
    },





    //显示本地收藏音乐
    getLocalMusic(){

    },





    // 由于网易云地址有添加防盗链  m8c,m7c 的地址替换成m8,m7 就可以正常播放
    replaceUrl(url){
        return url.indexOf('//m7c') < 0 ? (url.indexOf('//m8c') ? url.replace('//m8c', '//m8') : url) : url.replace('//m7c', '//m7');
    },

    //解析歌词
    parseLrc(lrc){
        if (lrc === '') return '';
        const lyrics = lrc.split('\n');
        let lrcObj = {};
        for (let i = 0; i < lyrics.length; i++) {
            // 解码
            const lyric = decodeURIComponent(lyrics[i]);
            const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            const timeRegExpArr = lyric.match(timeReg);
            if (!timeRegExpArr) continue;
            const clause = lyric.replace(timeReg, '');
            for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
                const t = timeRegExpArr[k];
                let min = Number(String(t.match(/\[\d*/i)).slice(1));
                let sec = Number(String(t.match(/\:\d*/i)).slice(1));
                const time = min * 60 + sec;
                lrcObj[time] = clause;
            }
        }
        return lrcObj;
    }
};

export default musicApi;
