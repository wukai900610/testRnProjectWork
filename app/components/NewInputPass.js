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

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text
            })
        }
    }

    _clearText(){
        this.setState({
            text:'',
        });
        
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
