import React from 'react';
import {View, Text} from 'react-native';

// import Util from '../libs/libs';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>关于我们</Text>
        </View>);
    }
}
export default AboutPage;
