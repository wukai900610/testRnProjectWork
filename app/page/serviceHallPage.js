import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    PixelRatio
} from 'react-native';
// import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

// import {connect} from 'react-redux';
// import {ajaxHomeData,loadFail} from '../actions/actions';

import Util from '../libs/libs';

class serviceHallPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navLevel1:[
                {
                    title:'信用报告',
                    type:'xybg',
                    ico:require('../images/serviceHallPageIco1.png')
                },{
                    title:'企业直报',
                    type:'qyzb',
                    ico:require('../images/serviceHallPageIco2.png')
                }
            ],
            navLevel2:[
                {
                    title:'举报信箱',
                    type:'jbxx',
                    ico:require('../images/serviceHallPageIco4.png')
                }
            ],
            navLevel3:[
                {
                    title:'我的审批',
                    type:'111',
                    ico:require('../images/serviceHallPageIco5.png')
                }
            ]
        };
    }

    _goToPage(detailItem){
        const { navigation } = this.props;

        navigation.navigate("ServiceHallPageList",detailItem);
    }

    renderNavLevel(data){
        let navLevelArr=[];
        data.map((item,index)=>{
            navLevelArr.push(
                <TouchableOpacity style={styles.navItem} key={index} onPress={()=>{this._goToPage(item)}}>
                    <Image source={item.ico} style={styles.navImg} />
                    <Text>
                        {item.title}
                    </Text>
                </TouchableOpacity>

            )
        });

        return navLevelArr;
    }

    render() {
        let {navLevel1,navLevel2,navLevel3} = this.state;
        return (
            <ScrollView style={styles.serviceHallPage}>
                <Image source={require('../images/serviceHallPage.jpg')} style={styles.banner} />

                <View style={styles.navLevel}>
                    <View style={styles.navLevelTitle}>
                        <Text style={styles.navLevelTitleText}>信用服务</Text>
                    </View>
                    <View style={styles.navLevelBox}>
                        {
                            this.renderNavLevel(navLevel1)
                        }
                    </View>
                </View>
                <View style={styles.navLevel}>
                    <View style={styles.navLevelTitle}>
                        <Text style={styles.navLevelTitleText}>投诉建议</Text>
                    </View>
                    <View style={styles.navLevelBox}>
                        {
                            this.renderNavLevel(navLevel2)
                        }
                    </View>
                </View>
                <View style={styles.navLevel}>
                    <View style={styles.navLevelTitle}>
                        <Text style={styles.navLevelTitleText}>待办事宜</Text>
                    </View>
                    <View style={styles.navLevelBox}>
                        {
                            this.renderNavLevel(navLevel3)
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

// function mapStateToProps(state) {
//     const {homePage} = state;
//
//     return {
//         homePage
//     }
// }

export default serviceHallPage;

const styles = {
    serviceHallPage: {
        backgroundColor:'#f7f7f7'
    },
    banner:{
        marginBottom:10,
        width:750 / PixelRatio.get(),
        height: 320 / PixelRatio.get()
    },
    navLevel:{
        flex:1,
        // justifyContent: 'space-between',
        marginBottom:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#fff'
    },
    navLevelTitle:{
        marginBottom:20,
        paddingLeft:15,
    },
    navLevelTitleText:{
        fontSize:16
    },
    navLevelBox:{
        flex:1,
        flexDirection: 'row',
    },
    navItem:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:15,
        paddingRight:15,
    },
    navImg:{
        marginBottom:10,
        width:100 / PixelRatio.get(),
        height: 100 / PixelRatio.get()
    }
}
