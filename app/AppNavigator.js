import React from 'react';
import {View, Text} from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './page/HomePage';
import AboutUs from './page/AboutUs';
import Details from './page/Details';

const RootTabs = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '金电智诚',
            title: '主页',
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-home'
                : 'ios-home-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            tabBarLabel: '关于我们',
            title: '关于我们',
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    }
});

const AppNavigator = StackNavigator({
    Home: {
        screen: RootTabs,
    },
    Details: {
        screen: Details
    }
});

export default AppNavigator;
