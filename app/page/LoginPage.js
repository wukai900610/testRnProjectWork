import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    render() {
        return (
            <View style={styles.LoginPage}>
                <View style={styles.LoginBox}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="帐号"
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.LoginBox}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="密码"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                </View>
                <Button color="#007fff" title="登陆" style={styles.loginBtn} onPress={()=>{}} />
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
    },
    LoginBox: {
        marginBottom:20,
    },
    TextInput: {
        paddingLeft:10,
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color:'#999'
    },
    loginBtn: {
        alignItems: 'center',
        height: 40,
        backgroundColor: '#007fff'
    }
}
