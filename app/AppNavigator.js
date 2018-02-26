import React from 'react';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import GsPage from './page/GsPage';
import GsListPage from './page/GsListPage';
import HhbListPageWithTabBar from './page/HhbListPageWithTabBar';
import GsDetailPage from './page/GsDetailPage';
import serviceHallPage from './page/serviceHallPage';
import AboutPage from './page/AboutPage';
import ListPage from './page/ListPage';
import ListPageWithTabBar from './page/ListPageWithTabBar';
import NewsDetailPage from './page/NewsDetailPage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import FindPassPage from './page/FindPassPage';

import Util from './libs/libs';

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
},{
    // lazy:false,
    // initialRouteName:'HomePage'
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
    NewsDetailPage: {
        screen: NewsDetailPage,
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
    HhbListPageWithTabBar: {
        screen: HhbListPageWithTabBar,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.title,
            }
        }
    },
    GsDetailPage: {
        screen: GsDetailPage,
        navigationOptions: {
            title: '详情'
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
    },
    FindPassPage: {
        screen: FindPassPage,
        navigationOptions: {
            title: '找回密码',
            headerBackTitle:null,
        }
    }
},{
    initialRouteName:'FindPassPage',
    onTransitionStart: (current,prev)=>{
        let index = current.scene.route.index;
        // console.log(current);
        // console.log(current.scene.route.routeName);
        // console.log(current.scene.route.routes[index].routeName);

        if(current.scene.route.routeName == 'RootTabs'){
            if(current.scene.route.routes[index].routeName == 'AboutPage'){
                // Util.checkLogin(current.navigation)
            }
        }
    },
    // onTransitionEnd: ()=>{
    //     console.log('导航栏切换结束');
    // }
});

export default AppNavigator;
