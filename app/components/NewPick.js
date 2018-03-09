import React from 'react';
import {View, Picker, Modal} from 'react-native';

import NewButton from '../components/NewButton';

class NewPick extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state={
            selected:{
                name:'',
                value:''
            }
        }
    }

    renderItem(data){
        let arr = [];

        data.map((item,index)=>{
            arr.push(<Picker.Item key={index} label={item.name} value={item.value} />)
        })

        return arr;
    }

    renderPick(){
        let {data,selectedIndex} = this.props;
        let selectedValue = data[selectedIndex];

        if(data.length > 0){
            return (
                <Picker
                    selectedValue={selectedValue.value}
                    onValueChange={(type) => {
                        let selected;
                        data.map((item,index)=>{
                            if(type == item.value){
                                selected = {
                                    selectedIndex:index,
                                    name:item.name,
                                    value:item.value
                                }
                            }
                        });
                        this.props.selectChange(selected)
                    }}>

                    {this.renderItem(data)}
                </Picker>
            )
        }
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.pickVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View style={{
                        flex:1,
                        backgroundColor:'rgba(0, 0, 0, 0.5)'
                    }}>
                        <View style={{
                            position:'absolute',
                            bottom:0,
                            width:'100%',
                            height:200,
                            backgroundColor:'#fff'
                        }}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5,backgroundColor:'#efefef'}}>
                                <NewButton title="确定" style={{backgroundColor:'#ccc'}} onPress={()=>{this.props.onConfirm()}} />
                                <NewButton title="取消" style={{backgroundColor:'#ccc'}} onPress={()=>{this.props.onCancel()}} />
                            </View>
                            <View>
                                {this.renderPick()}
                            </View>

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
