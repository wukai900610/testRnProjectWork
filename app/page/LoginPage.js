import React from 'react';
import {View, Text} from 'react-native';

class LoginPage extends React.Component {

    render() {
        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>登陆</Text>
        </View>);
    }
}
export default LoginPage;
