import axios from 'axios';

let util = {};

//字符串截取
util.strSplit = (str,strLength)=>{
    var newStr='';
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        if(realLength >= strLength){
            return newStr + '...';
        }
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        } else {
            realLength += 2;
        }
        newStr = newStr + str[i];
    }
    return newStr;
}

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

let requestPreix = 'http://10.10.136.56:5050'
util.api = {
    // banner:'/api/content/list.jspx',
    homeList:requestPreix + '/api/content/list.jspx'
}

export default util;
