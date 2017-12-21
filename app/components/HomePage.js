import React from 'react';
import {View, Text, Button} from 'react-native';

// const MySettingsScreen = ({navigation}) => (<MyNavScreen banner="Settings Screen" navigation={navigation}/>);

class HomePage extends React.Component {

    _skip() {
        this.props.navigation.navigate("Details");
    }
    render(navigation) {

        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>这是主页</Text>
            <Button onPress={this._skip.bind(this)} title="去详情"/>
        </View>);
    }
}
export default HomePage;
