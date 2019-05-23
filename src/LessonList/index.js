import React, { Component } from 'react';
import { View, Text,StyleSheet, FlatList,RefreshControl,Image,TouchableHighlight,TouchableOpacity } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
// const data={
//     amount: 12,
//     id: 4,
//     num: 4,
//     time: "周一 07:00-07:30",
//     title: "班级4"
// }
var AV = require('leancloud-storage');
class LessonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // lastData:{},
        isRefreshing:false,//下拉控制
        /*
        website:https://leancloud.cn/docs/leanstorage_guide-js.html#hash810954180
           第一个参数是 className，第二个参数是 objectId
          var todo = AV.Object.createWithoutData('Todo', '5745557f71cfe40068c6abe0');
           修改属性
          todo.set('content', '每周工程师会议，本周改为周三下午3点半。');
           保存到云端
          todo.save().then(function (todo) {  //保存成功  });
        */
        studentData:[
            // {   
            //     id:1,
            //     class:'羊吃草问题应用',
            //     signInTime:''
            // },
            // {
            //     id:2,
            //     class:'简单四则运算',
            //     signInTime:''
            // }
        ]
    };
  }
  onfresh=()=>{
    let {body,showList}=this.state;
    this.setState({
      isRefreshing:true
    });
    this.init()
  }
  init=()=>{
    this.setState({
      isRefreshing:false
    })
  }
  signIn=(id)=>{
    let { navigate,state } = this.props.navigation;
    let {studentData}=this.state;
    let data=studentData;
    data[id-1].signInTime=new Date().toLocaleString();
    this.setState({
      studentData:data
    })
    this.refs.toast.show('签到成功');
    // var SignIn = AV.Object.extend('SignIn');
    //     var SignInObject = new SignIn();
    //     SignInObject.save({
    //       time:[new Date().toLocaleString()]
    //     }).then((object) => {
    //       alert(7)
    //     }).catch((err)=>{alert(err)})

    // 第一个参数是 className，第二个参数是 objectId
    console.log(state.params.data.objectId)
    var todo = AV.Object.createWithoutData('classList',state.params.data.objectId);
    todo.fetch().then(function () {
      var newLessonList = todo.get('lessonList');// 读取 lessonList
      newLessonList.forEach((e,i)=>{
        if(e.id==id){
          e.signInTime=data[id-1].signInTime
        }
      })
      console.log(newLessonList)
      var todo1 = AV.Object.createWithoutData('classList', state.params.data.objectId);
  // 修改属性
  todo1.set('lessonList',newLessonList);
  // 保存到云端
  todo1.save().then(function (value) {
    // 成功保存之后，执行其他逻辑
    // 获取 objectId
  }, function (error) {alert(error)
    // 异常处理
  });
    // }, function (error) {
      // 异常处理
    });

    /*
        // 第一个参数是 className，第二个参数是 objectId
  var todo = AV.Object.createWithoutData('Todo', '5745557f71cfe40068c6abe0');
  // 修改属性
  todo.set('content', '每周工程师会议，本周改为周三下午3点半。');
  // 保存到云端
  todo.save().then(function (todo));
    */
  }
  componentDidMount(){
    let { navigate,state } = this.props.navigation;
    // let param=state.params;
    // let param=data;
    this.setState({
        // lastData:param,
        studentData:state.params.data.lessonList
    })
  }
  render() {
    const { navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
          {/* <View style={styles.box1}>
            <Text style={styles.txt1}>{title}</Text>
            <Text style={styles.txt2}>{time}</Text>
            <Text style={styles.txt3}>总人数：{amount}</Text>
          </View> */}
          <Toast 
              ref="toast"
              position='bottom'
              positionValue={200}
              style={{backgroundColor:'grey'}}
              // textStyle={{color:'red'}}
            />
          <View style={{backgroundColor:'white'}}>
              <View style={styles.listBox}>
              <FlatList 
                data={this.state.studentData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item)=>{item.id}}
                refreshControl={
                  <RefreshControl 
                      refreshing={this.state.isRefreshing}
                      onRefresh={this.onfresh}
                  />
                }
                renderItem={({item})=>{
                    return(
                        // <TouchableOpacity activeOpacity={0.8} onPress={navigate.bind('','Studentdetail', { data: item })}>
                        <TouchableOpacity activeOpacity={0.8} onPress={navigate.bind('','LessonVideo', { data: item })}>
                            <View style={styles.list}>
                                {/* <Image 
                                    source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541829699523&di=ab46cb59b79639c3abeed0c8c7109f7c&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D6aaae3d9163853438ccf8721a312b01f%2F8435e5dde71190ef2946826ac81b9d16fcfa60c1.jpg"}}
                                    style={{width:45,height:45}}
                                ></Image>   */}
                                <Text style={styles.leftContent}>{"第"+item.id+'讲'+'  '+item.class}</Text>
                                {/* <Text style={styles.txt4}>{item.name}</Text> */}
                                <View style={styles.rightPart}>
                                  <TouchableOpacity activeOpacity={0.8} onPress={this.signIn.bind('',item.id)}>
                                    <Text style={styles.sign}>签到</Text>
                                  </TouchableOpacity>
                                  <Text style={styles.showTime}>{'上次签到:'+item.signInTime}</Text>
                                </View>
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
        // marginTop:10,
        // marginLeft:10,
        // paddingBottom:8,
        borderBottomColor:"rgba(235,242,247,1)",
        borderBottomWidth:1,
        alignItems:'center',
        height:76 ,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        position:'relative'
    },
    listBox:{
        // backgroundColor:'#ffffff',
        backgroundColor:'#f4f3f4',
        // borderColor:'#bebebe',
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
    },
    leftContent:{
      height:22,
      fontSize:16,
      fontFamily:'PingFangSC-Regular',
      fontWeight:'400',
      color:'rgba(0,0,0,0.9)',
      lineHeight:22,
      marginLeft:16
    },
    sign:{
      height:17,
      fontSize:12,
      fontFamily:'PingFangSC-Regular',
      fontWeight:'400',
      color:'rgba(24,141,255,1)',
      lineHeight:17,
      marginTop:25
    },
    rightPart:{
      alignItems:'flex-end',
      position:'absolute',
      right:35
    },
    showTime:{
      height:17,
      fontSize:12,
      fontFamily:'PingFangSC-Regular',
      fontWeight:'400',
      color:'rgba(0,0,0,0.2)',
      lineHeight:17,
      marginTop:10
    }
});
export default LessonList;
