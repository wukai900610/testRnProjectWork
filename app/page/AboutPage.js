import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import NewButton from '../components/NewButton';

import Util from '../libs/libs';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            viewList:[
                {
                    name:'我的收藏',
                    type:'Favtory',
                    ico:''
                },
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
            ]
        }
    }

    _goToPage(item){
        let { navigation } = this.props;

        navigation.navigate(item.type,item);
    }

    renderViewList(){
        let arr=[]
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
        return arr;
    }

    render() {
        return (
            <View style={styles.aboutPage}>
                <View style={styles.viewLogin}>
                    <NewButton title="请登陆" onPress={()=>{this.props.navigation.navigate("LoginPage")}} />
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
        borderWidth:0.5,
        borderColor:'#f00',
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
    }
}
