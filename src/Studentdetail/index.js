import React, { Component } from 'react';
import { View, Text,StyleSheet, FlatList,RefreshControl,Image } from 'react-native';
const data={
    amount: 12,
    id: 4,
    num: 4,
    time: "周一 07:00-07:30",
    title: "班级4"
}
class Studentdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lastData:{},
        studentData:[
            {   
                id:1,
                title:'数学六年级竞赛',
                time:'07:00-07:30'
            },
            {
                id:2,
                title:'数学六年级竞赛',
                time:'07:00-07:30'
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
    // const { navigate,getParam } = this.props.navigation;
    return (
      <View>
          <View style={styles.box1}>
            <Image 
                source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541829699523&di=ab46cb59b79639c3abeed0c8c7109f7c&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D6aaae3d9163853438ccf8721a312b01f%2F8435e5dde71190ef2946826ac81b9d16fcfa60c1.jpg"}}
                style={{width:70,height:70}}
            ></Image>
            <Text style={styles.studentName}>Bo Obama</Text>  
            {/* <Text style={styles.txt1}>{title}</Text>
            <Text style={styles.txt2}>{time}</Text>
            <Text style={styles.txt3}>总人数：{amount}</Text> */}
          </View>
          <View style={styles.sendMessage}>
              <Text style={styles.messageFont}>18701549155</Text>
          </View>
          <View>
              <Text style={styles.studentTitle}>所属班级</Text>
              <View style={styles.listBox}>
              <FlatList 
                data={this.state.studentData}
                keyExtractor={(item)=>{item.id}}
                renderItem={({item})=>{
                    return(
                        // <TouchableHighlight underlayColor='#E1F6FF' onPress={navigate.bind('','Classdetail', { data: item })}>
                            <View style={styles.list}>
                                <Text style={styles.txt4}>{item.title}</Text>
                                <Text style={styles.txt5}>{item.time}</Text>
                            </View>
                        // </TouchableHighlight>
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
    box1:{
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#bebebe',
        borderTopWidth:1,
        borderBottomWidth:1 ,
        backgroundColor:'#ffffff',
        marginTop: 10,
        padding: 10,
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
        backgroundColor:'#ffffff',
        height:65,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#bebebe',
        borderBottomWidth:0.5,
        paddingHorizontal:30
    },
    messageFont:{
        fontSize:15,
        color:'#5dcbe8'
    },
    list:{
        marginTop:10,
        marginLeft:10,
        paddingBottom:8,
        borderBottomColor:"#999999",
        borderBottomWidth:1
    },
    listBox:{
        backgroundColor:'#ffffff',
        borderTopColor:'#bebebe',
        borderTopWidth:1
    },
    txt4:{
        marginLeft:10,
        fontSize:20,
        fontWeight:'300'
    },
    studentTitle:{
        fontSize:20,
        fontWeight:'400',
        color:'#797879',
        marginTop:50,
        marginLeft:10,
        marginBottom:6
    },
    txt5:{
        marginLeft:10,
        marginTop:10,
        fontSize:14,
        color:'#807f80'
    },
    studentName:{
        fontSize:15,
        margin:10
    }
});
export default Studentdetail;

