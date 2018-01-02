import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions，
    Image
} from 'react-native';
import Util from '../libs/libs';

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            banner:[{
                // url:'http://localhost:8080/u/cms/www/201708/241709064xci.jpg'
            }]
        };
    }

    _skip() {
        this.props.navigation.navigate("Details");
    }

    _getList(url, param) {
        return new Promise((resolve, reject) => {
            Util.ajax.get(url, {params: param}).then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            });
        })
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

    render() {
        return (<ScrollView style={styles.homePageView}>
            <ScrollView style={styles.banner} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{width:deviceWidth,height:deviceHeight}}>
                    <Image source={{uri:'http://facebook.github.io/react/img/logo_og.png'}}/>
                </View>
                <View style={{width:deviceWidth,height:deviceHeight}}>
                    <Text>2</Text>
                </View>
            </ScrollView>
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
                <FlatList data={this.state.listData} keyExtractor={(item, index) => item.id} renderItem={this._renderItem}/>
            </View>
        </ScrollView>);
    }

    componentDidMount() {
        //getbanner
        // this._getList(Util.api.homeList, {
        //     channelIds: 135,
        //     count: 5,
        //     first: 0
        // }).then((data) => {
        //     this.setState((state) => {
        //         return {listData: data.data};
        //     });
        // }, (error) => {
        //     console.log(error);
        // });

        this._getList(Util.api.homeList, {
            channelIds: 103,
            count: 6,
            pageSize: 12,
            first: 0
        }).then((data) => {
            this.setState((state) => {
                return {listData: data.data};
            });
        }, (error) => {
            console.log(error);
        });
    }
}
export default HomePage;

const styles = {
    homePageView: {
        backgroundColor: '#fff'
    },
    banner:{
        flex: 1,
        height: 140,
        backgroundColor:'#ccc'
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
