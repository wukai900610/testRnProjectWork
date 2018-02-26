import React from 'react';
import {View, Text} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';
import SendMessWithInput from '../components/SendMessWithInput';

import Util from '../libs/libs';

class FindPassPage extends React.Component {
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

    save(){
        let _this = this
        let { navigation } = _this.props
        let payload = {
            username:this.username.state.text,
            authCode:this.authCode.newInput.state.text,
        }

        if(!(payload.username)){
            _this.setState({
                showAlert:{
                    show:true,
                    message:'请输入用户名'
                }
            })

            return false
        }

        if(!(payload.authCode)){
            _this.setState({
                showAlert:{
                    show:true,
                    message:'请输入验证码'
                }
            })

            return false
        }

        // 显示加载器
        _this.setState({
            showLoad:true,
            loginSuccess:false
        })

        Util.ajax.get(Util.api.forgetPassword, {params: payload}).then((response) => {
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
                                message:'重置成功'
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
                            message:'重置失败'
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
                <View style={styles.FindPassPage}>
                    <View style={styles.FindPassInputBox}>
                        <View style={styles.FindPassLabel}>
                            <NewInput placeholder="帐号" ref={(e) => {this.username = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.FindPassLabel}>
                            <SendMessWithInput ref={(e) => {this.authCode = e;}}/>
                        </View>
                    </View>

                    <NewButton title="保存" style={styles.FindPassBtn} textStyle={styles.FindPassBtnText} onPress={()=>{this.save()}} />
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
                            // navigation.navigate('AboutPage')
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
export default FindPassPage;

const styles = {
    FindPassPage: {
        padding:20,
        flex: 1,
        backgroundColor:'#fff'
    },
    FindPassInputBox: {
        marginBottom:20,
    },
    FindPassLabel: {
        flexDirection: 'row',
    },
    TextInput: {
        paddingLeft:10,
        height: 40,
        borderWidth:0,
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    FindPassBtn: {
        marginBottom: 10,
        height: 40,
        backgroundColor: '#2795ee'
    },
    FindPassBtnText: {
        color:'#fff',
        fontSize:16
    },
    FindPassButtom: {
        flexDirection:'row',
        justifyContent:'flex-end'
    }
}
