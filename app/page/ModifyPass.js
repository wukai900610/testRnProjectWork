import React from 'react';
import {View, Text} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';
import SendMessWithInput from '../components/SendMessWithInput';

import Util from '../libs/libs';

let _that;
class ModifyPass extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showLoad:false,
            showAlert:{
                show:false,
                message:''
            },
            ModifyPassSuccess:false,
            frontUser:{},
            password:{},
            password1:{}
        }
    }

    _hideAlert = () => {
        let {showAlert} = this.state
        showAlert.show = false

        this.setState({
            showAlert: showAlert
        });
    };

    _passwordChange(params){
        _that.setState({
            password:params
        })
    }

    _password1Change(params){
        _that.setState({
            password1:params
        })
    }

    save(){
        let { navigation } = this.props;
        let _this = this;

        let payload = {
            username:this.state.frontUser.username,
            phone:this.state.frontUser.phone,
            authCode:this.authCode.newInput.state.text,
            password:this.state.password1.text,
            sureNunber:this.state.password1.text
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
            ModifyPassSuccess:false
        })

        Util.ajax.get(Util.api.updatePasswork, {params: payload}).then((response) => {
            setTimeout(()=>{
                _this.setState({
                    showLoad:false,
                })
            },300)

            if(response.status==200){
                if(response.data.resultObj.code == 1000){
                    setTimeout(()=>{
                        _this.setState({
                            ModifyPassSuccess:true,
                            showAlert:{
                                show:true,
                                message:'修改成功'
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
                            message:'修改失败'
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

    componentWillMount(){
        STORAGE.load({
            key:'frontUser',
        }).then(ret => {
            this.setState({
                frontUser:ret
            })
        })
    }

    renderUserName(){
        if(this.state.frontUser.phone){
            return (
                <NewInput editable={false} showClearTextBtn={false} defaultText={this.state.frontUser.phone} placeholder="手机号" style={styles.TextInput} />
            )
        }
    }

    componentDidMount(){
        _that=this;
    }

    render() {
        let { navigation } = this.props;
        const {showAlert,showLoad} = this.state;

        let outLinkData={
            params:{
                username:this.state.frontUser.username,
            },
            key:'username',
            tipText:''
        }

        return (
            <View style={{flex:1}}>
                <View style={styles.ModifyPass}>
                    <View style={styles.ModifyPassInputBox}>
                        <View style={styles.ModifyPassLabel}>
                            {
                                this.renderUserName()
                            }
                        </View>
                        <View style={styles.ModifyPassLabel}>
                            <SendMessWithInput ajaxUrl={Util.api.authCode} outLinkData={outLinkData} ref={(e) => {this.authCode = e;}}/>
                        </View>
                        <View style={styles.ModifyPassLabel}>
                            <NewInput rule={{test:"s6-20"}} placeholder="新密码" secureTextEntry={true} style={styles.TextInput} inputChange={this._passwordChange} />
                        </View>
                        <View style={styles.ModifyPassLabel}>
                            <NewInput rule={{test:"checkPassword",password:this.state.password.text,passwodRule:"s6-20"}} placeholder="确认密码" secureTextEntry={true} style={styles.TextInput} inputChange={this._password1Change} />
                        </View>
                    </View>

                    <NewButton title="保存" style={styles.ModifyPassBtn} textStyle={styles.ModifyPassBtnText} onPress={()=>{this.save()}} />
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
                        let {ModifyPassSuccess} = this.state

                        if(ModifyPassSuccess){
                            navigation.goBack();
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
export default ModifyPass;

const styles = {
    ModifyPass: {
        padding:20,
        flex: 1,
        backgroundColor:'#fff'
    },
    ModifyPassInputBox: {
        marginBottom:20,
    },
    ModifyPassLabel: {
        flexDirection: 'row',
    },
    TextInput: {
        paddingLeft:10,
        height: 40,
        borderWidth:0,
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    ModifyPassBtn: {
        marginBottom: 10,
        height: 40,
        backgroundColor: '#2795ee'
    },
    ModifyPassBtnText: {
        color:'#fff',
        fontSize:16
    },
    ModifyPassButtom: {
        flexDirection:'row',
        justifyContent:'flex-end'
    }
}
