import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';

const Screen = ({navigation}) => (<View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
    <Button onPress={() => navigation.navigate('Details')} title="跳转到详情"/>
</View>);

const ScreenDetail = () => (<View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
    <Text>详情页</Text>
</View>);

const HomePage = StackNavigator({
    Home: {
        screen: Screen,
        navigationOptions: {
            headerTitle: '主页'
        }
    },
    Details: {
        screen: ScreenDetail,
        navigationOptions: {
            headerTitle: '详情页'
        }
    }
});

export default HomePage;
