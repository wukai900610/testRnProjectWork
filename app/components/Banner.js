import React from 'react';
import {View, Text} from 'react-native';
import Swiper from 'react-native-swiper';

class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            banner:[{
                name:'banner1',
                id:1
            },{
                name:'banner2',
                id:2
            }],
            height:this.props.height ? this.props.height : 160
        };
    }

    _renderItem(dataArr){
        let itemArr=[];
        for(var i=0; i<dataArr.length; i++){
            itemArr.push(
                <View
                    style={styles.slide}
                    key={dataArr[i].id}
                    title={<Text numberOfLines={1}>{dataArr[i].name}</Text>}>
                    <Text style={styles.text}>{dataArr[i].name}</Text>
                </View>
            );
        }

        return itemArr;
    }

    render() {
        return (
            <View style={styles.banner}>
                <Swiper
                    style={{height:this.state.height}}
                    paginationStyle={{
                      bottom: -23, left: null, right: 30
                    }}>
                    {this._renderItem(this.state.banner)}
                </Swiper>
            </View>

        );
    }
}
export default Banner;

const styles = {
    banner:{
        marginBottom:30
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}
