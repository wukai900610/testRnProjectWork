import React from 'react';
import {
    TouchableOpacity,
    Image,
    PixelRatio
} from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchPage from './page/SearchPage';
import HomePage from './page/HomePage';
import GsPage from './page/GsPage';
import GsListPage from './page/GsListPage';
import HhbListPageWithTabBar from './page/HhbListPageWithTabBar';
import GsDetailPage from './page/GsDetailPage';
import ServiceHallPage from './page/ServiceHallPage';
import ServiceHallPageList from './page/ServiceHallPageList';
import TaskPage from './page/TaskPage';
import TaskDetailPage from './page/TaskDetailPage';
import AboutPage from './page/AboutPage';
import ListPage from './page/ListPage';
import ListPageWithTabBar from './page/ListPageWithTabBar';
import NewsDetailPage from './page/NewsDetailPage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import FindPassPage from './page/FindPassPage';
import Certification from './page/Certification';
import ModifyPass from './page/ModifyPass';
import Other from './page/DefaultComponent';

import Util from './libs/libs';

const RootTabs = TabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '主页',
            header: null,
            // tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
            //     ? 'ios-home'
            //     : 'ios-home-outline'} size={26} style={{
            //     color: tintColor
            // }}/>)
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./images/home.png') : require('./images/home-outline.png')} style={styles.tabIco} />
                )
            }
        }
    },
    GsPage: {
        screen: GsPage,
        navigationOptions: {
            tabBarLabel: '信用公示',
            headerTitle: '信用公示',
            headerBackTitle:null,
            headerLeft:null,
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./images/xygs.png') : require('./images/xygs-outline.png')} style={styles.tabIco} />
                )
            }
        }
    },
    ServiceHallPage: {
        screen: ServiceHallPage,
        navigationOptions: {
            tabBarLabel: '服务大厅',
            headerTitle: '服务大厅',
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./images/serviceHall.png') : require('./images/serviceHall-outline.png')} style={styles.tabIco} />
                )
            }
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            tabBarLabel: '我的',
            header: null,
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Image source={focused ? require('./images/about.png') : require('./images/about-outline.png')} style={styles.tabIco} />
                )
            }
        }
    }
},{
    // lazy:false,
    // initialRouteName:'HomePage'
    tabBarPosition: 'bottom',
    tabBarOptions: {
        // style: {
        //     height:49
        // },
        // 安卓
        showIcon:true,
        activeTintColor:'#008ff2',
        inactiveTintColor:'#999',
        indicatorStyle:{
            height:0
        },
        style:{
            backgroundColor:'#f7f7f7'
        }
        // inactiveBackgroundColor:'#f00',
        // activeBackgroundColor:'#fff',
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
        navigationOptions: ({navigation,screenProps}) => {
            if(navigation.state.params){
                if(navigation.state.params.from == 'ServiceHallPage'){
                    return {
                        title: '登陆',
                        headerBackTitle:null,
                        headerLeft:function () {
                            return (
                                <TouchableOpacity style={{marginLeft:10}} onPress={()=>{navigation.navigate('RootTabs');}}>
                                    <Ionicons name='ios-arrow-back-outline' color="#0e6aff" size={33}/>
                                </TouchableOpacity>
                            )
                        }
                    }
                }
            }else{
                return {
                    title: '登陆',
                    headerBackTitle:null
                }
            }
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
            title: '重置密码',
            headerBackTitle:null,
        }
    },
    Certification: {
        screen: Certification,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.title,
                headerBackTitle:null,
            }
        }
    },
    ModifyPass: {
        screen: ModifyPass,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.name,
                headerBackTitle:null,
            }
        }
    },
    ServiceHallPageList: {
        screen: ServiceHallPageList,
        navigationOptions: ({navigation,screenProps}) => {
            return {
                title: navigation.state.params.name,
                headerBackTitle:null,
            }
        }
    },
    TaskPage: {
        screen: TaskPage,
        navigationOptions: {
            title: '我的审批',
            headerBackTitle:null,
        }
    },
    TaskDetailPage: {
        screen: TaskDetailPage,
        navigationOptions: {
            title: '审批详情',
            headerBackTitle:null,
        }
    },
    Other: {
        screen: Other,
        navigationOptions: {
            title: '其他'
        }
    }
},{
    initialRouteName:'TaskPage',
    onTransitionStart: (current,prev)=>{
        let index = current.scene.route.index;
// console.log(current);
        if(current.scene.route.routeName == 'RootTabs'){
            if(current.scene.route.routes[index].routeName == 'ServiceHallPage'){
                Util.checkUserState(current.navigation)
            }else if(current.scene.route.routes[index].routeName == 'AboutPage'){
                // Util.checkUserState(current.navigation)
            }
        }
    },
    // onTransitionEnd: ()=>{
    //     console.log('导航栏切换结束');
    // }
});

const styles = {
    tabIco:{
        width:48 / PixelRatio.get(),
        height: 48 / PixelRatio.get()
    }
}

export default AppNavigator;
