
import fetch from './fetch';

const baseUrl= "http://www.daiwei.org/vue/server/home.php";

export default {

    getPlace(){
        return fetch.get(baseUrl,{
            inAjax: 1,
            do: "getAdress",
        });
    },

    getWeather(city){
        const url = baseUrl+"?inAjax=1&do=getWeather";
        return fetch.post(url,{
            place: city
        });
    },
};
