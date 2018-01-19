import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
// import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

// import {connect} from 'react-redux';
// import {ajaxHomeData,loadFail} from '../actions/actions';

import Banner from '../components/Banner';

import Util from '../libs/libs';

class GsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // const {dispatch, homePage, navigation} = this.props;

        return (
            <ScrollView style={styles.GsPage}>
                <Banner banner={[{
                    name:'公示banner',
                    id:1
                }]}></Banner>

                <View style={styles.itemBox}>
                    <View style={styles.item}>
                        <Text>
                            1
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            1
                        </Text>
                    </View>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.item}>
                        <Text>
                            1
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            1
                        </Text>
                    </View>
                </View>
                <View style={styles.itemBox}>
                    <View style={styles.item}>
                        <Text>
                            1
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            1
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

// function mapStateToProps(state) {
//     const {homePage} = state;
//
//     return {
//         homePage
//     }
// }

export default GsPage;

const styles = {
    GsPage: {
        paddingTop:20,
        backgroundColor:'#fff'
    },
    itemBox: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft:10,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginRight: 10,
        height: 150,
        backgroundColor: '#f1f1f1'
    }
}
