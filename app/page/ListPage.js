import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    FlatList,
    Image,
    Platform
} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

import { connect } from 'react-redux';
import { ajaxListPageData } from '../actions/actions';

import DateFormat from 'moment';
import Util from '../libs/libs';

let first = 0;
class ListPage extends React.Component {
    constructor(props) {
        super(props)

        const {navigation} = this.props;
        const params = navigation.state.params;

        this.state = {
            navigation:navigation,
            payload:{
                channelIds: params.channelId,
                count: 10,
                first: first
            }
        }
    }

    _headRefresh = () => {
        const { navigation, payload } = this.state;
        const params = navigation.state.params;
        this._fetchData(payload,'refresh')

        first = 0;
    }

    _footRefresh = () => {
        const { navigation, payload } = this.state;
        const params = navigation.state.params;

        first = first + 10;

        this._fetchData({
            ...payload,
            first
        },'loadMore')
    }

    _fetchData(obj,type){
        const { dispatch } = this.props;

        dispatch(ajaxListPageData(Util.api.list,obj,type));
    }

    _goToPage(detailItem){
        this.props.navigation.navigate("DetailPage",detailItem);
    }

    renderItem = (info: Object) => {
        let item = info.item;
        return (
            <TouchableOpacity id={item.id} onPress={()=>{this._goToPage(item)}} style={styles.newsBoxItemBox}>
                <Text style={styles.newsBoxItemChannel}>
                    [{item.channel}]
                </Text>
                <Text style={styles.newsBoxItemTitle}>
                    {Util.strSplit(item.title,20)}
                </Text>
                <View style={styles.newsBoxItemDate}>
                    <Text style={styles.newsBoxItemDateText}>
                        {DateFormat(item.releaseDate).format('YYYY-MM-DD')}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        const { navigation } = this.state;
        const params = navigation.state.params;

        if(!params.hasChild){
            this._headRefresh();
        }
    }

    componentWillUnmount(){
        first = 0;
    }

    render() {
        const { listPage } = this.props;

        let refreshState;
        if(listPage.status == 'listLoadingHead'){
            refreshState = RefreshState.HeaderRefreshing;
        }else if(listPage.status == 'listLoadingFoot'){
            refreshState = RefreshState.FooterRefreshing;
        }else if(listPage.status == 'listLoadFail'){
            refreshState = RefreshState.Failure;
        }else if(listPage.status == 'noData'){
            refreshState = RefreshState.NoMoreData;
        }else{
            refreshState = RefreshState.Idle;
        }

        return (
            <View style={styles.listPage}>
                <RefreshListView
                    data={listPage.listPageData.data}
                    keyExtractor={(item: any, index: number) => {
                        return index
                    }}
                    renderItem={this.renderItem}
                    refreshState={refreshState}
                    onHeaderRefresh={this._headRefresh}
                    onFooterRefresh={this._footRefresh}

                    // 可选
                    footerRefreshingText= '数据加载中...'
                    footerFailureText = '数据加载失败'
                    footerNoMoreDataText= '-没有数据-'
                />
            </View>
        )
    }
}
function mapStateToProps(state) {
    const {listPage} = state;

    return {
        listPage
    }
}

export default connect(mapStateToProps)(ListPage);

const styles = {
    listPage: {
        flex: 1,
        backgroundColor:'#fff',
        padding:10,
        // marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    newsBoxItemBox: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        height:40,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    newsBoxItemChannel: {
        paddingRight:5,
        color: '#426fee',
        fontWeight: 'bold',
        fontSize: 14
    },
    newsBoxItemTitle: {
        color: '#293c55',
        fontSize: 16
    },
    newsBoxItemDate: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height:40,
    },
    newsBoxItemDateText: {
        color: '#333745',
        fontSize: 10
    }
    // title: {
    //     fontSize: 18,
    //     height: 84,
    //     textAlign: 'center'
    // }
}
// const styles = {
//     listPage:{
//         flex: 1,
//         backgroundColor:'#fff',
//         padding:10,
//     },
//     newsBoxItemBox: {
//         flex:1,
//         alignItems: 'center',
//         flexDirection: 'row',
//         height:40,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f1f1f1'
//     },
//     newsBoxItemChannel: {
//         paddingRight:5,
//         color: '#426fee',
//         fontWeight: 'bold',
//         fontSize: 14
//     },
//     newsBoxItemTitle: {
//         color: '#293c55',
//         fontSize: 16
//     },
//     newsBoxItemDate: {
//         flex:1,
//         alignItems: 'flex-end',
//         justifyContent: 'center',
//         height:40,
//     },
//     newsBoxItemDateText: {
//         color: '#333745',
//         fontSize: 10
//     }
// }
