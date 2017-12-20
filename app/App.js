import React from 'react';
import {View, Text} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './components/HomePage';
import aboutUs from './components/aboutUs';

const RootTabs = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '金电智诚',
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-home'
                : 'ios-home-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    Profile: {
        screen: aboutUs,
        navigationOptions: {
            tabBarLabel: '关于我们',
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    }
});

export default RootTabs;
