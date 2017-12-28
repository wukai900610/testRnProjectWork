import React from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import Util from '../libs/libs';

// const MySettingsScreen = ({navigation}) => (<MyNavScreen banner="Settings Screen" navigation={navigation}/>);

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
    }

    _skip() {
        this.props.navigation.navigate("Details");
    }

    _getList(url,param) {
        return new Promise((resolve, reject) => {
            Util.ajax.get(url,{
                params: param
            }).then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    _renderItem = ({item}) => {
        return <View style={{marginBottom:20}}>
            <TouchableOpacity onPress={this._skip.bind(this)}>
                <Text style={{color:'#333',fontSize:14}}>
                    <Text style={{fontWeight:'bold',color:'#c30c22'}}>[{item.channel}] </Text>
                    {item.title}
                </Text>
                <Text style={{color:'#666',fontSize:10}}>{item.releaseDate}</Text>
            </TouchableOpacity>
        </View>
    };

    render() {
        return (<View style={{
                flex: 1
            }}>
            <View style={{
                    padding:10,
                    width: '100%',
                    height: 300,
                }}>
                <FlatList data={this.state.listData} keyExtractor={(item, index) => item.id} renderItem={this._renderItem}/>
            </View>
        </View>);
    }

    componentDidMount() {
        this._getList('http://xyhb.hebi.gov.cn/api/content/list.jspx',{
            channelIds:103,
            count:12,
            pageSize:12,
            first:0
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
