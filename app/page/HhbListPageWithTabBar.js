import React from 'react';
import { Dimensions, View } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { connect } from 'react-redux';
import { createHhbListPageSubStore, ajaxHhbListPageData, HhbSearch } from '../actions/actions';

import Util from '../libs/libs';

import HhbList from '../components/HhbList';
import ListSearchBox from '../components/ListSearchBox';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width
};

class HhbListPageWithTabBar extends React.Component {
    constructor(props) {
        super(props);

        let { navigation, dispatch, hhbListPage } = this.props;
        let navParams = navigation.state.params;

        let routes=[];

        navParams.child.map((item,index)=>{
            routes.push({
                key:(index+1).toString(),
                title:item.name
            })

            //创建初始化栏目数据
            let channelStore = hhbListPage[item.type];
            if(!channelStore){
                dispatch(createHhbListPageSubStore(item.type))
            }
        })

        this.state = {
            index:0,
            routes
        };
    }

    _handleIndexChange = index => {
        const { hhbListPage, navigation, dispatch } = this.props;

        let params = navigation.state.params;
        let thisListPage = hhbListPage[(params.child[index].type)];

        let obj = thisListPage.payload;

        this.setState({
            index
        });

        if(thisListPage.listPageData.list.length == 0){
            let url;
            if(thisListPage.payload.typeName == 'frhonmd' || thisListPage.payload.typeName == 'zzrhonmd'){
                url = Util.api.lhjc_hob;
            }else{
                url = Util.api.lhjc_heib;
            }

            dispatch(ajaxHhbListPageData(url,obj,'refresh'));
        }
    }

    _renderHeader = props => {
        let { navigation } = this.props;
        let navParams = navigation.state.params;

        return (
            <View>
                <TabBar
                    {...props}
                    scrollEnabled
                    indicatorStyle={styles.indicator}
                    style={styles.tabbar}
                    // tabStyle={{width:navParams.child.length <= 2 ? initialLayout.width/2 : 120}}
                    tabStyle={{width:initialLayout.width / navParams.child.length}}
                    labelStyle={styles.label}
                />

                <ListSearchBox ref={(e) => {this.listSearchBox = e;}} {...this.props} search={()=>{this.search()}} />
            </View>

        )
    };

    search(){
        const { hhbListPage, navigation, dispatch } = this.props;
        let {index}=this.state;

        let params = navigation.state.params.child[index];
        let thisListPage = hhbListPage[params.type];
        let {payload} = thisListPage;
        let keyword = this.listSearchBox.newInput.state.text;

        let url;
        if(payload.typeName == 'frhonmd' || payload.typeName == 'zzrhonmd'){
            url = Util.api.lhjc_hob;
        }else{
            url = Util.api.lhjc_heib;
        }

        dispatch(HhbSearch(keyword,payload));
        dispatch(ajaxHhbListPageData(url,payload,'refresh'));
    }

    _renderScene = ({ route }) => {
        const { hhbListPage, navigation } = this.props;
        let { index } = this.state;
        let params = navigation.state.params;
        let thisListPage = hhbListPage[(params.child[index].type)];

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
                <HhbList {...props}/>
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
    const {hhbListPage} = state;

    return {
        hhbListPage
    }
}

export default connect(mapStateToProps)(HhbListPageWithTabBar);

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
