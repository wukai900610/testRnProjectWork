import React from 'react';
import { Dimensions, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { connect } from 'react-redux';
import { createListPageSubStore, ajaxListPageData } from '../actions/actions';

import Immutable from 'immutable';
import Util from '../libs/libs';

import NewsList from '../components/NewsList';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width
};

class ListPageWithTabBar extends React.Component {
    constructor(props) {
        super(props);

        let { navigation, dispatch, listPage } = this.props;
        let navParams = navigation.state.params;

        let routes=[];

        navParams.child.map((item,index)=>{
            routes.push({
                key:(index+1).toString(),
                title:item.name
            })

            //创建初始化栏目数据
            let channelStore = listPage['listPage'+item.channelId];
            if(!channelStore){
                dispatch(createListPageSubStore(item.channelId))
            }
        })

        this.state = {
            index:0,
            routes
        };
    }

    _handleIndexChange = index => {
        const { listPage, navigation, dispatch } = this.props;
        // let { index } = this.state;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+(params.child[index].channelId)];

        let obj = thisListPage.payload;

        this.setState({
            index
        });

        if(thisListPage.listPageData.data.length == 0){
            dispatch(ajaxListPageData(Util.api.list,obj,'refresh'));
        }
    }

    _renderHeader = props => {
        let { navigation } = this.props;
        let navParams = navigation.state.params;

        return (
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                // tabStyle={{width:navParams.child.length <= 2 ? initialLayout.width/2 : 120}}
                tabStyle={{width:initialLayout.width / navParams.child.length}}
                labelStyle={styles.label}
            />
        )
    };

    _renderScene = ({ route }) => {
        const { listPage, navigation } = this.props;
        let { index } = this.state;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+(params.child[index].channelId)];

        if(thisListPage){
            let props = {
                ...this.props,
                navigation:{
                    ...this.props.navigation,
                    state:{
                        ...this.props.navigation.state,
                        params:params.child[index]
                    }
                }
            }

            return (
                <NewsList {...props}/>
            )
        }
    };

    render() {
        return (
            <TabViewAnimated
                style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}

function mapStateToProps(state) {
    const {listPage} = state;

    return {
        listPage
    }
}

export default connect(mapStateToProps)(ListPageWithTabBar);

const styles = {
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#fff',
        height:45
    },
    // tab: {
    //     width: 200,
    // },
    indicator: {
        backgroundColor: '#2584da',
    },
    label: {
        color: '#333',
        fontWeight: '400',
    }
};
