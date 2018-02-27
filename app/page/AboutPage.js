import React from 'react';
import {View, Text} from 'react-native';

// import Util from '../libs/libs';
import NewInput from '../components/NewInput';

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
            <NewInput placeholder="111" rule={{test:'email',required:true}} />
            <NewInput placeholder="222" rule={{test:'phone'}} />
            <NewInput placeholder="111" rule={{test:/^[\w\W]{3,6}$/,required:true}} />
        </View>);
    }
}
export default AboutPage;
