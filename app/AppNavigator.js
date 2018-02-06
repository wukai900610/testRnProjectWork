import React from 'react';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import GsPage from './page/GsPage';
import serviceHallPage from './page/serviceHallPage';
import AboutPage from './page/AboutPage';
import ListPage from './page/ListPage';
import ListPageWithTabBar from './page/ListPageWithTabBar';
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
            tabBarLabel: '信用公示',
            title: '信用公示',
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
            title: '服务大厅',
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
    ListPage: {
        screen: ListPage,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.name
            }
        }
    },
    ListPageWithTabBar: {
        screen: ListPageWithTabBar,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.name
            }
        }
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
        }
    },
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            title: '登陆',
        }
    },
    RegisterPage: {
        screen: RegisterPage,
        navigationOptions: {
            title: '注册',
        }
    }
});

export default AppNavigator;
