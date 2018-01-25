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
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';

import { ajaxListPageData } from '../actions/actions';

import DateFormat from 'moment';
import Util from '../libs/libs';

let first = 0;
class List extends React.Component {
    constructor(props) {
        super(props)
    }

    _headRefresh = () => {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+params.channelId];
        let {payload} = thisListPage;

        this._fetchData(payload,'refresh')

        first = 0;
    }

    _footRefresh = () => {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+params.channelId];
        let {payload} = thisListPage;

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
        const { navigation } = this.props;

        navigation.navigate("DetailPage",detailItem);
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
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+params.channelId];

        if(thisListPage.listPageData.data.length == 0){
            this._headRefresh();
        }
    }

    componentWillUnmount(){
        first = 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps === this.props){
            return false;
        }else{
            return true;
        }
    }

    render() {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+params.channelId];

        let refreshState;
        if(thisListPage){
            if(thisListPage.status == 'listLoadingHead'){
                refreshState = RefreshState.HeaderRefreshing;
            }else if(thisListPage.status == 'listLoadingFoot'){
                refreshState = RefreshState.FooterRefreshing;
            }else if(thisListPage.status == 'listLoadFail'){
                refreshState = RefreshState.Failure;
            }else if(thisListPage.status == 'noData'){
                refreshState = RefreshState.NoMoreData;
            }else{
                refreshState = RefreshState.Idle;
            }
        }

        return (
            <View style={styles.listPage}>
                <RefreshListView
                    data={thisListPage.listPageData.data}
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

export default List

const styles = {
    listPage: {
        flex: 1,
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:10,
        // marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    newsBoxItemBox: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
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
}
