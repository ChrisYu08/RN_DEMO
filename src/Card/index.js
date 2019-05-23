import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {num,title,amount,time}=this.props;
    return (
      <View style={styles.box1}>
        {/* <Image
            source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541829699523&di=ab46cb59b79639c3abeed0c8c7109f7c&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D6aaae3d9163853438ccf8721a312b01f%2F8435e5dde71190ef2946826ac81b9d16fcfa60c1.jpg"}}
            style={{width:45,height:45}}
        />
        <Text> textInComponent </Text> */}
        <View style={styles.box}>
          <Text style={styles.txt1}>{num+'. '+title}</Text>
          <Text style={styles.txt2}>{time+'.总人数：'+amount}</Text>
        </View>
        {/* <View style={styles.arrow}></View> */}
        <Image 
          source={require('../../img/rightArrow.png')}
          // source={{uri:'rn_rightarrow'}}
          // style={{width:7,height:12,marginLeft:12,alignSelf:'center'}}
          style={{width:7,height:12,alignSelf:'center',position:'absolute',right:16}}
          ></Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        height:90,
        backgroundColor:'#fff',
        marginHorizontal: 20,
        marginVertical:10,
        shadowColor: 'black',
        shadowOpacity: 0.14,
        shadowOffset: {width:0,height:4},
        shadowRadius: 8,
        borderRadius:8,
        elevation:3,
        justifyContent: 'center',

    },
    box:{
      flex:1
    },
    box1:{
      marginBottom:16,
      borderBottomWidth:1.5,
      borderBottomColor:'rgba(235,242,247,1);',
      marginLeft: 20,
      flexDirection: 'row',
    },
    txt1:{
      fontSize:20,
      fontWeight:'400',
      marginVertical:4,
      fontFamily:'PingFangSC-Regular',
    },
    txt2:{
      marginVertical:4,
      fontSize:14,
      color:'rgba(0,0,0,0.5)',
      fontWeight:'300',
      fontFamily:'PingFangSC-Regular',
    },
    arrow:{
          width: 15,
          height: 15,
          borderLeftWidth:3,
          borderColor:'#c7c7cb',
          borderBottomWidth: 3,
          transform: [{rotate:'-135deg'}],
          marginTop:14,
          marginRight:20
    }
});
export default componentName;
