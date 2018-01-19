import React from 'react';
import {View, Text} from 'react-native';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homeNavList:[{
                name:'新闻',
                path:'',
                channelId:106,
            }]
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        // return true;
        return false;
    }

    render() {
        return (
            <View style={styles.homeNav}>
                <View style={styles.homeNavBox}>
                    <View style={styles.homeNavItem}>
                        <Text>1</Text>
                    </View>
                    <View style={styles.homeNavItem}>
                        <Text>2</Text>
                    </View>
                    <View style={styles.homeNavItem}>
                        <Text>3</Text>
                    </View>
                </View>
                <View style={styles.homeNavBox}>
                    <View style={styles.homeNavItem}>
                        <Text>4</Text>
                    </View>
                    <View style={styles.homeNavItem}>
                        <Text>5</Text>
                    </View>
                    <View style={styles.homeNavItem}>
                        <Text>6</Text>
                    </View>
                </View>
                <View style={styles.homeNavBox}>
                    <View style={styles.homeNavItem}>
                        <Text>7</Text>
                    </View>
                    <View style={styles.homeNavItem}>
                        <Text>8</Text>
                    </View>
                    <View style={styles.homeNavItem}>
                        <Text>9</Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default HomeNav;

const styles = {
    homeNav: {
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },
    homeNavBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    homeNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // marginLeft: 10,
        // marginRight: 10,
        width: 70,
        height: 70,
        backgroundColor: '#f1f1f1'
    },
}
