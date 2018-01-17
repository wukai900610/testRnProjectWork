import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

import {connect} from 'react-redux';
import {ajaxHomeData,loadFail} from '../actions/actions';

import Util from '../libs/libs';

import Banner from '../components/Banner';

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
        };
    }

    _skip() {
        this.props.navigation.navigate("Details");
    }

    _renderItem = ({item}) => {
        return <View style={styles.newsBoxItem}>
            <TouchableOpacity onPress={this._skip.bind(this)}>
                <Text style={{
                        color: '#293c55',
                        fontSize: 14
                    }}>
                    <Text style={{
                            fontWeight: 'bold',
                            color: '#426fee'
                        }}>[{item.channel}]
                    </Text>
                    {item.title}
                </Text>
                <Text style={{
                        color: '#333745',
                        fontSize: 10
                    }}>{item.releaseDate}</Text>
            </TouchableOpacity>
        </View>
    };

    _onRefresh(PullRefresh) {
        let _this = this;
        setTimeout(function () {
            PullRefresh.onRefreshEnd();
        }, 1000);
    }

    render() {
        const {dispatch, homePage} = this.props;

        let {isLoadSuccess} = this.props.homePage;

        if(!isLoadSuccess){
            Alert.alert(
                '警告',
                '数据加载失败了',
                [
                    {text: '确认', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }

        return (
            <PullRefreshScrollView
                ref="PullRefresh"
                style={styles.homePageView}
                onRefresh={this._onRefresh.bind(this)}>

                <Banner banner={[1,2,3]}></Banner>

                <TouchableOpacity onPress={()=> {
                            dispatch(loadFail());
                        }}>
                    <Text>点我加载失败</Text>
                </TouchableOpacity>

                <View style={styles.mainNav}>
                    <View style={styles.mainNavItem}>
                        <Text>1</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>2</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>3</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>4</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>1</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>2</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>3</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>4</Text>
                    </View>
                    <View style={styles.mainNavItem}>
                        <Text>4</Text>
                    </View>
                </View>

                <View style={styles.newsBox}>
                    <View style={styles.newsBoxTitle}>
                        <Text style={styles.newsBoxTitleText}>最新新闻</Text>
                    </View>

                    <Text>{this.props.homePage.isLoading ? '正在加载' : ''}</Text>

                    <FlatList data={homePage.homeList.data} keyExtractor={(item, index) => item.id} renderItem={this._renderItem}/>
                </View>
            </PullRefreshScrollView>
        )
    }

    componentDidMount() {
        this.props.dispatch(ajaxHomeData(Util.api.homeList,{
            channelIds: 103,
            count: 6,
            pageSize: 12,
            first: 0
        }));
    }
}
function mapStateToProps(state) {
    const {homePage} = state;

    return {
        homePage
    }
}

export default connect(mapStateToProps)(HomePage);

const styles = {
    homePageView: {
        backgroundColor: '#fff'
    },
    mainNav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 300
    },
    mainNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 80,
        height: 80,
        backgroundColor: '#f1f1f1'
    },
    newsBox:{
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    newsBoxTitle:{
        marginBottom:10,
        paddingLeft:10,
        borderLeftWidth:2,
        borderLeftColor:'#ccc',
        // backgroundColor:'#f1f1f1'
    },
    newsBoxTitleText:{
        color:'#426fee',
        fontSize:16
    },
    newsBoxItem: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    }
}