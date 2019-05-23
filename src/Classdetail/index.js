import React, { Component } from 'react';
import { View, Text,StyleSheet, FlatList,RefreshControl,Image,TouchableHighlight,TouchableOpacity } from 'react-native';
const data={
    amount: 12,
    id: 4,
    num: 4,
    time: "周一 07:00-07:30",
    title: "班级4"
}
class Classdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lastData:{},
        studentData:[
            {   
                id:1,
                img:'',
                name:'John'
            },
            {
                id:2,
                img:'',
                name:'Tom'
            }
        ]
    };
  }
  componentDidMount(){
    let { navigate,state } = this.props.navigation;
    // let param=state.params;
    let param=data;
    this.setState({
        lastData:param
    })
  }
  render() {
      let {title,amount,time}=this.state.lastData;
    const { navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
          <View style={styles.box1}>
            <Text style={styles.txt1}>{title}</Text>
            <Text style={styles.txt2}>{time}</Text>
            <Text style={styles.txt3}>总人数：{amount}</Text>
          </View>
          <View style={styles.sendMessage}>
              <Text style={styles.messageFont}>班级签到</Text>
          </View>
          <View style={{backgroundColor:'white'}}>
              <Text style={styles.studentTitle}>学员({this.state.studentData.length})</Text>
              <View style={styles.listBox}>
              <FlatList 
                data={this.state.studentData}
                keyExtractor={(item)=>{item.id}}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity activeOpacity={0.8} onPress={navigate.bind('','Studentdetail', { data: item })}>
                            <View style={styles.list}>
                                <Image 
                                    source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541829699523&di=ab46cb59b79639c3abeed0c8c7109f7c&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D6aaae3d9163853438ccf8721a312b01f%2F8435e5dde71190ef2946826ac81b9d16fcfa60c1.jpg"}}
                                    style={{width:45,height:45}}
                                ></Image>  
                                <Text style={styles.txt4}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                
            />
              </View>
          </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'white'
    },
    box1:{
        // height:10,
        borderColor:'#bebebe',
        borderTopWidth:0,
        borderBottomWidth:1 ,
        // backgroundColor:'#ffffff',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingTop:8,
        paddingBottom:5
    },
    txt1:{
        fontSize:20,
        marginVertical: 10
    },
    txt2:{
        fontSize:15,
        marginVertical: 5,
        color:'#7f7f7f'
    },
    txt3:{
        fontSize:15,
        marginVertical: 2,
        color:'#7f7f7f'
    },
    sendMessage:{
        // backgroundColor:'#ffffff',
        backgroundColor:'#f4f3f4',
        height:85,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomColor:'#bebebe',
        borderBottomWidth:0.5
    },
    messageFont:{
        fontSize:20,
        color:'#0771FF'
    },
    list:{
        flexDirection:'row',
        marginTop:10,
        marginLeft:10,
        paddingBottom:8,
        borderBottomColor:"rgba(235,242,247,1)",
        borderBottomWidth:1.5,
        alignItems:'center' 
    },
    listBox:{
        // backgroundColor:'#ffffff',
        backgroundColor:'#f4f3f4',
        borderColor:'#bebebe',
        borderTopWidth:1,
        height:'100%'
    },
    txt4:{
        marginLeft:15,
        fontSize:20,
        fontWeight:'300'
    },
    studentTitle:{
        fontSize:22,
        fontWeight:'400',
        color:'#797879',
        marginTop:50,
        marginLeft:10,
        marginBottom:6
    }
});
export default Classdetail;
