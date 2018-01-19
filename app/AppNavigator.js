import React from 'react';
import {View, Text} from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import AboutUs from './page/AboutUs';
import Details from './page/Details';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';

const RootTabs = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '金电智诚',
            title: '主页',
            header: null,
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-home'
                : 'ios-home-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    gsInfo: {
        screen: AboutUs,
        navigationOptions: {
            tabBarLabel: '公示信息',
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    serviceHall: {
        screen: AboutUs,
        navigationOptions: {
            tabBarLabel: '服务大厅',
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            tabBarLabel: '我们',
            title: '我们',
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
        screen: Details,
        // navigationOptions: {
        //   header: null,
        // }
    },
    SearchPage: {
        screen: SearchPage,
        // navigationOptions: {
        //   header: null,
        // }
    },
    LoginPage: {
        screen: LoginPage,
        // navigationOptions: {
        //   header: null,
        // }
    },
    RegisterPage: {
        screen: RegisterPage,
        // navigationOptions: {
        //   header: null,
        // }
    }
});

export default AppNavigator;
