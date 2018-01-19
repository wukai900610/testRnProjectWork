import React from 'react';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import GsPage from './page/GsPage';
import serviceHallPage from './page/serviceHallPage';
import AboutPage from './page/AboutPage';
import DetailPage from './page/DetailPage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';

const RootTabs = TabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '主页',
            header: null,
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-home'
                : 'ios-home-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    GsPage: {
        screen: GsPage,
        navigationOptions: {
            tabBarLabel: '公示信息',
            header: null,
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    serviceHallPage: {
        screen: serviceHallPage,
        navigationOptions: {
            tabBarLabel: '服务大厅',
            header: null,
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            tabBarLabel: '我的',
            header: null,
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        }
    }
});

const AppNavigator = StackNavigator({
    RootTabs: {
        screen: RootTabs,
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            title: '详情'
        }
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            title: '搜索'
          // header: null,
        }
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
