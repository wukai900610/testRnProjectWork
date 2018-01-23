// import React from 'react';
// import {View, Text} from 'react-native';
//
// class aboutUs extends React.Component {
//
//     render() {
//         return (<View style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center'
//             }}>
//             <Text>关于我们</Text>
//         </View>);
//     }
// }
// export default aboutUs;

import React, {Component} from 'react'
import {View, StyleSheet, Text, Image, Platform} from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

const testData =  [
        {
            "rating": 4.6,
            "range": "150店通用",
            "mname": "吉野家",
            "title": "卤肉饭+乌龙茶（小）1份",
            "price": 10,
            "squareimgurl": "http://10.10.136.56:5050/r/cms/www/credit/img/scrollImg1.jpg",
        },
        {
            "rating": 4.4,
            "range": "北京等",
            "mname": "真功夫",
            "title": "冬(香)菇鸡腿肉饭\t+\t卤蛋1份",
            "price": 15,
            "squareimgurl": "http://p1.meituan.net/w.h/deal/15c8885d14f18774938a88752f08bb1e49194.jpg@118_0_466_466a%7C267h_267w_2e_90Q",
        },
        {
            "rating": 4.2,
            "range": "46店通用",
            "mname": "京八珍",
            "title": "50元代金券1张，可叠加",
            "price": 65,
            "squareimgurl": "http://p0.meituan.net/w.h/deal/d57d5f0644256a3013469edfc1406e8022163.jpg",
        },
        {
            "rating": 4.2,
            "range": "2店通用",
            "mname": "麻里麻里",
            "title": "2人餐，提供免费WiFi",
            "price": 78,
            "squareimgurl": "http://p0.meituan.net/w.h/deal/f436e044254128059f055f2275eadbb837054.jpg",
        },
        {
            "rating": 4.4,
            "range": "2店通用",
            "mname": "东来顺饭庄",
            "title": "4-5人套餐，百年老字号",
            "price": 168,
            "squareimgurl": "http://p0.meituan.net/w.h/deal/416d01cbc4b8a2871b3c260615b5998088199.jpg",
        },
        {

            "rating": 4.2,
            "range": "12店通用",
            "mname": "果麦de鲜饮创作",
            "title": "饮品3选1，提供免费WiFi",
            "price": 7.99,
            "squareimgurl": "http://p1.meituan.net/w.h/deal/d72d34a7038e8cca2d09406ec7dc5c83133480.jpg@0_297_1332_1332a%7C267h_267w_2e_90Q",
        },
        {
            "rating": 4,
            "range": "4店通用",
            "mname": "夹拣成厨麻辣烫",
            "title": "50元代金券1张，可叠加",
            "price": 39,
            "squareimgurl": "http://p1.meituan.net/w.h/deal/712801d4f3562706f596cd366376889f25073.jpg@71_0_444_444a%7C267h_267w_2e_90Q",
        },
        {
            "rating": 4.6,
            "range": "150店通用",
            "mname": "吉野家",
            "title": "卤肉饭+乌龙茶（小）1份",
            "price": 10,
            "squareimgurl": "http://p0.meituan.net/w.h/deal/5911c9d9235036c6fc11fcb1dbcb5bce27954.jpg@87_0_266_266a%7C267h_267w_2e_100Q",
        },
        {
            "rating": 4.4,
            "range": "北京等",
            "mname": "真功夫",
            "title": "冬(香)菇鸡腿肉饭\t+\t卤蛋1份",
            "price": 15,
            "squareimgurl": "http://p1.meituan.net/w.h/deal/15c8885d14f18774938a88752f08bb1e49194.jpg@118_0_466_466a%7C267h_267w_2e_90Q",
        },
        {
            "rating": 4.2,
            "range": "46店通用",
            "mname": "京八珍",
            "title": "50元代金券1张，可叠加",
            "squareimgurl": "http://p0.meituan.net/w.h/deal/d57d5f0644256a3013469edfc1406e8022163.jpg",
        },
        {
            "rating": 4.2,
            "range": "2店通用",
            "mname": "麻里麻里",
            "title": "2人餐，提供免费WiFi",
            "price": 78,
            "squareimgurl": "http://p0.meituan.net/w.h/deal/f436e044254128059f055f2275eadbb837054.jpg",
        },
        {
            "rating": 4.4,
            "range": "2店通用",
            "mname": "东来顺饭庄",
            "title": "4-5人套餐，百年老字号",
            "price": 168,
            "squareimgurl": "http://p0.meituan.net/w.h/deal/416d01cbc4b8a2871b3c260615b5998088199.jpg",
        },
        {

            "rating": 4.2,
            "range": "12店通用",
            "mname": "果麦de鲜饮创作",
            "title": "饮品3选1，提供免费WiFi",
            "price": 7.99,
            "squareimgurl": "http://p1.meituan.net/w.h/deal/d72d34a7038e8cca2d09406ec7dc5c83133480.jpg@0_297_1332_1332a%7C267h_267w_2e_90Q",
        },
        {
            "rating": 4,
            "range": "4店通用",
            "mname": "夹拣成厨麻辣烫",
            "title": "50元代金券1张，可叠加",
            "price": 39,
            "squareimgurl": "http://p1.meituan.net/w.h/deal/712801d4f3562706f596cd366376889f25073.jpg@71_0_444_444a%7C267h_267w_2e_90Q",
        },
    ];

class Demo extends Component {
    state: {
        dataList: Array<any>,
        refreshState: number,
    }

    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.onHeaderRefresh()
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})

        // 模拟网络请求
        setTimeout(() => {
            // 模拟网络加载失败的情况
            if (Math.random() < 0.1) {
                this.setState({refreshState: RefreshState.Failure})
                return
            }

            //获取测试数据
            let dataList = this.getTestList(true)

            this.setState({
                dataList: dataList,
                refreshState: RefreshState.Idle,
            })
        }, 1000)
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        console.log('onFooterRefresh');
        // 模拟网络请求
        setTimeout(() => {
            // 模拟网络加载失败的情况
            // if (Math.random() < 0.1) {
            //     this.setState({refreshState: RefreshState.Failure})
            //     return
            // }

            //获取测试数据
            let dataList = this.getTestList(false)

            this.setState({
                dataList: dataList,
                refreshState: dataList.length > 20 ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        }, 1000)
    }

    // 获取测试数据
    getTestList(isReload: boolean): Array<Object> {
        let newList = testData.map((data) => {
            return {
                imageUrl: data.squareimgurl,
                title: data.mname,
                subtitle: `[${data.range}]${data.title}`,
                price: data.price,
            }
        })
        return isReload ? newList : [...this.state.dataList, ...newList]
    }

    keyExtractor = (item: any, index: number) => {
        return index
    }

    renderCell = (info: Object) => {
        return <View>
            <Image source={{uri: info.item.imageUrl}} style={{width: 100, height: 100}} />
            <Text>{info.item.title}</Text>
            <Text>{info.item.subtitle}</Text>
            <Text>{info.item.price}</Text>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}

                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
})

export default Demo
