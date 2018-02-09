import React from 'react';
import {View} from 'react-native';

import NewButton from '../components/NewButton';
import NewInput from '../components/NewInput';

// import { ajaxGsListPageData,GsSearch } from '../actions/actions';
// import Util from '../libs/libs';

class GsSearchBox extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.search}>
                <NewInput placeholder="请输入关键词" ref={(e) => {this.newInput = e;}} style={styles.NewInput} />
                <NewButton title="搜索" style={styles.searchBtn} textStyle={styles.searchBtnText} onPress={this.props.search} />
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
