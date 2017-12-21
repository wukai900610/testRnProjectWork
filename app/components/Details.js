import React from 'react';
import {View, Text} from 'react-native';

class Details extends React.Component {

    render() {
        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>这是详情页</Text>
        </View>);
    }
}
export default Details;
