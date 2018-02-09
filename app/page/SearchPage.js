import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import {connect} from 'react-redux';
import { ajaxListPageData, listSearch } from '../actions/actions';

import HomeSearchBox from '../components/HomeSearchBox';
import NewsList from '../components/NewsList';

import Util from '../libs/libs';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    _fetchData(){
        const { listPage, dispatch } = this.props;

        let thisListPage = listPage['listPageSearch'];
        let payload = thisListPage.payload;
        let title = this.listSearchBox.newInput.state.text;


        dispatch(listSearch(title,payload));
        dispatch(ajaxListPageData(Util.api.list,payload,'refresh'));
    }

    render() {
        return (
            <View style={styles.SearchPage}>
                <HomeSearchBox {...this.props} ref={(e) => {this.listSearchBox = e;}} search={()=>{this._fetchData()}} />

                <NewsList {...this.props}/>
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

export default connect(mapStateToProps)(SearchPage);

const styles = {
    SearchPage: {
        flex:1
    },
    SearchBox: {

    }
}
