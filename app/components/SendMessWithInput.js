import React from 'react';
import {View, Text} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';

import Util from '../libs/libs';

const maxTime = 60;

class SendMessWithInput extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showSecond:false,
            seconds:maxTime,
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

    sendMessBtn(){
        let _this = this;
        let payload = {
            username:this.props.username,
        }

        console.log(this.props);

        return false;

        // _this.setState({
        //     showSecond:true,
        // })
        //
        // let intervalTime = setInterval(function () {
        //     let seconds = _this.state.seconds-1;
        //
        //     if(_this.state.seconds == 0){
        //         clearInterval(intervalTime);
        //
        //         _this.setState({
        //             showSecond:false,
        //             seconds:maxTime
        //         })
        //     }else{
        //         _this.setState({
        //             seconds:seconds
        //         })
        //     }
        // }, 1000);
        //
        // // 显示加载器
        // _this.setState({
        //     showLoad:true,
        //     loginSuccess:false
        // })
        //
        // Util.ajax.get(Util.api.authCode, {params: payload}).then((response) => {
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
        //                         message:'发送成功'
        //                     }
        //                 })
        //             },600)
        //
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
        //                     message:'发送失败'
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

    rendBtn(){
        let showSecond = this.state.showSecond;
        if(showSecond){
            return (
                <NewButton title={'发送验证码'+this.state.seconds} style={styles.seconds} textStyle={styles.sendMessBtnText} />
            )
        }else{
            return (
                <NewButton title="发送验证码" style={styles.sendMessBtn} textStyle={styles.sendMessBtnText} onPress={()=>{this.sendMessBtn()}} />
            )
        }
    }

    render() {
        let { navigation } = this.props;
        const {showAlert,showLoad} = this.state;

        return (
            <View style={styles.SendMessWithInput}>
                <NewInput placeholder="请输入关键词" maxLength={6} ref={(e) => {this.newInput = e;}} style={styles.sendMessInput} />

                {this.rendBtn()}

                {/* <AwesomeAlert
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
                /> */}
            </View>
        );
    }
}
export default SendMessWithInput;

const styles = {
    SendMessWithInput: {
        flex:1,
        flexDirection: 'row',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    sendMessInput: {
        paddingLeft:10,
        height: 40,
        borderWidth:0
    },
    sendMessBtn: {
        marginTop:5,
        backgroundColor:'#2795ee'
    },
    sendMessBtnText: {
        color:'#fff'
    },
    seconds:{
        marginTop:5,
        backgroundColor:'#a1a1a1'
    }
}
