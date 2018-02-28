import React from 'react';
import {View, Text} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';

// import Immutable from 'immutable';
import Util from '../libs/libs';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showLoad:false,
            showAlert:{
                show:false,
                message:''
            },
            loginSuccess:false
        }
    }

    _hideAlert = () => {
        let {showAlert} = this.state
        showAlert.show = false

        this.setState({
            showAlert: showAlert
        });
    };

    login(){
        let _this = this
        let { navigation } = _this.props
        let payload = {
            username:this.username.state.text,
            password:this.password.state.text,
        }

        if(!(payload.username && payload.password)){
            _this.setState({
                showAlert:{
                    show:true,
                    message:'请输入用户名或密码'
                }
            })

            return false
        }

        // 显示加载器
        _this.setState({
            showLoad:true,
            loginSuccess:false
        })

        Util.ajax.get(Util.api.userLogin, {params: payload}).then((response) => {
            setTimeout(()=>{
                _this.setState({
                    showLoad:false,
                })
            },300)

            if(response.status==200){
                if(response.data.resultObj.code == 1000){
                    setTimeout(()=>{
                        _this.setState({
                            loginSuccess:true,
                            showAlert:{
                                show:true,
                                message:'登陆成功'
                            }
                        })
                    },600)

                    STORAGE.save({
                        key:'frontUser',
                        data:response.data.frontUser
                    })
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
                            message:'登陆失败'
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

    render() {
        let { navigation } = this.props;
        const {showAlert,showLoad} = this.state;

        return (
            <View style={{flex:1}}>
                <View style={styles.LoginPage}>
                    <View style={styles.LoginInputBox}>
                        <View style={styles.label}>
                            <NewInput placeholder="帐号" ref={(e) => {this.username = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.label}>
                            <NewInput placeholder="密码" secureTextEntry={true} ref={(e) => {this.password = e;}} style={styles.TextInput} />
                        </View>
                    </View>

                    <NewButton title="登陆" style={styles.LoginBtn} textStyle={styles.LoginBtnText} onPress={()=>{this.login()}} />

                    <View style={styles.LoginButtom}>
                        <NewButton title="注册" onPress={()=>{navigation.navigate('RegisterPage')}} />

                        <NewButton title="忘记密码" onPress={()=>{navigation.navigate('FindPassPage')}} />
                    </View>
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
                        let {loginSuccess} = this.state

                        if(loginSuccess){
                            navigation.navigate('AboutPage')
                        }
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
export default LoginPage;

const styles = {
    LoginPage: {
        padding:20,
        flex: 1,
        backgroundColor:'#fff'
    },
    LoginInputBox: {
        marginBottom:20,
    },
    label: {
        flexDirection: 'row',
    },
    TextInput: {
        paddingLeft:10,
        height: 40,
        borderWidth:0,
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    LoginBtn: {
        marginBottom: 10,
        height: 40,
        backgroundColor: '#2795ee'
    },
    LoginBtnText: {
        color:'#fff',
        fontSize:16
    },
    LoginButtom: {
        flexDirection:'row',
        justifyContent:'flex-end'
    }
}
