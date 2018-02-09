import React from 'react';
import {View, Text, TextInput} from 'react-native';

import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    login(){
        let username = this.username.state.text;
        let password = this.password.state.text;
    }

    render() {
        let { navigation } = this.props;
        return (
            <View style={styles.LoginPage}>
                <View style={styles.LoginInputBox}>
                    <View style={styles.LoginLabel}>
                        <NewInput placeholder="帐号" ref={(e) => {this.username = e;}} style={styles.TextInput} />
                    </View>
                    <View style={styles.LoginLabel}>
                        <NewInput placeholder="密码" ref={(e) => {this.password = e;}} style={styles.TextInput} />
                    </View>
                </View>

                <NewButton title="登陆" style={styles.LoginBtn} textStyle={styles.LoginBtnText} onPress={()=>{this.login()}} />

                <View style={styles.LoginButtom}>
                    <NewButton title="注册" onPress={()=>{navigation.navigate('RegisterPage')}} />

                    <NewButton title="忘记密码" onPress={()=>{console.log('忘记密码')}} />
                </View>

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
    LoginLabel: {
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
