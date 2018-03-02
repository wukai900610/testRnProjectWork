import React from 'react';
import {View, Text, TouchableOpacity, Image, PixelRatio} from 'react-native';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    _goToPage(){
        this.props.navigation.navigate("SearchPage");
    }

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>金电智诚</Text>
                <TouchableOpacity style={styles.searchBox} onPress={this._goToPage.bind(this)}>
                    <Image source={require('../images/search.png')} style={{width:44 / PixelRatio.get(),height: 44 / PixelRatio.get()}} />
                </TouchableOpacity>
            </View>
        );
    }
}
export default Header;

const styles = {
    header:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
        backgroundColor:'#2795ee',
    },
    headerText:{
        color:'#fff',
        fontSize:16
    },
    searchBox: {
        position:'absolute',
        right:10,
        top:0,
        width:50,
        height:50,
        zIndex:10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'#ccc',
    },
    searchBtn: {
        color:'#fff'
    }
}
