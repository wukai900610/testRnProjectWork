import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';

import DateFormat from 'moment';
import Util from '../libs/libs';
import NewButton from '../components/NewButton';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);
    }

    _goToPage(detailItem) {
        this.props.navigation.navigate("NewsDetailPage",detailItem);
    }

    renderListUl(){
        const {homePage,_fetchData} = this.props;

        if(homePage.isLoading){
            return (
                <View style={styles.loadingBox}>
                    <ActivityIndicator color="#2795ee"/>
                    <Text style={styles.loadingText}>正在加载...</Text>
                </View>
            )
        }

        if(homePage.status == 'loadSuccess'){
            let data = [];
            homePage.homeList.data.map((item,index)=>
                data.push(<TouchableHighlight key={index} underlayColor="#f1f1f1" activeOpacity={0.35} onPress={this._goToPage.bind(this,item)}>
                    <View style={styles.newsBoxItemBox}>
                        <Text style={styles.newsBoxItemChannel}>
                            [{item.channel}]
                        </Text>
                        <Text style={styles.newsBoxItemTitle}>
                            {Util.strSplit(item.title,20)}
                        </Text>
                        <View style={styles.newsBoxItemDate}>
                            <Text style={styles.newsBoxItemDateText}>
                                {DateFormat(item.releaseDate).format('YYYY-MM-DD')}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>)
            )

            return data;
        }else if(homePage.status == 'loadFail'){
        // }else if(homePage.status == 'loadSuccess'){
            return (
                <View style={{padding:20,alignItems: 'center'}}>
                    <Text>数据加载失败</Text>
                    <NewButton title="重新加载" onPress={_fetchData}></NewButton>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.newsBox}>
                <View style={styles.newsBoxTitle}>
                    <Text style={styles.newsBoxTitleText}>头条</Text>
                </View>

                {this.renderListUl()}
            </View>
        );
    }
}
export default HomeNav;

const styles = {
    newsBox:{
        paddingTop:10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        borderTopWidth:5,
        borderTopColor:'#f7f7f7'
    },
    newsBoxTitle:{
        marginBottom:10,
        paddingLeft:10,
        borderLeftWidth:3,
        borderLeftColor:'#2795ee'
    },
    newsBoxTitleText:{
        fontWeight:'bold',
        fontSize:16
    },
    loadingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height : 50,
    },
    loadingText: {
        marginLeft:10
    },
    newsBoxItemBox: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        height:40,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    newsBoxItemChannel: {
        paddingRight:5,
        color: '#426fee',
        fontWeight: 'bold',
        fontSize: 14
    },
    newsBoxItemTitle: {
        color: '#293c55',
        fontSize: 16
    },
    newsBoxItemDate: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height:40,
    },
    newsBoxItemDateText: {
        color: '#333745',
        fontSize: 10
    }
}
