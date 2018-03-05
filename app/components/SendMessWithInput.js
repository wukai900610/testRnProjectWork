import React from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';

import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';

import Util from '../libs/libs';

// const maxTime = 60;
const maxTime = 10;

// outLinkData外部关联的数据
class SendMessWithInput extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            countDown:maxTime,
            status:'',
        }
    }

    sendMessBtn(){
        let _this = this;
        let {outLinkData,ajaxUrl} = this.props;
        let key = outLinkData.key;

        if(outLinkData.params[key] == '' || outLinkData.params[key] == undefined){
            Alert.alert(
                '提示',
                outLinkData.tipText,
                [
                    {text: '确认'},
                ],
                { cancelable: false }
            )

            return false;
        }

        // 显示加载器
        _this.setState({
            status:'loading',
        })

        setTimeout(function () {
            Util.ajax.get(_this.props.ajaxUrl, {params: outLinkData.params}).then((response) => {
                if(response.status==200){
                    if(response.data.resultObj.code == 1000){
                        _this.setState({
                            status:'sendSuccess'
                        })

                        let intervalTime = setInterval(function () {
                            let countDown = _this.state.countDown-1;

                            if(_this.state.countDown == 0){
                                clearInterval(intervalTime);

                                _this.setState({
                                    countDown:maxTime,
                                    status:''
                                })
                            }else{
                                _this.setState({
                                    countDown:countDown
                                })
                            }
                        }, 1000);
                    }else{
                        _this.setState({
                            status:'sendFail'
                        })

                        Alert.alert(
                            '提示',
                            response.data.resultObj.mess,
                            [
                                {text: '确认'},
                            ],
                            { cancelable: false }
                        )
                    }
                }else{
                    _this.setState({
                        status:'sendFail'
                    })
                }
            }).catch((err) => {
                _this.setState({
                    status:'networkFail'
                })
            });
        }, 200);
    }

    rendBtn(){
        let status = this.state.status;
        if(status == 'loading'){
            return (
                <NewButton title="发送中..." icon={<ActivityIndicator color="#fff" />} style={styles.sendMessBtn} textStyle={styles.sendMessBtnText} />
            )
        }else if(status == 'sendSuccess'){
            return (
                <NewButton title={'发送成功'+this.state.countDown} style={[styles.countDown]} textStyle={styles.sendMessBtnText} onPress={()=>{this.sendMessBtn()}} />
            )
        }else if(status == 'sendFail'){
            return (
                <NewButton title="发送失败,重新发送" style={styles.sendMessBtn} textStyle={styles.sendMessBtnText} onPress={()=>{this.sendMessBtn()}} />
            )
        }else if(status == 'networkFail'){
            return (
                <NewButton title="网络出错,重新发送" style={styles.sendMessBtn} textStyle={styles.sendMessBtnText} onPress={()=>{this.sendMessBtn()}} />
            )
        }else{
            return (
                <NewButton title="发送验证码" style={styles.sendMessBtn} textStyle={styles.sendMessBtnText} onPress={()=>{this.sendMessBtn()}} />
            )
        }
    }

    render() {
        return (
            <View style={styles.SendMessWithInput}>
                <NewInput placeholder="验证码" maxLength={6} ref={(e) => {this.newInput = e;}} style={styles.sendMessInput} />

                {this.rendBtn()}
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
        borderBottomWidth: 1
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
    countDown:{
        marginTop:5,
        backgroundColor:'#4caf50'
    }
}
