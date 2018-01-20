import React from 'react';
import {View, Text} from 'react-native';
import Swiper from 'react-native-swiper';

class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            banner: this.props.banner,
            height:this.props.height ? this.props.height : 160
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        // if(this.props.height !== nextProps.height){
        //     return true;
        // }
        return false;
    }

    render() {

        return (
            <View style={styles.banner}>
                <Swiper height={this.state.height} autoplay={true} paginationStyle={{
                      bottom: -23, left: null, right: 30
                    }}>
                    {
                        this.state.banner.map((item,index)=>
                            <View
                                style={styles.slide}
                                key={item.id}
                                title={<Text>{item.name}</Text>}>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        )
                    }
                </Swiper>
            </View>
        );
    }
}
export default Banner;

const styles = {
    banner: {
        flex: 1,
        marginBottom:30
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
}
