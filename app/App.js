import React, {Component} from 'react'
import {Provider} from 'react-redux'

import store from './store/store'
import AppNavigator from './AppNavigator'

import Storage from 'react-native-storage';
import { AsyncStorage, BackHandler, ToastAndroid, Platform } from 'react-native';
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')
});
global.STORAGE = storage;

export default class App extends Component {
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            BackHandler.exitApp()
            return false
        }
        this.lastBackPressed = Date.now()
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
        return true
    };

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
        }
    }

    render () {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}
