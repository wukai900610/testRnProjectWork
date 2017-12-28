import axios from 'axios';

let util = {};

const ajaxUrl = '';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 2000,
    // headers: {'content-type':'application/json;charset=UTF-8'},
    responseType: 'json',
    // transformResponse: [function (data) {
    //     // 这里提前处理返回的数据
    //     // console.log(JSON.parse(data));
    //     // console.log(data);
    //
    //     return data;
    // }]
});

export default util;
