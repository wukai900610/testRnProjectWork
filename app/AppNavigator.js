import React from 'react';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import GsPage from './page/GsPage';
import GsListPage from './page/GsListPage';
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
            headerTitle: '信用公示',
            headerBackTitle:null,
            tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
                ? 'ios-person'
                : 'ios-person-outline'} size={26} style={{
                color: tintColor
            }}/>)
        },
        onTransitionStart: ()=>{
            console.log('导航栏切换开始1');
        },
        onTransitionEnd: ()=>{
            console.log('导航栏切换开始2'); 
        }
    },
    serviceHallPage: {
        screen: serviceHallPage,
        navigationOptions: {
            tabBarLabel: '服务大厅',
            headerTitle: '服务大厅',
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
                title: navigation.state.params.name,
                headerBackTitle:null,
            }
        }
    },
    ListPageWithTabBar: {
        screen: ListPageWithTabBar,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.name,
                headerBackTitle:null,
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
    GsListPage: {
        screen: GsListPage,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.title,
            }
        }
    },
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            title: '登陆',
            headerBackTitle:null,
        }
    },
    RegisterPage: {
        screen: RegisterPage,
        navigationOptions: {
            title: '注册',
            headerBackTitle:null,
        }
    }
});

export default AppNavigator;
