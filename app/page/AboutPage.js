import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import NewButton from '../components/NewButton';
import ImagePicker from 'react-native-image-crop-picker';

import Util from '../libs/libs';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            viewList:[
                // {
                //     name:'我的收藏',
                //     type:'Favtory',
                //     ico:''
                // },
                {
                    name:'我的代办',
                    type:'AgentMission',
                    ico:''
                },
                {
                    name:'我的认证',
                    type:'Certification',
                    ico:''
                },
                {
                    name:'修改密码',
                    type:'ModifyPass',
                    ico:''
                }
            ],
            frontUser:{
                realname:'请登陆'
            }
        }
    }

    _goToPage(item){
        let { navigation } = this.props;

        navigation.navigate(item.type,item);
    }

    renderViewLogin(){
        if(this.state.isLogin){
            return (
                <View>
                    <View>
                        <Text>
                            用户类型：{this.state.frontUser.type == 'F' ? '法人' : '自然人'}
                        </Text>
                    </View>
                    <View>
                        <NewButton activeOpacity={1} title={this.state.frontUser.realname} textStyle={{color:'#fff'}} />
                    </View>

                </View>

            )
        }else{
            return (
                <NewButton title={this.state.frontUser.realname} textStyle={{color:'#333'}} onPress={()=>{this.props.navigation.navigate("LoginPage")}} />
            )
        }
    }

    renderViewList(){
        let arr=[]
        if(this.state.isLogin){
            this.state.viewList.map((item,index)=>{
                arr.push(
                    <TouchableOpacity style={styles.viewListItem} key={index} onPress={()=>{
                        this._goToPage(item)
                    }}>
                        <View style={{flexDirection:'row',alignItems: 'center',}}>
                            <Ionicons style={{marginRight:10}} name='ios-search' size={20}/>
                            <Text style={{fontSize:16}}>{item.name}</Text>
                        </View>
                        <Ionicons name='ios-arrow-forward' color="#999" size={26}/>
                    </TouchableOpacity>
                )
            });
            arr.push(<NewButton key="LoginOut" title="登出" style={styles.LoginOutBtn} textStyle={styles.LoginOutBtnText} onPress={()=>{this._loginOut()}} />)
        }else{
            this.state.viewList.map((item,index)=>{
                arr.push(
                    <TouchableOpacity style={styles.viewListItem} key={index}>
                        <View style={{flexDirection:'row',alignItems: 'center',}}>
                            <Ionicons style={{marginRight:10}} name='ios-search' size={20}/>
                            <Text style={{fontSize:16}}>{item.name}</Text>
                        </View>
                        <Ionicons name='ios-arrow-forward' color="#999" size={26}/>
                    </TouchableOpacity>
                )
            });
        }
        return arr;
    }

    componentDidMount(){
        STORAGE.load({
            key:'frontUser',
        }).then(ret => {
            this.setState({
                isLogin:true,
                frontUser:ret
            })
        }).catch((e)=>{
            this._loginOut()
        })
        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     cropping: true
        // }).then(image => {
        //     console.log(' 图片路径：'+ image);
        // });
    }

    _clearFontUser(){
        STORAGE.remove({
        	key: 'frontUser'
        }).then(ret => {
            this.setState({
                isLogin:false,
                frontUser:{
                    realname:'请登陆'
                }
            })
        });
    }

    _loginOut(){
        this._clearFontUser()
    }

    render() {
        return (
            <View style={styles.aboutPage}>
                <View style={styles.viewLogin}>
                    {this.renderViewLogin()}
                </View>
                <View style={styles.viewList}>
                    {this.renderViewList()}
                </View>
            </View>
        );
    }
}
export default AboutPage;

const styles = {
    aboutPage: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor:'#fff'
    },
    viewLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:170,
        backgroundColor:'#555'
    },
    viewList: {
        padding:10,
        flex: 1,
    },
    viewListItem: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        // paddingLeft:10,
        // paddingRight:10,
        padding:10,
        borderBottomWidth:0.5,
        borderColor:'#ccc',
        // backgroundColor:'#ddd'
    },
    LoginOutBtn: {
        marginTop: 10,
        height: 40,
        backgroundColor: '#c30c22'
    },
    LoginOutBtnText: {
        color:'#fff',
        fontSize:16
    },
}
