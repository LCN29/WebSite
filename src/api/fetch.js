
import axios from 'axios';
import qs from 'qs';

function checkStatus (response) {
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response;
    }

    return {
        status: -404,
        msg: '网络异常'
    };
}

function checkCode (res) {

    if (res.status === -404) {
        console.log(res.msg)
    }
    return res;
}

export default {
    post (url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
                response =>{
                    return checkStatus(response);
                },
                err=> {
                    return checkCode(err);
                }
            );
    },

    get (url, params) {
        return axios({
            method: 'get',
            url,
            params : params ? params : null,
            timeout: 10000
        }).then(
                response =>{
                    return checkStatus(response);
                },
                err=> {
                    return checkCode(err);
                }
            );
    }
}
