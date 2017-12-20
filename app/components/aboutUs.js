import React from 'react';
import {View, Text} from 'react-native';

class aboutUs extends React.Component {

    render() {
        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>关于我们</Text>
        </View>);
    }
}
export default aboutUs;
