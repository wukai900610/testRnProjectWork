import React from 'react';
import {View, Text, TextInput} from 'react-native';

import NewButton from '../components/newButton';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    render() {
        let { navigation } = this.props;
        return (
            <View style={styles.LoginPage}>
                <View style={styles.LoginInputBox}>
                    <View style={styles.LoginLabel}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="帐号"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                        />
                    </View>
                    <View style={styles.LoginLabel}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="密码"
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                </View>

                <NewButton title="登陆" style={styles.LoginBtn} textStyle={styles.LoginBtnText} onPress={()=>{console.log(123)}} />

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
        // alignItems: 'center',
        // justifyContent: 'center'
        backgroundColor:'#fff'
    },
    LoginInputBox: {
        marginBottom:20,
    },
    LoginLabel: {
        // marginBottom:10,
    },
    TextInput: {
        paddingLeft:10,
        alignItems: 'center',
        height: 40,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        color:'#333'
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
