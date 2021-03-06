import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableHighlight,
    FlatList,
    Image,
    Platform
} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';

import { ajaxListPageData } from '../actions/actions';

import DateFormat from 'moment';
import Immutable from 'immutable';
import Util from '../libs/libs';

class NewsList extends React.Component {
    constructor(props) {
        super(props)
    }

    _headRefresh = () => {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = params ? listPage['listPage'+params.channelId] : listPage['listPageSearch'];

        let {payload} = thisListPage;

        this._fetchData(payload,'refresh')
    }

    _footRefresh = () => {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = params ? listPage['listPage'+params.channelId] : listPage['listPageSearch'];
        let {payload} = thisListPage;

        this._fetchData(payload,'loadMore')
    }

    _fetchData(obj,type){
        const { dispatch } = this.props;

        dispatch(ajaxListPageData(Util.api.list,obj,type));
    }

    _goToPage(detailItem){
        const { navigation } = this.props;

        navigation.navigate("NewsDetailPage",detailItem);
    }

    renderItem = (info: Object) => {
        let item = info.item;
        return (
            <TouchableHighlight id={item.id} underlayColor="#f1f1f1" activeOpacity={0.35} onPress={()=>{this._goToPage(item)}}>
                <View style={styles.newsBoxItemBox}>
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
                </View>
            </TouchableHighlight>
        )
    }

    componentDidMount() {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = params ? listPage['listPage'+params.channelId] : listPage['listPageSearch'];

        if(thisListPage.listPageData.data.length == 0 && params){//搜索页默认不显示数据
            this._headRefresh();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let _props = Immutable.fromJS(this.props)
        let _nextProps = Immutable.fromJS(nextProps)
        if(Immutable.is(_props,_nextProps)){
            return false;
        }

        return true;
    }

    render() {
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = params ? listPage['listPage'+params.channelId] : listPage['listPageSearch'];

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
                    ItemSeparatorComponent={() => <View style={{height:1,backgroundColor:'#f1f1f1'}}></View>}
                    renderItem={this.renderItem}
                    refreshState={refreshState}
                    onHeaderRefresh={this._headRefresh}
                    onFooterRefresh={this._footRefresh}

                    getItemLayout={(data, index) => (
                        //优化
                        {length: 40, offset: 40 * index, index}
                    )}

                    // 可选
                    footerRefreshingText= '数据加载中...'
                    footerFailureText = '数据加载失败'
                    footerNoMoreDataText= '-没有数据-'
                />
            </View>
        )
    }
}

export default NewsList

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
        // borderBottomWidth: 1,
        // borderBottomColor: '#f1f1f1'
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
