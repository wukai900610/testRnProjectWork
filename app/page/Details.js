import React from 'react';
import {View, Text} from 'react-native';

class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        const params = navigation.state.params;

        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>{params.id}</Text>
            <Text>{params.title}</Text>
            <Text>{params.releaseDate}</Text>
            <Text>{params.url}</Text>
        </View>);
    }
}
export default Details;
