import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homeNavList:[{
                name:'信用动态',
                channelId:94,
                hasChild:true,
                child:[
                    {
                        name:'国内动态',
                        channelId:103,
                    },
                    {
                        name:'省内动态',
                        channelId:104,
                    }
                ]
            },{
                name:'政策法规',
                channelId:95,
                hasChild:true,
                child:[
                    {
                        name:'国家动态',
                        channelId:105,
                    },
                    {
                        name:'外省动态',
                        channelId:106,
                    },
                    {
                        name:'本地动态',
                        channelId:121,
                    },
                    {
                        name:'省内动态',
                        channelId:122,
                    }
                ]
            },{
                name:'信用论丛',
                channelId:96,
                hasChild:true,
                child:[
                    {
                        name:'信用研究',
                        channelId:123,
                    },
                    {
                        name:'信用知识',
                        channelId:124,
                    },
                    {
                        name:'专家言论',
                        channelId:125,
                    },
                    {
                        name:'典型案例',
                        channelId:126,
                    }
                ]
            },{
                name:'新闻动态',
                channelId:135,
                hasChild:false,
            },{
                name:'通知公告',
                channelId:136,
                hasChild:false,
            },{
                name:'信用报告',
                channelId:149,
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

    shouldComponentUpdate(nextProps, nextState){
        // return true;
        return false;
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
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },
    homeNavBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    homeNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // marginLeft: 10,
        // marginRight: 10,
        width: 70,
        height: 70,
        backgroundColor: '#f1f1f1'
    },
}
