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
            data:{
                rows:[]
            },
            status:'',
            frontUser:{},
            payload:{
                pageSize:10,
                pageNo:1
            }
        };
    }

    _fetchData(status,payload){
        let params;

        let {navigation} = this.props;
        let {frontUser,data} = this.state;
        let url;
        if(navigation.state.params.type == 'xybg'){
            url = frontUser.type == 'F' ? Util.api.qyhcInfo : Util.api.grhcInfo;
            params = {
                idcard:frontUser.idcard,
                pageSize:payload.pageSize,
                pageNo:payload.pageNo
            }
        }else if(navigation.state.params.type == 'qyzb'){
            url = frontUser.type == 'F' ? Util.api.frzbList : Util.api.zrrzbList;
            params = {
                userIdcard:frontUser.idcard,
                pageSize:payload.pageSize,
                pageNo:payload.pageNo
            }
        }else if(navigation.state.params.type == 'jbxx'){
            url = Util.api.sxjbList;
            params = {
                userIdcard:frontUser.idcard,
                pageSize:payload.pageSize,
                pageNo:payload.pageNo
            }
        }

        Util.ajax.get(url, {params: params}).then((response) => {
            if(response.data.resultObj.code == 1000){
                let sourceData = response.data.data ? response.data.data : response.data.application;

                if(sourceData.rows.length == 0){
                    this.setState({
                        status:'noData'
                    })
                }else{
                    if(status == 'listLoadingHead'){
                        this.setState({
                            data:sourceData,
                            status:''
                        })
                    }else if(status == 'listLoadingFoot'){
                        let oldData = data;
                        let tempData = data;

                        // if(sourceData.rows.length < payload.pageSize){
                        //     this.setState({
                        //         status:'noData'
                        //     })
                        // }else{
                        //     newData.rows = oldData.rows.concat(sourceData.rows);
                        //     this.setState({
                        //         data:newData,
                        //         status:''
                        //     })
                        // }
                        tempData.rows = oldData.rows.concat(sourceData.rows);
                        this.setState({
                            data:tempData,
                            status:''
                        })
                    }
                }
            }
        }).catch((err) => {
            this.setState({
                status:'listLoadFail'
            })
        });
    }

    _headRefresh(){
        let status = 'listLoadingHead';
        this.setState({
            status:status,
            payload:{
                pageSize:10,
                pageNo:1
            }
        })

        this._fetchData(status,this.state.payload)
    }

    _footRefresh(){
        let {payload} = this.state;
        let newPayload = payload
        let status = 'listLoadingFoot';

        newPayload.pageNo = newPayload.pageNo + 1

        this.setState({
            status:status,
            payload:newPayload
        })

        this._fetchData(status,newPayload)
    }

    componentDidMount(){
        STORAGE.load({
            key:'frontUser',
        }).then(ret => {
            this.setState({
                frontUser:ret
            },()=>{
                this._headRefresh()
            })
        })
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
                            Linking.openURL(Util.domain+'/r/cms/www/credit/APP_PDFDown.html?id='+item.id+'&fileName='+item.applicant_unit+'').catch(err => console.error('打开下载链接出错', err));
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
                    onHeaderRefresh={()=>{this._headRefresh()}}
                    onFooterRefresh={()=>{this._footRefresh()}}

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
