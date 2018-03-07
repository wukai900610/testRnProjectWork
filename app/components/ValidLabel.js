import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NewInputPass from '../components/NewInputPass';
import Util from '../libs/libs';

class ValidLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            text:this.props.defaultText ? this.props.defaultText : '',
            password:{
                status:'',
                text:''
            },
            password1:{
                status:'',
                text:''
            }
        }
    }

    _validInput(){
        let {password,password1} = this.state;

        // if(password1.text != ''){
        //     if(Util.ruleFun['s6-20'](password1.text) && password.text == password1.text){
        //         password1.status = 'pass'
        //     }else{
        //         password1.status = 'fail'
        //     }
        // }else{
        //     password.status = ''
        // }
        if(Util.ruleFun['s6-20'](password1.text) && password.text == password1.text){
            password1.status = 'pass'
        }else{
            if(password1.text == ''){
                password1.status = ''
            }else{
                password1.status = 'fail'
            }
        }

        this.setState({
            password:password,
            password1:password1
        })

        this.props.onPasswordChange({
            status:password1.status,
            passwordText:password.text,
            password1Text:password1.text,
        })
    }

    _passwordChange(params){
        let {password} = this.state;
        password.text = params.text

        if(password.text != ''){
            if(Util.ruleFun['s6-20'](password.text)){
                password.status = 'pass'
            }else{
                password.status = 'fail'
            }
        }else{
            password.status = ''
        }

        this.setState({
            password:password
        })

        this._validInput()
    }

    _password1Change(params){
        let {password1} = this.state;
        password1.text = params.text

        this.setState({
            password1:password1
        })

        this._validInput()
    }

    render() {
        let { password,password1 } = this.state;

        return (
            <View>
                <View style={this.props.labelStyle}>
                    <NewInputPass placeholder="密码" secureTextEntry={true} style={this.props.textInputStyle} status={password.status} inputChange={(e)=>{this._passwordChange(e)}} />
                </View>
                <View style={this.props.labelStyle}>
                    <NewInputPass placeholder="确认密码" secureTextEntry={true} style={this.props.textInputStyle} status={password1.status} inputChange={(e)=>{this._password1Change(e)}} />
                </View>
            </View>
        );
    }
}
export default ValidLabel;

const styles = {

}
