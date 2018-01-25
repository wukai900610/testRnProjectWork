import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView
    // Dimensions,
} from 'react-native';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

import {connect} from 'react-redux';
import {ajaxHomeData,loadFail} from '../actions/actions';

import Util from '../libs/libs';
import HomeHeader from '../components/HomeHeader';
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

    _fetchData(){
        const {dispatch} = this.props;

        dispatch(ajaxHomeData(Util.api.list,{
            channelIds: 103,
            count: 6,
            first: 0
        }));
    }

    _onRefresh(PullRefresh) {
        this._fetchData()

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

                <HomeHeader navigation={navigation}></HomeHeader>

                <ScrollView horizontal={true}>

                    <TouchableOpacity onPress={()=>{navigation.navigate("LoginPage")}}><Text>LoginPage</Text></TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate("RegisterPage")}><Text>RegisterPage</Text></TouchableOpacity>
                </ScrollView>



                <Banner banner={[{
                    name:'banner1',
                    id:1
                },{
                    name:'banner2',
                    id:2
                },{
                    name:'banner3',
                    id:3
                }]}></Banner>

                <HomeNav navigation={navigation}></HomeNav>

                <HomeList homePage={homePage} navigation={navigation}></HomeList>
            </PullRefreshScrollView>
        )
    }

    componentDidMount() {
        this._fetchData()
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
        marginTop: 20,
        backgroundColor: '#fff'
    }
}
