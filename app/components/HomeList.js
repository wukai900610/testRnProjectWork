import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);
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

    render() {
        const {dispatch, homePage} = this.props;
        let {isLoadSuccess} = homePage;

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
            <View style={styles.newsBox}>
                <View style={styles.newsBoxTitle}>
                    <Text style={styles.newsBoxTitleText}>最新新闻</Text>
                </View>

                <Text>{homePage.isLoading ? '正在加载' : ''}</Text>

                <FlatList data={homePage.homeList.data} keyExtractor={(item, index) => item.id} renderItem={this._renderItem}/>
            </View>
        );
    }
}
export default HomeNav;

const styles = {
    newsBox:{
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    newsBoxTitle:{
        marginBottom:10,
        paddingLeft:10,
        borderLeftWidth:2,
        borderLeftColor:'#ccc'
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
