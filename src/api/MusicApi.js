
import fetch from './fetch';

const baseUrl= "http://www.daiwei.org/vue/server/music.php";

export default {
//歌曲列表
    getMusicList(id){
        return fetch.get(baseUrl, {
            inAjax: 1,
            do: "playlist",
            id: id,
        });
    },
    //http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id=483913436
//歌曲信息
    getMusicInfo(id){
        return fetch.get(baseUrl,{
            inAjax: 1,
            do: "musicInfo",
            id: id,
        });
    },

    // http://www.daiwei.org/vue/server/music.php?inAjax=1&do=lyric&id=518894283
    //歌曲歌词
    getMusicLrc(id){
        return fetch.get(baseUrl,{
            inAjax: 1,
            do: "lyric",
            id: id,
        });
    }
}

;


