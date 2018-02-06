import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                <TouchableOpacity style={styles.searchBox}
                    onPress={this._goToPage.bind(this)}>
                    <Ionicons
                        style={styles.searchBtn}
                        name='ios-search'
                        size={26}
                        onPress={()=> {
                        }}/>
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
