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
	updatePhone: util.domain + '/frontUser/updatePhone.jspx',
	updatePasswork: util.domain + '/frontUser/updatePasswork.jspx',
    sendMessForPhone:util.domain + '/frontUser/sendMessForPhone.jspx',//注册时验证手机号

    applicationAdd:util.domain+'/frontUser/applicationAdd.jspx',//信用报告
    qyzb:util.domain+'/frontUser/qyzb.jspx',//企业直报
    sxjb:util.domain+'/frontUser/sxjb.jspx',//举报信箱
    applicationAdd:util.domain+'/frontUser/applicationAdd.jspx',//自主查询
    applicationAdd:util.domain+'/frontUser/applicationAdd.jspx',//我的审批

    bindingAuthen:util.domain + '/frontUser/bindingAuthen.jspx',//前台网站用户后台认证绑定接口
    bindingAuthen:util.domain + '/frontUse/bindingAuthenSmsCode.jspx',//前台网站用户后台认证绑定发送验证码
}

util.checkLogin = function (navigation) {
    // let { navigation } = _this.props
    navigation.navigate('LoginPage')
    //
    return false;

    STORAGE.load({
        key:'frontUser'
    }).then(ret => {
        util.ajax.post(util.api.checkLogin, {params: {
            username:ret.username,
            password:ret.password,
            authCode:ret.authCode
        }}).then((response) => {
            if(response.data.resultObj.code !== 1000){
                navigation.navigate('LoginPage')
            }
        }).catch((err) => {
            navigation.navigate('LoginPage')
            console.log(err);
        });
    })
}

export default util;
