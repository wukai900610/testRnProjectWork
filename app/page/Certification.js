import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import NewButton from '../components/NewButton';
import SendMessWithInput from '../components/SendMessWithInput';

import Util from '../libs/libs';

class Certification extends React.Component {
    constructor(props) {
        super(props);

        this.state={

        }
    }

    _certificationBtn(){

    }

    render() {
        let outLinkData ={

        }

        return (
            <View style={styles.Certification}>
                <View style={styles.isCertificationView}>
                    <Text style={styles.isCertificationViewText}>未认证</Text>
                </View>
                <View style={styles.Label}>
                    <SendMessWithInput outLinkData={outLinkData} ref={(e) => {this.authCode = e;}}/>
                </View>
                <NewButton title="点击认证" style={styles.CertificationBtn} textStyle={styles.CertificationBtnText} onPress={()=>{this._certificationBtn()}} />
            </View>
        );
    }
}
export default Certification;

const styles = {
    Certification: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding:10,
        backgroundColor:'#fff'
    },
    isCertificationView:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,
        width:'100%',
        height:150,
        backgroundColor:'#e1e1e1'
    },
    isCertificationViewText:{
        color:'#666',
        fontSize:20
    },
    Label: {
        marginBottom:10,
        flexDirection: 'row',
    },
    CertificationBtn: {
        marginBottom: 10,
        height: 40,
        backgroundColor: '#2795ee'
    },
    CertificationBtnText: {
        color:'#fff',
        fontSize:16
    },
}
