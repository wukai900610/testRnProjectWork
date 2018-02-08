import React from 'react';
import {
    View
} from 'react-native';

import { connect } from 'react-redux';
import { createGsListPageSubStore, ajaxGsListPageData, GsSearch } from '../actions/actions';
import Util from '../libs/libs';

import GsList from '../components/GsList';
import ListSearchBox from '../components/ListSearchBox';

class GsListPage extends React.Component {
    constructor(props) {
        super(props)

        let { navigation, dispatch, gsListPage } = this.props;
        let params = navigation.state.params;

        //创建初始化栏目数据
        let channelStore = gsListPage[params.type];
        if(!channelStore){
            dispatch(createGsListPageSubStore(params.type))
        }
    }

    rendList(){
        const { gsListPage, navigation } = this.props;
        let params = navigation.state.params;
        let thisListPage = gsListPage[params.type];

        if(thisListPage){
            return (
                <GsList {...this.props} />
            )
        }
    }

    search(){
        const { gsListPage, navigation, dispatch } = this.props;
        let params = navigation.state.params;
        let thisListPage = gsListPage[params.type];
        let {payload} = thisListPage;
        let keyword = this.listSearchBox.newInput.state.text;

        dispatch(GsSearch(keyword,payload));
        dispatch(ajaxGsListPageData(Util.api.selectSgsInfo,payload,'refresh'));
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ListSearchBox ref={(e) => {this.listSearchBox = e;}} {...this.props} search={()=>{this.search()}} />
                {this.rendList()}
            </View>
        )
    }
}
function mapStateToProps(state) {
    const {gsListPage} = state;

    return {
        gsListPage
    }
}

export default connect(mapStateToProps)(GsListPage);
