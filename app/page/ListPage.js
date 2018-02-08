import React from 'react';
import {
    View
} from 'react-native';

import { connect } from 'react-redux';
import { createListPageSubStore } from '../actions/actions';

import NewsList from '../components/NewsList';

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
                <NewsList {...this.props} />
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
