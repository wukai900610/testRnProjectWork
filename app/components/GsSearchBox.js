import React from 'react';
import {View} from 'react-native';

import NewButton from '../components/newButton';
import NewInput from '../components/NewInput';

import { ajaxGsListPageData,GsSearch } from '../actions/actions';
import Util from '../libs/libs';

class GsSearchBox extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    search(){
        const { gsListPage, navigation, dispatch } = this.props;
        let params = navigation.state.params;
        let thisListPage = gsListPage[params.type];
        let {payload} = thisListPage;
        let keyword = this.newInput.state.text;
        dispatch(GsSearch(keyword,payload));
        dispatch(ajaxGsListPageData(Util.api.selectSgsInfo,payload,'refresh'));
    }

    render() {
        return (
            <View style={styles.search}>
                <NewInput ref={(e) => {this.newInput = e;}} style={styles.NewInput} />
                <NewButton title="搜索" style={styles.searchBtn} textStyle={styles.searchBtnText} onPress={()=>{this.search()}} />
            </View>
        );
    }
}
export default GsSearchBox;

const styles = {
    search: {
        flexDirection: 'row',
        padding:10,
        borderRadius:5,
    },
    NewInput: {
        marginRight:10,
    },
    searchBtn: {
        backgroundColor:'#2795ee'
    },
    searchBtnText: {
        color:'#fff'
    }
}
