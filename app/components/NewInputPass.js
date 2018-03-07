import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Util from '../libs/libs';

/*
"match":/^(.+?)(\d+)-(\d+)$/,
    "*":/[\w\W]+/,
    "*6-16":/^[\w\W]{6,16}$/,
    "n":/^\d+$/,
    "n6-16":/^\d{6,16}$/,
    "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
    "s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
    "p":/^[0-9]{6}$/,
    "m":/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
    "e":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    "url":/^(\w+:\/\/)?\w+(\.\w+)+.*$/,
    "z2-4":/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/
*/

// showClearTextBtn 是否显示清除按钮
// inputChange 事件
// rule 规则
class NewInputPass extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            text:this.props.defaultText ? this.props.defaultText : ''
        }
    }

    setText(text){
        this.setState({
            text:text
        });

        let {rule} = this.props;

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text
            })
        }
    }

    _clearText(){
        let {rule} = this.props;
        if(rule !== undefined){
            if(rule.required){
                this.setState({
                    text:'',
                });
            }else{
                this.setState({
                    text:'',
                });
            }
        }else{
            this.setState({
                text:'',
            });
        }

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text:'',
            })
        }
    }

    renderClearTextBtn(){
        if(this.props.showClearTextBtn != false){
            if(this.state.text.length > 0){
                return (
                    <TouchableOpacity style={styles.clearText} onPress={()=>{this._clearText()}}>
                        <Ionicons color='#666' name='ios-trash' size={20}/>
                    </TouchableOpacity>
                )
            }
        }
    }

    renderIconStatus(status){
        if(status == 'pass'){
            return (
                <View style={styles.status}>
                    <Ionicons color='#4caf50' name='md-checkmark-circle' size={20}/>
                </View>
            )
        }
        // else if(status == 'fail'){
        //     return (
        //         <View style={styles.status}>
        //             <Ionicons color='#ff0000' name='md-close-circle' size={20}/>
        //         </View>
        //     )
        // }
    }

    // _checkRequired(){
    //     let {rule} = this.props;
    //     let {text} = this.state;
    //     let status = '';
    //
    //     if(rule){
    //         if(rule.required){
    //             if(text == ''){
    //                 status = 'fail'
    //                 this.setState({
    //                     status:status
    //                 })
    //             }else{
    //                 status = 'pass'
    //                 this.setState({
    //                     status:status
    //                 })
    //             }
    //         }
    //     }
    // }
    //
    // componentDidMount(){
    //     this._checkRequired();
    // }

    render() {
        let {status} = this.props;

        return (
            <View style={[styles.newInput,this.props.style,status=='fail'?styles.fail:'']}>
                <TextInput autoCapitalize="none" {...this.props} style={styles.inputText} value={this.state.text} autoCorrect={false} onChangeText={(text) => {this.setText(text)}} />

                {this.renderClearTextBtn()}
                {this.renderIconStatus(status)}
            </View>
        );
    }
}
export default NewInputPass;

let ruleFun={
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

const styles = {
    newInput: {
        flex:1,
        height: 30,
        flexDirection:'row',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#fff',
    },
    clearText:{
        justifyContent: 'center',
        marginRight:10
    },
    status:{
        justifyContent: 'center',
        marginRight:10
    },
    inputText: {
        flex:1,
        paddingLeft:5,
        color:'#363636',
        fontSize:14
    },
    fail:{
        borderColor:'#f00',
    }
}
