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

import Util from '../libs/libs';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // const {dispatch, homePage, navigation} = this.props;

        return (
            <View>
                <Text>
                    SearchPage
                </Text>
            </View>
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

export default SearchPage;

const styles = {
    SearchPage: {
    }
}
