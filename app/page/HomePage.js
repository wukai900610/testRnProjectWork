import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    // Dimensions,
} from 'react-native';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

import {connect} from 'react-redux';
import {ajaxHomeData,loadFail} from '../actions/actions';

import Util from '../libs/libs';
import Banner from '../components/Banner';
import HomeNav from '../components/HomeNav';
import HomeList from '../components/HomeList';

// let {
//     height: deviceHeight,
//     width: deviceWidth
// } = Dimensions.get('window');

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onRefresh(PullRefresh) {
        let _this = this;
        setTimeout(function () {
            PullRefresh.onRefreshEnd();
        }, 1000);
    }

    render() {
        const {dispatch, homePage, navigation} = this.props;

        return (
            <PullRefreshScrollView
                ref="PullRefresh"
                style={styles.homePageView}
                onRefresh={this._onRefresh.bind(this)}>

                <TouchableOpacity style={styles.btnFail} onPress={()=> {
                            dispatch(loadFail());
                        }}>
                    <Text>点我加载失败</Text>
                </TouchableOpacity>

                <Banner banner={[1,2,3]}></Banner>

                <HomeNav></HomeNav>

                <HomeList homePage={homePage} navigation={navigation}></HomeList>
            </PullRefreshScrollView>
        )
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(ajaxHomeData(Util.api.homeList,{
            channelIds: 103,
            count: 6,
            pageSize: 12,
            first: 0
        }));
    }
}
function mapStateToProps(state) {
    const {homePage} = state;

    return {
        homePage
    }
}

export default connect(mapStateToProps)(HomePage);

const styles = {
    homePageView: {
        backgroundColor: '#fff'
    }
}
