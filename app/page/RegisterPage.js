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

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        let pickTypeBoxSelectedIndex = 1;
        let pickTypeBoxData = [{'name':'法人',value:'F'},{'name':'自然人',value:'Z'}];
        let pickPicBoxSelectedIndex = 0;
        let pickPicBoxData = [{'name':'从相册选择',value:'Album'},{'name':'拍照',value:'Camera'}];
        this.state={
            showLoad:false,
            showAlert:{
                show:false,
                message:''
            },
            registerSuccess:false,
            pickTypeBox:{
                selectedIndex:pickTypeBoxSelectedIndex,
                selectedItem:pickTypeBoxData[pickTypeBoxSelectedIndex],
                data:pickTypeBoxData,
                visible:false
            },
            pickPicBox:{
                selectedIndex:pickPicBoxSelectedIndex,
                selectedItem:pickPicBoxData[pickPicBoxSelectedIndex],
                data:pickPicBoxData,
                visible:false
            },
            password:{},
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
        let _this = this;
        let { navigation } = _this.props;
        let { pickTypeBox } = _this.state;

        let payload = {
            username:_this.username.state,
            password:_this.state.password,
            realname:_this.realname.state,
            idcard:_this.idcard.state,
            phone:_this.phone.state,
            type:pickTypeBox.selectedItem
        };

        if(pickTypeBox.selectedItem.value == 'F'){
            payload.zrrPicFront = _this.state.zrrPicFront;
            payload.zrrPicBack = _this.state.zrrPicBack;
            payload.frPicOrg = _this.state.frPicOrg;
            payload.frPicCopy = _this.state.frPicCopy;
            payload.wtqy = _this.wtqy.state;
        }else{
            payload.zrrPicFront = _this.state.zrrPicFront;
            payload.zrrPicBack = _this.state.zrrPicBack;
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
                    message:'请完善用户信息'
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
                formData.append(i,item.value);
            }else{
                if(i == 'password'){
                    formData.append(i,item.password1Text);
                }else{
                    formData.append(i,item.text);
                }
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
        let { pickTypeBox } = this.state;
        if(pickTypeBox.selectedItem.value == 'F'){
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
        this.setState({
            password:params
        })
    }

    _choosePicBox(picType){
        let {pickPicBox} = this.state;
        pickPicBox.visible = true;

        this.setState({
            picType,
            pickPicBox:pickPicBox
        })
    }

    render() {
        let { navigation } = this.props;
        let {showAlert,showLoad,type,picType,pickTypeBox,pickPicBox} = this.state;

        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.RegisterPage}>
                    <View style={styles.LoginInputBox}>
                        <View style={styles.Label}>
                            <NewInput rule={{test:"s2-20"}} placeholder="帐号" ref={(e) => {this.username = e;}} style={styles.TextInput} />
                        </View>

                        <ValidLabel onPasswordChange={(e)=>{this._passwordChange(e)}} labelStyle={styles.Label} textInputStyle={styles.TextInput} />

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
                                <NewButton title={pickTypeBox.selectedItem.name} style={{marginLeft:10,backgroundColor:'#ccc'}} textStyle={{color:'#fff'}} onPress={()=>{
                                    pickTypeBox.visible = true;
                                    this.setState({
                                        pickTypeBox:pickTypeBox
                                    })
                                }} />
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
                            data={pickTypeBox.data}
                            pickVisible={pickTypeBox.visible}
                            selectedIndex={pickTypeBox.selectedIndex}
                            onCancel={()=>{
                                pickTypeBox.visible = false;
                                this.setState({
                                    pickTypeBox:pickTypeBox
                                });
                            }}
                            onConfirm={()=>{
                                pickTypeBox.visible = false;
                                this.setState({
                                    pickTypeBox:pickTypeBox
                                });
                            }}
                            selectChange={(e)=>{
                                pickTypeBox.selectedIndex = e.selectedIndex;
                                pickTypeBox.selectedItem = e;
                                this.setState({
                                    pickTypeBox:pickTypeBox
                                });
                            }}
                        />

                        {/* 选择照片 */}
                        <NewPick
                            data={pickPicBox.data}
                            pickVisible={pickPicBox.visible}
                            selectedIndex={pickPicBox.selectedIndex}
                            onCancel={()=>{
                                pickPicBox.visible = false;
                                this.setState({
                                    pickPicBox:pickPicBox
                                });
                            }}
                            onConfirm={()=>{
                                pickPicBox.visible = false;

                                //打开相册或相机
                                if(pickPicBox.selectedItem.value == 'Album'){
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 400,
                                        cropping: true
                                    }).then(image => {
                                        this.setState({
                                            [picType]:image,
                                            pickPicBox:pickPicBox
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
                                            pickPicBox:pickPicBox
                                        })
                                    });
                                }
                            }}
                            selectChange={(e)=>{
                                pickPicBox.selectedIndex = e.selectedIndex;
                                pickPicBox.selectedItem = e;
                                this.setState({
                                    pickPicBox:pickPicBox
                                });
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
                            Util.reset(navigation,{ routeName:'LoginPage' })
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
