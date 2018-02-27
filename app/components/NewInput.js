import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    "url":/^(\w+:\/\/)?\w+(\.\w+)+.*$/
*/

class NewInput extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state={
            status:'',
            text:this.props.defaultText ? this.props.defaultText : ''
        }
    }

    setText(text){
        this.setState({
            text:text
        });

        let {rule} = this.props;
        let status = '';
        //规则库
        if(rule){
            if(rule.test == 'email'){
                if(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text)){
                    status = 'pass'
                    this.setState({
                        status:status
                    })
                }else{
                    status = 'fail'
                    this.setState({
                        status:status
                    })
                }
            }else if(rule.test == 'phone'){
                if(/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/.test(text)){
                    status = 'pass'
                    this.setState({
                        status:status
                    })
                }else{
                    status = 'fail'
                    this.setState({
                        status:status
                    })
                }
            }else{
                if(rule.test.test(text)){
                    status = 'pass'
                    this.setState({
                        status:status
                    })
                }else{
                    status = 'fail'
                    this.setState({
                        status:status
                    })
                }
            }
        }

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text,status
            })
        }
    }

    _clearText(){
        this.setState({
            text:''
        });

        if(this.props.inputChange != undefined){
            this.props.inputChange({
                text:'',
                status:''
            })
        }
    }

    renderClearTextBtn(){
        if(this.state.text.length > 0){
            return (
                <TouchableOpacity style={styles.clearText} onPress={()=>{this._clearText()}}>
                    <Ionicons color='#666' name='ios-trash' size={20}/>
                </TouchableOpacity>
            )
        }
    }

    renderIconStatus(){
        let {status} = this.state;
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

    _checkRequired(){
        let {rule} = this.props;
        let {text} = this.state;
        let status = '';

        if(rule){
            if(rule.required){
                if(text == ''){
                    status = 'fail'
                    this.setState({
                        status:status
                    })
                }else{
                    status = 'pass'
                    this.setState({
                        status:status
                    })
                }
            }
        }
    }

    componentDidMount(){
        this._checkRequired();
    }

    render() {
        let {status} = this.state;
        return (
            <View style={[styles.newInput,this.props.style,status=='fail'?styles.fail:'']}>
                <TextInput autoCapitalize="none" {...this.props} style={styles.inputText} value={this.state.text} autoCorrect={false} onChangeText={(text) => {this.setText(text)}} />

                {this.renderClearTextBtn()}
                {this.renderIconStatus()}
            </View>
        );
    }
}
export default NewInput;

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
