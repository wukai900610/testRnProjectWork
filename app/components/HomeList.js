import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';

import DateFormat from 'moment';
import Util from '../libs/libs';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);
    }

    _skip(detailItem) {
        this.props.navigation.navigate("Details",detailItem);
    }

    _renderItem = ({item}) => {
        return <View style={styles.newsBoxItem}>
            <TouchableOpacity onPress={this._skip.bind(this,item)}>
                <View style={styles.newsBoxItemBox}>
                    <Text style={styles.newsBoxItemChannel}>
                        [{item.channel}]
                    </Text>
                    <Text style={styles.newsBoxItemTitle}>
                        {Util.strSplit(item.title,20)}
                    </Text>
                    <Text style={styles.newsBoxItemDate}>{DateFormat(item.releaseDate).format('YYYY-MM-DD')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    };

    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextProps.homePage.isLoadSuccess !== this.props.homePage.isLoadSuccess){
    //         console.log('不相等');
    //     }else{
    //         console.log('相等');
    //     }
    //     return nextProps.homePage.isLoadSuccess !== this.props.homePage.isLoadSuccess;
    // }

    renderComponent(homePage){
        if(homePage.isLoading){
            return (
                <View style={styles.loadingBox}>
                    <ActivityIndicator color="#2795ee"/>
                    <Text style={styles.loadingText}>正在加载...</Text>
                </View>
            )
        }else{
            return (<FlatList data={homePage.homeList.data} keyExtractor={(item, index) => item.id} renderItem={this._renderItem}/>)
        }
    }

    render() {
        const {dispatch, homePage} = this.props;
        let {isLoadSuccess} = homePage;
        console.log(isLoadSuccess);
        if(!isLoadSuccess){
            Alert.alert(
                '警告',
                '数据加载失败了',
                [
                    {text: '确认', onPress: () => {

                    }},
                ],
                { cancelable: false }
            )
        }

        return (
            <View style={styles.newsBox}>
                <View style={styles.newsBoxTitle}>
                    <Text style={styles.newsBoxTitleText}>头条</Text>
                </View>

                {this.renderComponent(homePage)}
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
    newsBoxItem: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    newsBoxItemBox: {
        flex:1,
        flexDirection: 'row'
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
        position:'absolute',
        top:4,
        right:0,
        color: '#333745',
        fontSize: 10
    }
}
