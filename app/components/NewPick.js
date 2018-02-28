import React from 'react';
import {View, Picker, Modal} from 'react-native';

import NewButton from '../components/NewButton';

class NewPick extends React.PureComponent {
    constructor(props) {
        super(props);

        let {data,selected} = this.props;
        this.state={
            selected:data[selected],
        }
    }

    renderItem(data){
        let arr = [];

        data.map((item,index)=>{
            arr.push(<Picker.Item key={index} label={item.name} value={item.value} />)
        })

        return arr;
    }

    render() {
        let {data} = this.props;
        let {selected} = this.state;

        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.pickVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View style={{
                        position:'absolute',
                        bottom:0,
                        width:'100%',
                        height:200,
                    }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5,backgroundColor:'#efefef'}}>
                            <NewButton title="确定" style={{backgroundColor:'#ccc'}} onPress={()=>{this.props.onConfirm(selected)}} />
                            <NewButton title="取消" style={{backgroundColor:'#ccc'}} onPress={()=>{this.props.onCancel()}} />
                        </View>
                        <View>
                            <Picker
                                selectedValue={selected.value}
                                onValueChange={(type) => {
                                    data.map((item,index)=>{
                                        if(type == item.value){
                                            this.setState({
                                                selected: {
                                                    name:item.name,
                                                    value:item.value
                                                }
                                            })
                                        }
                                    })
                                }}>

                                {this.renderItem(data)}
                            </Picker>
                        </View>

                    </View>
            </Modal>
        );
    }
}
export default NewPick;

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
    status:{
        justifyContent: 'center',
        marginRight:10
    },
    inputText: {
        flex:1,
        paddingLeft:5,
        color:'#363636',
        fontSize:14
    },
    fail:{
        borderColor:'#f00',
    }
}
