import React from 'react';
import {
    View
} from 'react-native';

import { connect } from 'react-redux';
import { createGsListPageSubStore } from '../actions/actions';

import GsList from '../components/GsList';
import GsSearchBox from '../components/GsSearchBox';

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

    render() {
        return (
            <View style={{flex:1}}>
                <GsSearchBox {...this.props} />
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
