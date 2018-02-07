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

// util.domain = 'http://10.10.136.56:5050';
util.domain = 'http://www.gyxyw.gov.cn';

util.api = {
    list:util.domain + '/api/content/list.jspx',

    //双公示 type(frxk,zzrxk,frcf,zzrcf) keyword pageNo pageSize
    selectSgsInfo:util.domain + '/selectSgsInfo.jspx',
    //红榜 type(1,2) searchVal pageNo pageSize
    lhjc_hob:util.domain + '/lhjc_hob.jspx',
    //黑榜 type(1,2) searchVal pageNo pageSize
    lhjc_heib:util.domain + '/lhjc_heib.jspx',
    //信用信息 type(fr,zzr) searchVal pageNo pageSize
    // xyxx:util.domain + '/list.jspx',
    //统一社会信用代码公示 searchVal pageNo pageSize
    // xydm:util.domain + '/xydm.jspx',
}

export default util;
