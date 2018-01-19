import React from 'react';
import {View, Text, WebView, Dimensions} from 'react-native';

let WEBVIEW_REF = 'webview';

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

class Details extends React.Component {
    constructor(props) {
        super(props);

        let domain = 'http://10.10.136.56:5050/wap';
        const {navigation} = this.props;
        const params = navigation.state.params;

        this.state={
            // url:params.url.replace('http://localhost:8080',domain)
            url:domain+params.url
        }
    }

    render() {
        const {navigation} = this.props;
        const params = navigation.state.params;
        
        return (<View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {/* <Text>{params.id}</Text>
            <Text>{params.title}</Text>
            <Text>{params.releaseDate}</Text>
            <Text>{params.url}</Text> */}
            <WebView bounces={false}
                ref={WEBVIEW_REF}
                // ref={ webview => { this.webview = webview; } }
                scalesPageToFit={true}
                // startInLoadingState={true}
                // domStorageEnabled={true}
                // javaScriptEnabled={true}
                // onNavigationStateChange={this._onNavigationStateChange.bind(this)}

                // injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
                // onMessage={this.onMessage}

                source={{uri: this.state.url}}
                style={[styles.webview,{width:deviceWidth, height:deviceHeight}]}>
            </WebView>
        </View>);
    }
}
export default Details;

const styles = {
    webview:{
    }
}
