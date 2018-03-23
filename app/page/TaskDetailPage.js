import React from 'react';
import {
    View,
    Alert
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewInput from '../components/NewInput';
import NewButton from '../components/NewButton';
import NewPick from '../components/NewPick';

import Util from '../libs/libs';

let condition;
class TaskDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload:{
                rows:5,
                page:1
            },
            pick:{
                selectedIndex:0,
                data:[],
                visible:false
            },
            getOutgoings:[],
            // comment:'',
            presentation:[],
            showAlert:{
                show:false,
                message:'',
                showCancelButton:false,
                showConfirmButton:true
            }
        };
    }

    _myStep1(){
        let {navigation} = this.props;
        let {params}=navigation.state;
        let {getOutgoings} = this.state;

        Util.ajax.get(Util.api.getOutgoings, {params: {taskId:params.taskId}}).then((response) => {
            // console.log('getOutgoings');
            // console.log(response);

            if(typeof(response.data) == 'object' && response.data.length > 0){
                this.setState({
                    getOutgoings:response.data
                })
            }
        }).catch((err) => {
            // console.log('getOutgoings');
            // console.log(err);
            this.setState({
                getOutgoings:[]
            })
        });
    }

    _myStep2(type){
        let {navigation} = this.props;
        let {params}=navigation.state;
        let {getOutgoings,comment} = this.state;
        let url,payload;
        let candidateGroup,newGetOutgoings;

        if(!(comment && comment !='')){
            Alert.alert(
                '提示',
                '请填写意见！',
                [
                    {text: '确认'},
                ],
                { cancelable: false }
            )
            return false;
        }

        getOutgoings.map((item,index)=>{
            if(item.outGoing == type){
                candidateGroup = getOutgoings[index].candidateGroup;
            }
        });

        candidateGroup = (candidateGroup == undefined) ? '' : candidateGroup;
// console.log('dddd:'+candidateGroup);
        if(candidateGroup == ''){

        }else if(candidateGroup=='owner'){
            url = Util.api.wfowener;
            payload = {
                recordId : params.yw_id2
            }
        }else{
            url = Util.api.wflist;
            payload = {
                kys : candidateGroup
            }
        }

        // console.log('candidateGroup:'+candidateGroup);
        // console.log('url:'+url);
        // console.log('payload:'+payload);
        // //
        // return false;
        if(url && url != ''){
            Util.ajax.get(url, {params: payload}).then((response) => {
                // console.log('presentation');
                // console.log(response.data);
                let presentation = response.data;

                if(presentation.length > 0){
                    let newPresentation=[];
                    presentation.map((item,index)=>{
                        newPresentation.push({
                            value:item.id,
                            name:item.realName,
                            kys:item.kys,
                        })
                    })
                    let {pick} = this.state;
                    pick.visible = true;
                    pick.data = newPresentation;
                    this.setState({
                        presentation:newPresentation,
                        pick:pick
                    })
                }
            }).catch((err) => {
                console.log('presentation');
                console.log(err);
            });
        }else{
            this._myStep3();
        }
    }

    _myStep3 = () => {
        let {navigation} = this.props;
        let {params}=navigation.state;
        let {comment,pick,showAlert,frontUser} = this.state;
        // let newGetOutgoings;
        //判断是否有下级用户
        let selectedItem = pick.data.length > 0 ? pick.data[pick.selectedIndex] : {};

        Util.ajax.get(Util.api.examineTask, {params: {
            taskId:params.taskId,
            procId:params.procId,
            tId:params.tId,
            comment:comment,
            userId:selectedItem.value && selectedItem !='' ?selectedItem.value : '',
            paramName:condition.paramName,
            paramValue:condition.paramValue,
            bindManagerId:frontUser.bindManagerId
        }}).then((response) => {
            // console.log('examineTask');
            // console.log(response);

            if(response.data.code == 1000){
                showAlert.showCancelButton = false;
                showAlert.showConfirmButton = true;
            }else{
                showAlert.showCancelButton = true;
                showAlert.showConfirmButton = false;
            }
            showAlert.show = true;
            showAlert.message = response.data.mess;
            this.setState({
                showAlert:showAlert
            })
        }).catch((err) => {
            // console.log('examineTask');
            // console.log(err);
            showAlert.show = true;
            showAlert.message = '网络出错';
            this.setState({
                showAlert:showAlert
            })
        });
    };

    renderButton(){
        let {getOutgoings,showAlert} = this.state;

        if(getOutgoings && getOutgoings.length > 0){
            let btnArr = [];
            let itemStyle={};
            getOutgoings.map((item,index)=>{
                if(index == 0){
                    itemStyle = {marginRight:20};
                }

                if(item.outGoing == '审核通过'){
                    btnArr.push(<NewButton key={index} style={[{backgroundColor:'#2795ee'},itemStyle]} textStyle={{color:'#fff'}} title={item.outGoing} onPress={(e)=>{
                        condition = item.condition;
                        this._myStep2(item.outGoing)
                    }} />)

                }else{
                    btnArr.push(<NewButton key={index} style={[{backgroundColor:'#c30c22'},itemStyle]} textStyle={{color:'#fff'}} title={item.outGoing} onPress={(e)=>{
                        condition = item.condition;
                        this._myStep2(item.outGoing)
                    }} />)
                }
            });

            return (
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                    {btnArr}
                </View>
            )
        }
    }

    componentDidMount(){
        STORAGE.load({
            key:'frontUser',
        }).then(ret => {
            this.setState({
                frontUser:ret
            },()=>{
                this._myStep1();
            })
        })
    }

    render() {
        let {navigation} = this.props;
        let {showAlert,pick} = this.state;

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.TaskDetailPage}>
                    <View style={{flexDirection:'row'}}>
                        <NewInput style={{height:100}} multiline={true} blurOnSubmit={true} numberOfLines={10} placeholder="意见" inputChange={(e)=>{
                            this.setState({
                                comment:e.text
                            })}} />
                    </View>

                    {this.renderButton()}
                </View>

                <NewPick
                    data={pick.data}
                    pickVisible={pick.visible}
                    selectedIndex={pick.selectedIndex}
                    onCancel={()=>{
                        pick.visible = false;
                        this.setState({
                            pick:pick
                        });
                    }}
                    onConfirm={()=>{
                        pick.visible = false;
                        this.setState({
                            pick:pick
                        },()=>{
                            this._myStep3()
                        });
                    }}
                    selectChange={(e)=>{
                        pick.selectedIndex = e.selectedIndex;
                        this.setState({
                            pick:pick
                        });
                    }}
                />

                <AwesomeAlert
                    show={showAlert.show}
                    showProgress={false}
                    // title="标题"
                    message={showAlert.message}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={showAlert.showCancelButton}
                    showConfirmButton={showAlert.showConfirmButton}
                    cancelText="关闭"
                    confirmText="确定"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        showAlert.show = false;
                        this.setState({
                            showAlert
                        });
                    }}
                    onConfirmPressed={() => {
                        showAlert.show = false;
                        this.setState({
                            showAlert
                        },()=>{
                            navigation.goBack();
                        });
                    }}
                />
            </View>
        )
    }
}

export default TaskDetailPage;

const styles = {
    TaskDetailPage: {
        flex:1,
        padding:10,
    },
}
