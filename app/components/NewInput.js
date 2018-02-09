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
                <TextInput {...this.props} style={styles.inputText} value={this.state.text} autoCorrect={false} onChangeText={(text) => {this.setText(text)}} />

                {this.renderClearTextBtn()}
            </View>
        );
    }
}
export default NewInput;

const styles = {
    newInput: {
        flex:1,
        height: 30,
        flexDirection:'row',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#ccc',
        backgroundColor:'#fff',
    },
    clearText:{
        justifyContent: 'center',
        marginRight:10
    },
    inputText: {
        flex:1,
        paddingLeft:5,
        color:'#363636',
        fontSize:14
    }
}
