import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio,
    Platform
} from 'react-native';

class HomeNav extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            homeNavList:[{
                name:'信用动态',
                channelId:94,
                ico:require('../images/homeNavIco1.png'),
                hasChild:true,
                child:[
                    {
                        name:'巩义动态',
                        channelId:103,
                    },
                    {
                        name:'河南动态',
                        channelId:104,
                    },
                    {
                        name:'国家动态',
                        channelId:158,
                    }
                ]
            },{
                name:'政策法规',
                channelId:95,
                ico:require('../images/homeNavIco2.png'),
                hasChild:true,
                child:[
                    {
                        name:'巩义动态',
                        channelId:105,
                    },
                    {
                        name:'河南动态',
                        channelId:106,
                    },
                    {
                        name:'国家动态',
                        channelId:121,
                    }
                ]
            },{
                name:'信用论丛',
                channelId:96,
                ico:require('../images/homeNavIco3.png'),
                hasChild:true,
                child:[
                    {
                        name:'信用知识',
                        channelId:124,
                    },
                    {
                        name:'专家言论',
                        channelId:125,
                    },
                    {
                        name:'信用案例',
                        channelId:126,
                    },
                    {
                        name:'信用承诺',
                        channelId:147,
                    }
                ]
            },{
                name:'新闻动态',
                channelId:135,
                ico:require('../images/homeNavIco4.png'),
                hasChild:false,
            },{
                name:'通知公告',
                channelId:136,
                ico:require('../images/homeNavIco5.png'),
                hasChild:false,
            },{
                name:'信用报告',
                channelId:149,
                ico:require('../images/homeNavIco6.png'),
                hasChild:false,
            }]
        };
    }

    _goToPage(detailItem) {
        if(detailItem.hasChild){
            this.props.navigation.navigate("ListPageWithTabBar",detailItem);
        }else{
            this.props.navigation.navigate("ListPage",detailItem);
        }
    }

    homeNav(){
        let homeNav = [];
        let _this = this;
        let step = 2;
        this.state.homeNavList.map((item,index)=>{
            if(index % 3 == 0){
                let end = index + step > (this.state.homeNavList.length-1) ? (this.state.homeNavList.length-1) : index + step;

                let arrItem = [];
                for(let i = index;i<=end;i++){
                    arrItem.push(
                        <TouchableOpacity key={i} style={styles.homeNavItem} onPress={()=>{this._goToPage(this.state.homeNavList[i])}}>
                            <Image source={this.state.homeNavList[i].ico} style={styles.homeNavItemIco} />
                            <Text>{this.state.homeNavList[i].name}</Text>
                        </TouchableOpacity>
                    )
                }
                homeNav.push(
                    <View key={index} style={styles.homeNavBox}>
                        {arrItem}
                    </View>
                )
            }
        });

        return homeNav;
    }

    render() {
        return (
            <View style={styles.homeNav}>
                {this.homeNav()}
            </View>
        );
    }
}
export default HomeNav;

const styles = {
    homeNav: {
        paddingTop: Platform.OS === "ios" ? 20 : 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
    homeNavBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    homeNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // backgroundColor:'#ccc',
        // marginLeft: 10,
        // marginRight: 10,
        width: 70,
        height: 70
    },
    homeNavItemIco:{
        marginBottom:10,
        width:87 / PixelRatio.get(),
        height: 80 / PixelRatio.get()
    }
}
