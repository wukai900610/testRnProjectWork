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
            getOutgoings:'',
            // comment:'',
            presentation:[],
            showAlert:{
                show:false,
                message:''
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
            this.setState({
                getOutgoings:response.data
            })
        }).catch((err) => {
            // console.log('getOutgoings');
            // console.log(err);
            this.setState({
                getOutgoings:''
            })
        });
    }

    _myStep2(e){
        let {navigation} = this.props;
        let {params}=navigation.state;
        let {getOutgoings,comment} = this.state;
        let url,payload;
        let newGetOutgoings;

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

        if(e == 'confirm'){
            newGetOutgoings = getOutgoings[0];
        }else{
            newGetOutgoings = getOutgoings[1];
        }
        this.setState({
            newGetOutgoings:newGetOutgoings
        })

        if(newGetOutgoings.candidateGroup == ''){

        }else if(newGetOutgoings.candidateGroup=='owner'){
            url = Util.api.wfowener;
            payload = {
                recordId : params.yw_id2
            }
        }else{
            url = Util.api.wflist;
            payload = {
                kys : newGetOutgoings.candidateGroup
            }
        }

        if(url && url != ''){
            Util.ajax.get(url, {params: payload}).then((response) => {
                console.log('presentation');
                console.log(response.data);
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
                }else{
                    this._myStep3();
                }
            }).catch((err) => {
                console.log('presentation');
                console.log(err);
            });
        }
    }

    _myStep3 = () => {
        let {navigation} = this.props;
        let {params}=navigation.state;
        let {comment,pick,newGetOutgoings,showAlert} = this.state;
        //判断是否有下级用户
        let selectedItem = pick.data > 0 ? pick.data[pick.selectedIndex] : {};

console.log({
    taskId:params.taskId,
    procId:params.procId,
    tId:params.tId,
    comment:comment,
    userId:selectedItem.value,
    paramName:newGetOutgoings.condition.paramName,
    paramValue:newGetOutgoings.condition.paramValue
    // taskId procId userId paramName paramValue tId comment
});
        Util.ajax.get(Util.api.examineTask, {params: {
            taskId:params.taskId,
            procId:params.procId,
            tId:params.tId,
            comment:comment,
            userId:selectedItem.value,
            paramName:newGetOutgoings.condition.paramName,
            paramValue:newGetOutgoings.condition.paramValue
            // taskId procId userId paramName paramValue tId comment
        }}).then((response) => {
            console.log('examineTask');
            console.log(response);

            showAlert.show = true;
            showAlert.message = response.data.mess;
            this.setState({
                showAlert:showAlert
            })
        }).catch((err) => {
            console.log('examineTask');
            console.log(err);
        });
    };

    renderButton(){
        let {getOutgoings,showAlert} = this.state;
        if(getOutgoings && getOutgoings != ''){
            let btn0Value = getOutgoings[0].outGoing;
            let btn1Value= getOutgoings[1].outGoing;
            return (
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                    <NewButton style={{marginRight:20,backgroundColor:'#2795ee'}} textStyle={{color:'#fff'}} title={btn0Value} onPress={(e)=>{this._myStep2('confirm')}} />
                    <NewButton style={{backgroundColor:'#c30c22'}} textStyle={{color:'#fff'}} title={btn1Value} onPress={(e)=>{this._myStep2('cancel')}} />
                </View>
            )
        }
    }

    componentDidMount(){
        this._myStep1()
    }

    render() {
        let {showAlert,getOutgoings,pick} = this.state;

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
                    // showCancelButton={false}
                    showConfirmButton={true}
                    // cancelText="取消"
                    confirmText="确定"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => {
                        showAlert.show = false;
                        this.setState({
                            showAlert
                        })
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
