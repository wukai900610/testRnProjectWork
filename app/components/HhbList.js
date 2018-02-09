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

import { ajaxHhbListPageData } from '../actions/actions';

import Immutable from 'immutable';
import Util from '../libs/libs';

class HhbList extends React.Component {
    constructor(props) {
        super(props)
    }

    _headRefresh = () => {
        const { hhbListPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = hhbListPage[params.type];
        let {payload} = thisListPage;

        this._fetchData(payload,'refresh')
    }

    _footRefresh = () => {
        const { hhbListPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = hhbListPage[params.type];
        let {payload} = thisListPage;

        this._fetchData(payload,'loadMore')
    }

    _fetchData(obj,type){
        const { dispatch } = this.props;
        let url;
        if(obj.typeName == 'frhonmd' || obj.typeName == 'zzrhonmd'){
            url = Util.api.lhjc_hob;
        }else{
            url = Util.api.lhjc_heib;
        }

        dispatch(ajaxHhbListPageData(url,obj,type));
    }

    _goToPage(detailItem){
        const { navigation } = this.props;
        let params = navigation.state.params;

        navigation.navigate("GsDetailPage",{detail:detailItem,type:params.type});
    }

    renderItem = (info: Object) => {
        const { navigation } = this.props;
        let params = navigation.state.params;
        let item = info.item;

        let title;
        if(params.type == 'frhonmd' || params.type == 'frheimd'){
            title = item.qymc;
        }else{
            title = item.xm;
        }

        return (
            <TouchableHighlight id={item.id} underlayColor="#f1f1f1" activeOpacity={0.35} onPress={()=>{this._goToPage(item)}}>
                <View style={styles.newsBoxItemBox}>
                    <View style={styles.newsBoxItemTitle}>
                        <Text style={styles.newsBoxItemChannel}>
                            [{title}]
                        </Text>
                        <View style={styles.newsBoxItemDate}>
                            <Text style={styles.newsBoxItemDateText}>
                                {item.lrmdsj}
                            </Text>
                        </View>
                    </View>
                    <Text>
                        {Util.strSplit(item.sy,35)}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    componentDidMount() {
        const { hhbListPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = hhbListPage[params.type];

        if(thisListPage.listPageData.list.length == 0){
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
        const { hhbListPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = hhbListPage[params.type];

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
                    data={thisListPage.listPageData.list}
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

export default HhbList

const styles = {
    listPage: {
        flex: 1,
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:10,
        // marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    newsBoxItemBox: {
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
    },
    newsBoxItemTitle: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        height:30,
    },
    newsBoxItemChannel: {
        paddingRight:5,
        color: '#426fee',
        fontWeight: 'bold',
        fontSize: 14
    },
    newsBoxItemDate: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height:30,
    },
    newsBoxItemDateText: {
        color: '#333745',
        fontSize: 10
    }
}
