import React from 'react';
import {
    View,
    Text,
    Linking
} from 'react-native';

import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import NewButton from '../components/NewButton';

import Util from '../libs/libs';

class serviceHallPageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            status:''
        };
    }

    _fetchData(){
        let payload = {
            userIdcard:'342224199011200490',
            pageSize:12,
            pageNo:1
        }

        this.setState({
            status:'listLoadingHead'
        })

        let {navigation} = this.props;
        let url;
        if(navigation.state.params.type == 'xybg'){
            url = Util.api.qyhcInfo;
        }else if(navigation.state.params.type == 'qyzb'){
            url = Util.api.frzbList;
        }else if(navigation.state.params.type == 'jbxx'){
            url = Util.api.sxjbList;
        }
        Util.ajax.get(url, {params: payload}).then((response) => {
            if(response.data.resultObj.code == 1000){
                this.setState({
                    data:response.data.data ? response.data.data : response.data.application,
                    status:''
                })
            }
        }).catch((err) => {
            this.setState({
                status:'listLoadFail'
            })
        });
    }

    componentDidMount(){
        this._fetchData()
    }

    renderTdHead(){
        let {navigation} = this.props;
        if(navigation.state.params.type == 'xybg'){
            return(
                <View style={styles.tr}>
                    <Text style={styles.tdText}>申请时间</Text>
                    <Text style={styles.tdText}>经办时间</Text>
                    <Text style={styles.tdText}>状态</Text>
                    <Text style={styles.tdText}>下载文件</Text>
                </View>
            )
        }else if(navigation.state.params.type == 'qyzb' || navigation.state.params.type == 'jbxx'){
            return(
                <View style={styles.tr}>
                    <Text style={styles.tdText}>申请时间</Text>
                    <Text style={styles.tdText}>经办时间</Text>
                    <Text style={styles.tdText}>状态</Text>
                </View>
            )
        }
    }

    renderItem = (info: Object) => {
        let item = info.item;

        let {navigation} = this.props;
        if(navigation.state.params.type == 'xybg'){
            let status;
            let manager_date = item.manager_date;
            if (item.status == 'S') {
                status = '审核中';
                manager_date = '';
            } else if (item.status == 'Y') {
                status = '已审核';
            } else if (item.status == 'N') {
                status = '未通过';
            }

            function isDownload(item) {
                if(item.status == 'Y'){
                    return (
                        <NewButton title="下载" onPress={()=>{
                            // Linking.openURL('http://10.10.136.144:8080/downPDF.html?id='+item.id+'&applicant_unit='+item.applicant_unit+'').catch(err => console.error('An error occurred', err));
                            Linking.openURL('http://10.10.136.144:8080/r/cms/www/aaa.html?id='+item.id+'&applicant_unit='+item.applicant_unit+'').catch(err => console.error('An error occurred', err));
                        }} />
                    )
                }else{
                    return (
                        <NewButton title="--" />
                    )
                }
            }

            return (
                <View style={styles.tr}>
                    <Text style={styles.tdText}>
                        {item.applicat_date}
                    </Text>
                    <Text style={styles.tdText}>
                        {manager_date}
                    </Text>
                    <Text style={styles.tdText}>
                        {status}
                    </Text>
                    <View style={styles.tdView}>
                        {isDownload(item)}
                    </View>
                </View>
            )
        }else if(navigation.state.params.type == 'qyzb'){
            let status;
            let manager_date = item.finishTime;
            if (item.is_checked == 'S') {
                status = '审核中';
                manager_date = '';
            } else if (item.is_checked == 'Y') {
                status = '已通过';
            } else if (item.is_checked == 'N') {
                status = '未通过';
            }
            return (
                <View style={styles.tr}>
                    <Text style={styles.tdText}>
                        {item.createdTime}
                    </Text>
                    <Text style={styles.tdText}>
                        {manager_date}
                    </Text>
                    <Text style={styles.tdText}>
                        {status}
                    </Text>
                </View>
            )
        }else if(navigation.state.params.type == 'jbxx'){
            var status;
            var manager_date = item.finishTime;
            if (item.status == 'S') {
                status = '审核中';
                manager_date = '';
            } else if (item.status == 'Y') {
                status = '已审核';
            } else if (item.status == 'N') {
                status = '未通过';
            }
            return (
                <View style={styles.tr}>
                    <Text style={styles.tdText}>
                        {item.createdTime}
                    </Text>
                    <Text style={styles.tdText}>
                        {manager_date}
                    </Text>
                    <Text style={styles.tdText}>
                        {status}
                    </Text>
                </View>
            )
        }else{
            return (
                <View style={styles.tr}>

                </View>
            )
        }
    }

    render() {
        let {status,data} = this.state;

        let refreshState;
        if(status == 'listLoadingHead'){
            refreshState = RefreshState.HeaderRefreshing;
        }else if(status == 'listLoadingFoot'){
            refreshState = RefreshState.FooterRefreshing;
        }else if(status == 'listLoadFail'){
            refreshState = RefreshState.Failure;
        }else if(status == 'noData'){
            refreshState = RefreshState.NoMoreData;
        }else{
            refreshState = RefreshState.Idle;
        }
        return (
            <View style={styles.serviceHallPageList}>
                {this.renderTdHead()}

                <RefreshListView
                    data={data.rows}
                    keyExtractor={(item: any, index: number) => {
                        return index
                    }}
                    ItemSeparatorComponent={() => <View style={{height:1,backgroundColor:'#f1f1f1'}}></View>}
                    renderItem={this.renderItem}
                    refreshState={refreshState}
                    onHeaderRefresh={()=>{this._fetchData()}}
                    // onFooterRefresh={this._footRefresh}

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

export default serviceHallPageList;

const styles = {
    serviceHallPageList: {
        flex:1,
        padding:10,
        backgroundColor:'#fff'
    },
    tr: {
        flexDirection:'row',
        marginBottom:1
    },
    tdView: {
        flex:1,
        backgroundColor:'#efefef'
    },
    tdText: {
        flex:1,
        padding:5,
        textAlign:'center'
    }
}
