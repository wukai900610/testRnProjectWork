import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class NewInput extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state={
            text:''
        }
    }

    setText(text){
        this.setState({
            text:text
        });
    }

    clearText(){
        this.setState({
            text:''
        });
    }

    renderClearTextBtn(){
        if(this.state.text.length > 0){
            return (
                <TouchableOpacity style={styles.clearText} onPress={()=>{this.clearText()}}>
                    <Ionicons color='#666' name='md-close-circle' size={20}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={[styles.newInput,this.props.style]}>
                {this.renderClearTextBtn()}

                <TextInput style={styles.inputText} value={this.state.text} autoCorrect={false} onChangeText={(text) => {this.setText(text)}} />
            </View>
        );
    }
}
export default NewInput;

const styles = {
    newInput: {
        flex:1,
        height: 30,
        justifyContent: 'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#fff',
    },
    clearText:{
        position:'absolute',
        top:5,
        right:8,
        zIndex:1
    },
    inputText: {
        paddingLeft:5,
        marginRight:30,
        color:'#363636',
        fontSize:14
    }
}
