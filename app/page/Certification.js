import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';
import SendMessWithInput from '../components/SendMessWithInput';

import Util from '../libs/libs';

class Certification extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showLoad:false,
            showAlert:{
                show:false,
                message:''
            },
            certificationSuccess:false,
            certificationSuccessText:'未认证',
            frontUser:{},
            payload:{
                userId:'',
                backUserName:'',
                backPhone:'',
            }
        }
    }

    _hideAlert = () => {
        let {showAlert} = this.state
        showAlert.show = false

        this.setState({
            showAlert: showAlert
        });
    };

    _certificationBtn(){
        let { payload } = this.state;
        let _this = this;

        if(!(payload.backUserName && payload.backPhone)){
            _this.setState({
                showAlert:{
                    show:true,
                    message:'请输入后台用户和后台手机号'
                }
            })

            return false
        }

        // 显示加载器
        _this.setState({
            showLoad:true,
            certificationSuccess:false
        })

        Util.ajax.get(Util.api.bindingAuthen, {params: payload}).then((response) => {
            setTimeout(()=>{
                _this.setState({
                    showLoad:false,
                })
            },300)

            if(response.status==200){
                if(response.data.resultObj.code == 1000){
                    setTimeout(()=>{
                        _this.setState({
                            certificationSuccess:true,
                            certificationSuccessText:'认证成功',
                            showAlert:{
                                show:true,
                                message:'认证成功'
                            }
                        })
                    },600)
                }else{
                    setTimeout(()=>{
                        _this.setState({
                            showAlert:{
                                show:true,
                                message:response.data.resultObj.mess
                            }
                        })
                    },600)
                }
            }else{
                setTimeout(()=>{
                    _this.setState({
                        showAlert:{
                            show:true,
                            message:'认证失败'
                        }
                    })
                },600)
            }
        }).catch((err) => {
            setTimeout(()=>{
                _this.setState({
                    showLoad:false,
                })
            },300)
            setTimeout(()=>{
                _this.setState({
                    showAlert:{
                        show:true,
                        message:'请检查网络'
                    }
                })
            },600)
        });
    }

    isCertificationView(){
        let { payload } = this.state;
        let outLinkData={
            params:payload,
            key:'userId',
            tipText:''
        }

        if(!this.state.certificationSuccess){
            return (
                <View>
                    <View style={styles.Label}>
                        <NewInput inputChange={(callback)=>{
                            payload.backUserName = callback.text
                            this.setState({
                                payload:payload
                            })
                        }} placeholder="后台用户名" style={styles.TextInput} />
                    </View>
                    <View style={styles.Label}>
                        <NewInput inputChange={(callback)=>{
                            payload.backPhone = callback.text
                            this.setState({
                                payload:payload
                            })
                        }} placeholder="后台手机号" style={styles.TextInput} />
                    </View>
                    <View style={styles.Label}>
                        <SendMessWithInput ajaxUrl={Util.api.bindingAuthenSmsCode} outLinkData={outLinkData} ref={(e) => {this.authCode = e;}}/>
                    </View>
                    <NewButton title="点击认证" style={styles.CertificationBtn} textStyle={styles.CertificationBtnText} onPress={()=>{this._certificationBtn()}} />
                </View>
            )
        }
    }

    componentWillMount(){
        STORAGE.load({
            key:'frontUser',
        }).then(ret => {
            Util.ajax.get(Util.api.checkLogin, {params: {
                username:ret.username,
                password:ret.password,
                authCode:ret.authCode
            }}).then((response) => {
                if(response.data.resultObj.code == 1000){
                    let payload = this.state.payload;
                    payload.userId = response.data.frontUser.id;
                    this.setState({
                        frontUser:response.data.frontUser,
                        payload:payload,
                        certificationSuccess:response.data.frontUser.isBind == 'Y' ? true : false,
                        certificationSuccessText:'认证成功',
                    })
                }
            }).catch((err) => {
                // navigation.navigate('LoginPage')
            });
        }).catch((err) => {
            // navigation.navigate('LoginPage')
        });
    }

    render() {
        let { showAlert, showLoad } = this.state;

        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={styles.Certification}>
                    <View style={styles.isCertificationView}>
                        <Text style={styles.isCertificationViewText}>{this.state.certificationSuccessText}</Text>
                    </View>

                    {
                        this.isCertificationView()
                    }
                </View>

                <AwesomeAlert
                    show={showAlert.show}
                    showProgress={false}
                    // title="标题"
                    message={showAlert.message}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    // showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="取消"
                    confirmText="确定"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        // this._hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this._hideAlert();
                    }}
                />

                <AwesomeAlert
                    show={showLoad}
                    showProgress={true}
                    // title="标题"
                    // message="哈哈"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                />
            </View>

        );
    }
}
export default Certification;

const styles = {
    Certification: {
        padding: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    isCertificationView:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,
        width:'100%',
        height:150,
        backgroundColor:'#e1e1e1'
    },
    isCertificationViewText:{
        color:'#666',
        fontSize:20
    },
    Label: {
        marginBottom:10,
        flexDirection: 'row',
    },
    TextInput: {
        paddingLeft:10,
        height: 40,
        borderWidth:0,
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    CertificationBtn: {
        marginBottom: 10,
        height: 40,
        backgroundColor: '#2795ee'
    },
    CertificationBtnText: {
        color:'#fff',
        fontSize:16
    },
}
