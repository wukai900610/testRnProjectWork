import React from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';
import NewPick from '../components/NewPick';
import ValidLabel from '../components/ValidLabel';
import ImagePicker from 'react-native-image-crop-picker';

// import Immutable from 'immutable';
import Util from '../libs/libs';

let _that;
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showLoad:false,
            showAlert:{
                show:false,
                message:''
            },
            pickVisible:false,
            registerSuccess:false,
            type:{
                name:'自然人',
                value:'Z'
            },
            password:{},
            password1:{},
            choosePicBoxVisible:false,
            picType:'',
            zrrPicFront:{},
            zrrPicBack:{},
            frPicOrg:{},
            frPicCopy:{},
        }
    }

    _hideAlert = () => {
        let {showAlert} = this.state
        showAlert.show = false

        this.setState({
            showAlert: showAlert
        });
    };

    register(){
        let _this = this
        let { navigation } = _this.props
        let payload

        if(_this.state.type.value == 'F'){
            payload = {
                username:_this.username.state,
                password:_this.state.password,
                realname:_this.realname.state,
                idcard:_this.idcard.state,
                phone:_this.phone.state,
                type:_this.state.type,

                zrrPicFront:_this.state.zrrPicFront,
                zrrPicBack:_this.state.zrrPicBack,
                frPicOrg:_this.state.frPicOrg,
                frPicCopy:_this.state.frPicCopy,
                wtqy:_this.wtqy.state
            }
        }else{
            payload = {
                username:_this.username.state,
                password:_this.password1.state,
                realname:_this.realname.state,
                idcard:_this.idcard.state,
                phone:_this.phone.state,
                type:_this.state.type.value,

                zrrPicFront:_this.state.zrrPicFront,
                zrrPicBack:_this.state.zrrPicBack,
            }
        }

        //验证表单
        let checkArr=[];
        for(let i in payload){
            let item = payload[i];
            let obj = {
                name:i
            }
            if(i == 'zrrPicFront' || i == 'zrrPicBack' || i == 'frPicOrg' || i == 'frPicCopy'){
                if(item.path && item.path != undefined){
                    obj.value = true
                }else{
                    obj.value = false
                }
            }else if(i == 'type'){
                obj.value = true
            }else{
                if(item.status == 'pass'){
                    obj.value = true
                }else{
                    obj.value = false
                }
            }
            checkArr.push(obj)
        }

        let isValided = checkArr[0].value
        for(let i=1;i<checkArr.length;i++){
            isValided = isValided && checkArr[i].value
        }

        if(!isValided){
            _this.setState({
                showAlert:{
                    show:true,
                    message:'请输入用户名或密码'
                }
            })

            return false
        }

        //表单提交
        let formData = new FormData()
        for(let i in payload){
            let item = payload[i];

            if(i == 'zrrPicFront' || i == 'zrrPicBack' || i == 'frPicOrg' || i == 'frPicCopy'){
                formData.append(i,{uri: item.path, type: 'multipart/form-data', name: item.filename});
            }else if(i == 'type'){
                formData.append(i,obj);
            }else{
                formData.append(i,item.text);
            }
        }

        // 显示加载器
        _this.setState({
            showLoad:true,
            loginSuccess:false
        })

        Util.ajax.post(Util.api.userRegist, formData).then((response) => {
            setTimeout(()=>{
                _this.setState({
                    showLoad:false,
                })
            },300)

            if(response.status==200){
                if(response.data.resultObj.code == 1000){
                    setTimeout(()=>{
                        _this.setState({
                            loginSuccess:true,
                            showAlert:{
                                show:true,
                                message:'注册成功'
                            }
                        })
                    },600)
                }else{
                    setTimeout(()=>{
                        _this.setState({
                            showAlert:{
                                show:true,
                                message:response.data.resultObj.mess
                            }
                        })
                    },600)
                }
            }else{
                setTimeout(()=>{
                    _this.setState({
                        showAlert:{
                            show:true,
                            message:'注册失败'
                        }
                    })
                },600)
            }
        }).catch((err) => {
            setTimeout(()=>{
                _this.setState({
                    showLoad:false,
                })
            },300)
            setTimeout(()=>{
                _this.setState({
                    showAlert:{
                        show:true,
                        message:'请检查网络'
                    }
                })
            },600)
        });
    }

    renderType(){
        if(this.state.type.value == 'F'){
            return (
                <View style={{flex:1,marginBottom:10}}>
                    <View>
                        <View style={styles.Label}>
                            <NewButton style={styles.UploadBtn} textStyle={styles.UploadBtnText} title="上传营业执照正本" onPress={()=>{this._choosePicBox('frPicOrg')}} />
                        </View>
                        {this.rendTypeImage('frPicOrg')}
                    </View>

                    <View>
                        <View style={styles.Label}>
                            <NewButton style={styles.UploadBtn} textStyle={styles.UploadBtnText} title="上传营业执照副本" onPress={()=>{this._choosePicBox('frPicCopy')}} />
                        </View>
                        {this.rendTypeImage('frPicCopy')}
                    </View>

                    <NewInput rule={{test:'*'}} placeholder="委托企业" ref={(e) => {this.wtqy = e;}} style={styles.TextInput} />
                </View>
            )
        }
    }

    rendTypeImage(picType){
        let pic = this.state[picType]
        if(pic.path && pic.path != undefined){
            return (
                <View style={{marginBottom:10}}>
                    <Image style={{width:80, height: 80}} source={{uri: pic.path}} />
                </View>
            )
        }
    }

    _passwordChange(params){
        console.log(params);
    }

    componentDidMount(){
        _that=this;
    }

    _choosePicBox(picType){
        this.setState({
            picType,
            choosePicBoxVisible:true
        })
    }

    render() {
        let { navigation } = this.props;
        const {showAlert,showLoad,type} = this.state;

        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.RegisterPage}>
                    <View style={styles.LoginInputBox}>
                        <View style={styles.Label}>
                            <NewInput rule={{test:"s2-20"}} placeholder="帐号" ref={(e) => {this.username = e;}} style={styles.TextInput} />
                        </View>

                        <ValidLabel onPasswordChange={this._passwordChange} labelStyle={styles.Label} textInputStyle={styles.TextInput} />

                        <View style={styles.Label}>
                            <NewInput rule={{test:"z2-4"}} placeholder="姓名" ref={(e) => {this.realname = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.Label}>
                            <NewInput rule={{test:'idCard'}} placeholder="身份证号" ref={(e) => {this.idcard = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.Label}>
                            <NewInput rule={{test:'phone'}} placeholder="手机号" ref={(e) => {this.phone = e;}} style={styles.TextInput} />
                        </View>
                        <View style={styles.Label}>
                            <View style={{height:50,justifyContent:'center'}}>
                                <Text style={{paddingLeft:15,color:'#ccc'}}>注册类型</Text>
                            </View>
                            <View style={{height:50,justifyContent:'center'}}>
                                <NewButton title={type.name} style={{marginLeft:10,backgroundColor:'#ccc'}} textStyle={{color:'#fff'}} onPress={()=>{this.setState({pickVisible:true})}} />
                            </View>
                        </View>

                        <View>
                            <View style={styles.Label}>
                                <NewButton style={styles.UploadBtn} textStyle={styles.UploadBtnText} title="上传身份证正面照片" onPress={()=>{this._choosePicBox('zrrPicFront')}} />
                            </View>
                            {this.rendTypeImage('zrrPicFront')}
                        </View>

                        <View>
                            <View style={styles.Label}>
                                <NewButton style={styles.UploadBtn} textStyle={styles.UploadBtnText} title="上传身份证背面照片" onPress={()=>{this._choosePicBox('zrrPicBack')}} />
                            </View>
                            {this.rendTypeImage('zrrPicBack')}
                        </View>

                        {this.renderType()}

                        <NewPick
                            data={[{'name':'法人',value:'F'},{'name':'自然人',value:'Z'}]}
                            pickVisible={this.state.pickVisible}
                            selected={0}
                            onCancel={()=>{this.setState({pickVisible:false})}}
                            onConfirm={(selected)=>{
                                this.setState({
                                    pickVisible:false,
                                    type:selected
                                })
                            }}
                         />

                        {/* 选择照片 */}
                        <NewPick
                            data={[{'name':'从相册选择',value:'Album'},{'name':'拍照',value:'Camera'}]}
                            pickVisible={this.state.choosePicBoxVisible}
                            selected={0}
                            onCancel={()=>{this.setState({choosePicBoxVisible:false})}}
                            onConfirm={(selected)=>{
                                let {picType} = this.state;
                                if(selected.value == 'Album'){
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 400,
                                        cropping: true
                                    }).then(image => {
                                        this.setState({
                                            [picType]:image,
                                            choosePicBoxVisible:false,
                                        })
                                    });
                                }else{
                                    ImagePicker.openCamera({
                                        width: 300,
                                        height: 400,
                                        cropping: true
                                    }).then(image => {
                                        this.setState({
                                            [picType]:image,
                                            choosePicBoxVisible:false,
                                        })
                                    });
                                }
                            }}
                          />
                    </View>

                    <NewButton title="注册" style={styles.LoginBtn} textStyle={styles.LoginBtnText} onPress={()=>{this.register()}} />
                </ScrollView>

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
                        let {loginSuccess} = this.state

                        if(loginSuccess){
                            navigation.navigate('AboutPage')
                        }
                        this._hideAlert();
                    }}
                />

                <AwesomeAlert
                    show={showLoad}
                    showProgress={true}
                    // title="标题"
                    // message="哈哈"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                />
            </View>
        );
    }
}
export default RegisterPage;

const styles = {
    RegisterPage: {
        flex: 1,
        // paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'#fff'
    },
    LoginInputBox: {
        marginBottom:20,
    },
    Label: {
        flexDirection: 'row',
        // marginBottom: 10,
    },
    TextInput: {
        paddingLeft:10,
        height: 40,
        borderWidth:0,
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    UploadBtn:{
        marginBottom:10,
        // backgroundColor:'#ccc'
        borderColor:'#2795ee',
        borderWidth:1
    },
    UploadBtnText:{
        color:'#2795ee'
    },
    LoginBtn: {
        marginBottom:20,
        height: 40,
        backgroundColor: '#2795ee'
    },
    LoginBtnText: {
        color:'#fff',
        fontSize:16
    },
}
