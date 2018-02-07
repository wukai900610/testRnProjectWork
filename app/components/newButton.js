import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

// style
// textStyle
// onPress

class newButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.button,this.props.style]} onPress={this.props.onPress}>
                    <Text style={[styles.buttonText,this.props.textStyle]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default newButton;

const styles = {
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius:5,
    },
    buttonText: {
        paddingLeft:10,
        paddingRight:10,
        color:'#333',
        fontSize:14
    }
}
