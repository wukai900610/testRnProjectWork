import React from 'react';
import {
    View,
    Text
} from 'react-native';

import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import AwesomeAlert from 'react-native-awesome-alerts';
import DateFormat from 'moment';
import NewButton from '../components/NewButton';

import Util from '../libs/libs';

class TaskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                rows:[]
            },
            status:'',
            frontUser:{},
            payload:{
                rows:5,
                page:1
            },
            showAlert:{
                show:false,
                message:''
            }
        };
    }

    _hideAlert = () => {
        let {showAlert} = this.state
        showAlert.show = false

        this.setState({
            showAlert: showAlert
        });
    };

    _fetchData(status,payload){
        let {frontUser,data} = this.state;

        let params = {
            bindManagerId:frontUser.bindManagerId,
            rows:payload.rows,
            page:payload.page
        }

        Util.ajax.get(Util.api.taskList, {params: params}).then((response) => {
            let sourceData = response.data;
            // console.log(sourceData);
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
        }).catch((err) => {
            console.log(err);
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
                rows:10,
                page:1
            }
        })

        this._fetchData(status,this.state.payload)
    }

    _footRefresh(){
        let {payload} = this.state;
        let status = 'listLoadingFoot';

        payload.page = payload.page + 1

        this.setState({
            status:status,
            payload:payload
        })

        this._fetchData(status,payload)
    }

    renderTdHead(){
        return(
            <View style={styles.tr}>
                <Text style={styles.tdText}>申请时间</Text>
                <Text style={styles.tdText}>流程名称</Text>
                <Text style={styles.tdText}>业务名称</Text>
                <Text style={styles.tdText}>操作</Text>
            </View>
        )
    }

    renderItem = (info: Object) => {
        let item = info.item;

        let _this = this;
        function operate(item) {
            return (
                <NewButton title="我要审核" style={{backgroundColor:'#2795ee'}} textStyle={{color:'#fff'}} onPress={()=>{
                    if(item.yw_id2 == undefined){
                        let {showAlert} = _this.state
                        showAlert.show = true
                        showAlert.message = '评价报告请从PC端审核'

                        _this.setState({
                            showAlert: showAlert
                        });
                    }else{
                        _this.props.navigation.navigate('TaskDetailPage',{
                            taskId:item.taskId,
                            procId:item.proc_id,
                            tId:item.id,
                            yw_id2:item.yw_id2
                        });
                    }
                }} />
            )
        }

        return (
            <View style={styles.tr}>
                <Text style={styles.tdText}>
                    {DateFormat(item.taskCreateTime).format('YYYY-MM-DD')}
                </Text>
                <Text style={styles.tdText}>
                    {item.processDefinitionName}
                </Text>
                <Text style={styles.tdText}>
                    {item.yw_name}
                </Text>
                <View style={styles.tdView}>
                    {operate(item)}
                </View>
            </View>
        )
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

    render() {
        let {status,data,showAlert} = this.state;

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
            <View style={styles.TaskPage}>
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

                <AwesomeAlert
                    show={showAlert.show}
                    showProgress={false}
                    // title="标题"
                    message={showAlert.message}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    // showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="取消"
                    confirmText="确定"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        // this._hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this._hideAlert();
                    }}
                />
            </View>
        )
    }
}

export default TaskPage;

const styles = {
    TaskPage: {
        flex:1,
        backgroundColor:'#fff'
    },
    tr: {
        flexDirection:'row',
        marginBottom:1,
        padding:10
    },
    tdView: {
        flex:1,
        padding:5,
        justifyContent: 'center',
    },
    tdText: {
        flex:1,
        padding:5,
        textAlign:'center'
    }
}
