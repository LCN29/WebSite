
import fetch from './fetch';

const baseUrl= "http://localhost:8081/user";

export default {

    getVerifyCode(){
        let url= baseUrl+"/verifycode";
        return fetch.get(url);
    },

    login( username, password){
        let url= baseUrl+"/login";
        return fetch.post(url, {
            username,
            password,
        });
    }
};


