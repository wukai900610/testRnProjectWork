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

util.ruleFun = {
    'email':function (text) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text);
    },
    'phone':function (text) {
        return /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/.test(text);
    },
    'idCard':function (gets) {
        var reg = /^[^ ]$/; //不包含空格
        //该方法由佚名网友提供;
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;

        if (gets.length == 15) {
            return isValidityBrithBy15IdCard(gets);
        } else if (gets.length == 18) {
            var a_idCard = gets.split(""); // 得到身份证数组
            if (isValidityBrithBy18IdCard(gets) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            }
            return false;
        }
        return false;

        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0; // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
            }
            for (var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i]; // 加权求和
            }
            valCodePosition = sum % 11; // 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            }
            return false;
        }

        function isValidityBrithBy18IdCard(idCard18) {
            var year = idCard18.substring(6, 10);
            var month = idCard18.substring(10, 12);
            var day = idCard18.substring(12, 14);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 这里用getFullYear()获取年份，避免千年虫问题
            if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            }
            return true;
        }

        function isValidityBrithBy15IdCard(idCard15) {
            var year = idCard15.substring(6, 8);
            var month = idCard15.substring(8, 10);
            var day = idCard15.substring(10, 12);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            }
            return true;
        }
    },
    'n':function (text) {
        return /^\d+$/.test(text);
    },
    'z2-4':function (text) {
        return /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(text);
    },
    's':function (text) {
        return /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/.test(text);
    },
    's2-20':function (text) {
        return /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{2,20}$/.test(text);
    },
    's6-20':function (text) {
        return /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,20}$/.test(text);
    },
    '*':function (text) {
        return /[\w\W]+/.test(text);
    }
}

const ajaxUrl = '';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    // timeout: 2000,
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

// util.domain = 'http://www.gyxyw.gov.cn';
// util.domain = 'http://10.10.136.32:5010';
util.domain = 'http://10.10.136.144:8080/';

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

    checkLogin:util.domain + '/frontUser/detail.jspx',//检查用户是否登陆
	userLogin: util.domain + '/frontUser/userLogin.jspx',
	authCode: util.domain + '/frontUser/authCode.jspx',//发送验证码
	checkUsername: util.domain + '/frontUser/checkUsername.jspx',
	userRegist: util.domain + '/frontUser/userRegist.jspx',
	forgetPassword: util.domain + '/frontUser/forgetPassword.jspx',
	sendMess: util.domain + '/frontUser/sendMess.jspx',
	// updatePhone: util.domain + '/frontUser/updatePhone.jspx',
	updatePasswork: util.domain + '/frontUser/updatePasswork.jspx',
    sendMessForPhone:util.domain + '/frontUser/sendMessForPhone.jspx',//注册时验证手机号

    qyhcInfo:util.domain+'/frontUser/qyhcInfo.jspx',//信用报告 法人
    grhcInfo:util.domain+'/frontUser/grhcInfo.jspx',//信用报告 自然人
    frzbList:util.domain+'/frontUser/frzbList.jspx',//直报 法人
    zrrzbList:util.domain+'/frontUser/zrrzbList.jspx',//直报 自然人
    sxjbList:util.domain+'/frontUser/sxjbList.jspx',//举报信箱

    bindingAuthenSmsCode:util.domain + '/frontUser/bindingAuthenSmsCode.jspx',//前台网站用户后台认证绑定发送验证码 参数： userId   backUserName  backPhone
    bindingAuthen:util.domain + '/frontUser/bindingAuthen.jspx',//前台用户认证绑定接口 参数：userId ； backUserName  ；backPhone

    taskList:util.domain+'/frontUserTask/taskList.jspx',//前台用户审核列表 参数：backUserName  page  rows
    // 用户审核相关
    getOutgoings:util.domain+'/frontUserTask/getOutgoings.jspx',//参数：taskId
    wflist:util.domain+'/frontUserTask/wflist.jspx',//kys
    wfowener:util.domain+'/frontUserTask/wfowener.jspx',//recordId
    examineTask:util.domain+'/frontUserTask/examineTask.jspx',//参数： taskId procId userId paramName paramValue tId comment
}

util.checkLogin = function (navigation) {
    // console.log(navigation);
    STORAGE.load({
        key:'frontUser'
    }).then(ret => {
        // console.log(ret);
        // util.ajax.post(util.api.checkLogin, {params: {
        //     username:ret.username,
        //     password:ret.password,
        //     authCode:ret.authCode
        // }}).then((response) => {
        //     if(response.data.resultObj.code !== 1000){
        //         navigation.navigate('LoginPage')
        //     }
        // }).catch((err) => {
        //     navigation.navigate('LoginPage')
        // });
    }).catch((e)=>{
        navigation.navigate('LoginPage',{from:'ServiceHallPage'})
    })
}

export default util;
