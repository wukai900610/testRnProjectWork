import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    PixelRatio
} from 'react-native';

class GsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navLevel1:[
                {
                    title:'自然人行政许可',
                    ico:require('../images/gsPageIco1.png'),
                    type:'zzrxk'
                },{
                    title:'自然人行政处罚',
                    ico:require('../images/gsPageIco2.png'),
                    type:'zzrcf'
                }
            ],
            navLevel2:[
                {
                    title:'法人行政许可',
                    ico:require('../images/gsPageIco3.png'),
                    type:'frxk'
                },{
                    title:'法人行政处罚',
                    ico:require('../images/gsPageIco4.png'),
                    type:'frcf'
                }
            ],
            navLevel3:[
                {
                    title:'红榜名单',
                    ico:require('../images/gsPageIco5.png'),
                    type:'honmd',
                    child:[
                        {
                            name:'法人红榜名单',
                            type:'frhonmd',
                        },
                        {
                            name:'自然人红榜名单',
                            type:'zzrhonmd',
                        }
                    ]
                },{
                    title:'黑榜名单',
                    ico:require('../images/gsPageIco6.png'),
                    type:'heimd',
                    child:[
                        {
                            name:'法人黑榜名单',
                            type:'frheimd',
                        },
                        {
                            name:'自然人黑榜名单',
                            type:'zzrheimd',
                        }
                    ]
                }
            ]
        };
    }

    _goToPage(detailItem){
        const { navigation } = this.props;

        if(detailItem.type == 'honmd' || detailItem.type == 'heimd'){
            navigation.navigate("HhbListPageWithTabBar",detailItem);
        }else{
            navigation.navigate("GsListPage",detailItem);
        }
    }

    renderNavLevel(data){
        let navLevelArr=[];
        data.map((item,index)=>{
            if(index == 0){
                navLevelArr.push(
                    <View style={[styles.navItem,{borderRightWidth:0.5}]} key={index}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{this._goToPage(item)}}>
                            <Image source={item.ico} style={styles.navImg} />
                            <Text>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }else{
                navLevelArr.push(
                    <View style={styles.navItem} key={index}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{this._goToPage(item)}}>
                            <Image source={item.ico} style={styles.navImg} />
                            <Text>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        });

        return navLevelArr;
    }

    render() {
        let {navLevel1,navLevel2,navLevel3} = this.state;
        
        return (
            <ScrollView style={styles.GsPage}>
                <View style={styles.navLevelBox}>
                    {
                        this.renderNavLevel(navLevel1)
                    }
                </View>
                <View style={styles.navLevelBox}>
                    {
                        this.renderNavLevel(navLevel2)
                    }
                </View>
                <View style={styles.navLevelBox}>
                    {
                        this.renderNavLevel(navLevel3)
                    }
                </View>
            </ScrollView>
        )
    }
}

export default GsPage;

const styles = {
    GsPage: {
    },
    navLevelBox:{
        flex:1,
        flexDirection: 'row',
        borderBottomWidth:0.5,
        borderColor:'#cdcdcd',
        backgroundColor:'#fff'
    },
    navItem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        paddingTop:15,
        paddingBottom:15,
        borderColor:'#cdcdcd',
    },
    navImg:{
        marginBottom:10,
        width:160 / PixelRatio.get(),
        height: 160 / PixelRatio.get()
    }
}
