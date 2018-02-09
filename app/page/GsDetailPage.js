import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import Util from '../libs/libs';

class GsDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    renderDetails(){
        const {navigation} = this.props;
        const params = navigation.state.params;

        let viewArr=[];
        let frxk = [
            {name:'信用主体名称',field:'xyztmc'},
            {name:'统一社会信用代码',field:'tyshxydm'},
            {name:'组织机构代码',field:'zzjgdm'},
            {name:'工商登记码',field:'gszch'},
            {name:'税务登记号',field:'swdjh'},
            {name:'许可决定文书号',field:'wsh'},
            {name:'项目名称',field:'xmmc'},
            {name:'审批类别',field:'splb'},
            {name:'内容',field:'nr'},
            {name:'许可决定日期',field:'xkrq'},
            {name:'许可截止日期',field:'xkjzrq'},
            {name:'许可机关',field:'xzjg'},
            {name:'地方编码',field:'dfbm'},
            {name:'信息等级',field:'xxdj'},
            {name:'备注',field:'bz'},
        ];
        let frcf = [
            {name:'信用主体名称',field:'xyztmc'},
            {name:'统一社会信用代码',field:'tyshxydm'},
            {name:'组织机构代码',field:'zzjgdm'},
            {name:'工商登记码',field:'gszch'},
            {name:'税务登记号',field:'swdjh'},
            {name:'处罚文书号',field:'wsh'},
            {name:'案件名称',field:'mc'},
            {name:'处罚类别1',field:'cflb1'},
            {name:'处罚类别2',field:'cflb2'},
            {name:'处罚事由',field:'sy'},
            {name:'处罚依据',field:'yj'},
            {name:'处罚结果',field:'jg'},
            {name:'处罚决定日期',field:'cfrq'},
            {name:'处罚机关',field:'xzjg'},
            {name:'地方编码',field:'dfbm'},
            {name:'信息等级',field:'xxdj'},
            {name:'备注',field:'bz'},
        ];
        let zzrxk = [
            {name:'姓名',field:'xyztmc'},
            {name:'证件类型',field:'zjlx'},
            {name:'证件号码',field:'zjhm'},
            {name:'许可决定文书号',field:'wsh'},
            {name:'名称',field:'xmmc'},
            {name:'审批类别',field:'splb'},
            {name:'其他说明',field:'qtsm'},
            {name:'内容',field:'nr'},
            {name:'许可决定日期',field:'xkrq'},
            {name:'许可截止日期',field:'xkjzrq'},
            {name:'许可机关',field:'xzjg'},
            {name:'地方编码',field:'dfbm'},
            {name:'信息等级',field:'xxdj'},
            {name:'备注',field:'bz'},
        ];
        let zzrcf = [
            {name:'姓名',field:'xyztmc'},
            {name:'证件类型',field:'zjlx'},
            {name:'证件号码',field:'zjhm'},
            {name:'处罚文书号',field:'wsh'},
            {name:'案件名称',field:'mc'},
            {name:'处罚类别1',field:'cflb1'},
            {name:'处罚类别2',field:'cflb2'},
            {name:'处罚事由',field:'sy'},
            {name:'处罚依据',field:'yj'},
            {name:'处罚结果',field:'jg'},
            {name:'处罚决定日期',field:'cfrq'},
            {name:'处罚机关',field:'xzjg'},
            {name:'地方编码',field:'dfbm'},
            {name:'信息等级',field:'xxdj'},
            {name:'备注',field:'bz'},
        ];
        let hhbfr = [
            {name:'信用主体名称',field:'qymc'},
            {name:'统一社会信用代码',field:'tyshxydm'},
            {name:'组织机构代码',field:'zzjgdm'},
            {name:'工商登记码',field:'gsdjm'},
            {name:'税务登记号',field:'swdjh'},
            {name:'发生时间',field:'fssj'},
            {name:'事由',field:'sy'},
            {name:'列入名单时间',field:'lrmdsj'},
            {name:'作出决定机关',field:'jdjg'},
        ];
        let hhbzzr = [
            {name:'姓名',field:'xm'},
            {name:'身份证号',field:'sfzh'},
            {name:'事由',field:'sy'},
            {name:'发生时间',field:'fssj'},
            {name:'列入名单时间',field:'lrmdsj'},
            {name:'作出决定机关',field:'jdjg'},
        ];

        let obj;
        if(params.type == 'frhonmd' || params.type == 'frheimd'){
            obj = hhbfr;
        }else if(params.type == 'zzrhonmd' || params.type == 'zzrheimd'){
            obj = hhbzzr;
        }else if(params.type == 'frxk'){
            obj = frxk;
        }else if(params.type == 'frcf'){
            obj = frcf;
        }else if(params.type == 'zzrxk'){
            obj = zzrxk;
        }else if(params.type == 'zzrcf'){
            obj = zzrcf;
        }
        this.newObj=[];
        for(var key in params.detail){
            obj.map((item,index)=>{
                if(key == item.field){
                    this.newObj.push({
                        name:item.name,
                        value:params.detail[key]
                    })
                }
            })
        }

        this.newObj.map((item,index)=>{
            viewArr.push(
                <View key={index} style={styles.tr}>
                    <View style={styles.thead}>
                        <Text>{item.name}</Text>
                    </View>
                    <View style={styles.td}>
                        <Text>{item.value ? item.value : '--'}</Text>
                    </View>
                </View>
            )
        });

        return viewArr;
    }

    render() {
        return (
            <ScrollView style={styles.GsDetailPage}>
                {this.renderDetails()}
            </ScrollView>
        );
    }
}
export default GsDetailPage;

const styles = {
    GsDetailPage:{
        flex:1,
        padding:10,
        backgroundColor:'#fff'
    },
    tr:{
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ccc'
    },
    thead:{
        justifyContent:'center',
        paddingLeft:10,
        height:30,
        backgroundColor:'#f1f1f1'
    },
    td:{
        // alignItems: 'center',
        justifyContent:'center',
        paddingLeft:10,
        height:30,
    }
}
