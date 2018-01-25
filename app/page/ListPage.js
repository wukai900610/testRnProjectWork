import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    FlatList,
    Image,
    Platform
} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';

import { connect } from 'react-redux';
import { createListPageSubStore } from '../actions/actions';

import List from '../components/List';

class ListPage extends React.Component {
    constructor(props) {
        super(props)

        let { navigation, dispatch, listPage } = this.props;
        let params = navigation.state.params;

        //创建初始化栏目数据
        let channelStore = listPage['listPage'+params.channelId];
        if(!channelStore){
            dispatch(createListPageSubStore(params.channelId))
        }
    }

    rendList(){
        const { listPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = listPage['listPage'+params.channelId];

        if(thisListPage){
            return (
                <List {...this.props} />
            )
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.rendList()}
            </View>
        )
    }
}
function mapStateToProps(state) {
    const {listPage} = state;

    return {
        listPage
    }
}

export default connect(mapStateToProps)(ListPage);
