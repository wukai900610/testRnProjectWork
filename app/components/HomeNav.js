import React from 'react';
import {View, Text} from 'react-native';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navList:[],
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

            </View>

        );
    }
}
export default HomeNav;

const styles = {
}
