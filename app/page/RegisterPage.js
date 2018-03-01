import React from 'react';
import {View, Text} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';
import NewPick from '../components/NewPick';

// import Immutable from 'immutable';
import Util from '../libs/libs';

let _that;
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showLoad:false,
            showAlert:{
                show:false,
                message:''
            },
            registerSuccess:false,
            type:{
                name:'法人',
                value:'fr'
            },
            pickVisible:false,
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

    register(){
        let _this = this
        let { navigation } = _this.props
        let payload

        if(_this.state.type.value == 'fr'){
            payload = {
                username:_this.username.state.text,
                password:_this.state.password1.text,
                realname:_this.realname.state.text,
                idcard:_this.idcard.state.text,
                phone:_this.phone.state.text,
                type:_this.state.type.value,

                // zrrPicFront:_this.state.zrrPicFront,
                // zrrPicBack:_this.state.zrrPicBack,
                // frPicOrg:_this.state.frPicOrg,
                // frPicCopy:_this.state.frPicCopy,
                wtqy:_this.wtqy.state.text
            }
        }else{
            payload = {
                username:_this.username.state.text,
                password:_this.state.password1.text,
                realname:_this.realname.state.text,
                idcard:_this.idcard.state.text,
                phone:_this.phone.state.text,
                type:_this.state.type.value,

                // zrrPicFront:_this.state.zrrPicFront,
                // zrrPicBack:_this.state.zrrPicBack,
            }
        }

        console.log(payload);

        // if(!(payload.username && payload.password)){
        //     _this.setState({
        //         showAlert:{
        //             show:true,
        //             message:'请输入用户名或密码'
        //         }
        //     })
        //
        //     return false
        // }

        // 显示加载器
        // _this.setState({
        //     showLoad:true,
        //     loginSuccess:false
        // })
        //
        // Util.ajax.get(Util.api.userLogin, {params: payload}).then((response) => {
        //     setTimeout(()=>{
        //         _this.setState({
        //             showLoad:false,
        //         })
        //     },300)
        //
        //     if(response.status==200){
        //         if(response.data.resultObj.code == 1000){
        //             setTimeout(()=>{
        //                 _this.setState({
        //                     loginSuccess:true,
        //                     showAlert:{
        //                         show:true,
        //                         message:'登陆成功'
        //                     }
        //                 })
        //             },600)
        //
        //             STORAGE.save({
        //                 key:'frontUser',
        //                 data:response.data.frontUser
        //             })
        //         }else{
        //             setTimeout(()=>{
        //                 _this.setState({
        //                     showAlert:{
        //                         show:true,
        //                         message:response.data.resultObj.mess
        //                     }
        //                 })
        //             },600)
        //         }
        //     }else{
        //         setTimeout(()=>{
        //             _this.setState({
        //                 showAlert:{
        //                     show:true,
        //                     message:'登陆失败'
        //                 }
        //             })
        //         },600)
        //     }
        // }).catch((err) => {
        //     setTimeout(()=>{
        //         _this.setState({
        //             showLoad:false,
        //         })
        //     },300)
        //     setTimeout(()=>{
        //         _this.setState({
        //             showAlert:{
        //                 show:true,
        //                 message:'请检查网络'
        //             }
        //         })
        //     },600)
        // });
    }

    renderType(){
        if(this.state.type.value == 'fr'){
            return (
                <View style={styles.label}>
                    <NewInput rule={{test:'*'}} placeholder="委托企业" ref={(e) => {this.wtqy = e;}} style={styles.TextInput} />
                </View>
            )
        }else{
            return (
                <View style={styles.label}>
                </View>
            )
        }
    }

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

    componentDidMount(){
        _that=this;
    }

    render() {
        let { navigation } = this.props;
        const {showAlert,showLoad,type} = this.state;

        return (
            <View style={{flex:1}}>
                <View style={styles.RegisterPage}>
                    <View style={styles.LoginInputBox}>
                        <View style={styles.label}>
                            <NewInput rule={{test:"s2-20"}} placeholder="帐号" ref={(e) => {this.username = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.label}>
                            <NewInput rule={{test:"s6-20"}} placeholder="密码" secureTextEntry={true} style={styles.TextInput} inputChange={this._passwordChange} />
                        </View>
                        <View style={styles.label}>
                            <NewInput rule={{test:"checkPassword",password:this.state.password.text,passwodRule:"s6-20"}} placeholder="确认密码" secureTextEntry={true} style={styles.TextInput} inputChange={this._password1Change} />
                        </View>
                        <View style={styles.label}>
                            <NewInput rule={{test:"z2-4"}} placeholder="姓名" ref={(e) => {this.realname = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.label}>
                            <NewInput rule={{test:'idCard'}} placeholder="身份证号" ref={(e) => {this.idcard = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.label}>
                            <NewInput rule={{test:'phone'}} placeholder="手机号" ref={(e) => {this.phone = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.label}>
                            <View style={{height:50,justifyContent:'center'}}>
                                <Text style={{paddingLeft:15,color:'#ccc'}}>注册类型</Text>
                            </View>
                            <View style={{height:50,justifyContent:'center'}}>
                                <NewButton title={type.name} style={{marginLeft:10,backgroundColor:'#ccc'}} textStyle={{color:'#fff'}} onPress={()=>{this.setState({pickVisible:true})}} />
                            </View>
                        </View>


                        {this.renderType()}

                        <NewPick
                            data={[{'name':'法人',value:'fr'},{'name':'自然人',value:'zrr'}]}
                            pickVisible={this.state.pickVisible}
                            selected={0}
                            onCancel={()=>{this.setState({pickVisible:false})}}
                            onConfirm={(selected)=>{
                                this.setState({
                                    pickVisible:false,
                                    type:selected
                                })
                            }}
                         />

                    </View>

                    <NewButton title="注册" style={styles.LoginBtn} textStyle={styles.LoginBtnText} onPress={()=>{this.register()}} />
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
export default RegisterPage;

const styles = {
    RegisterPage: {
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
}
