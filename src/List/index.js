import React, { Component } from 'react';
import { View, ScrollView,StyleSheet,RefreshControl,TouchableHighlight,FlatList,TouchableOpacity } from 'react-native';
import Topbar from '../components/Topbar/index';
import Card from '../Card/index';
import { Container, Header, Content, ListItem, CheckBox, Body ,Text, Item } from 'native-base';
var AV = require('leancloud-storage');
const remoteData=[
    // {
    //     id:1,
    //     num:1,
    //     title:'班级1',
    //     amount:12,
    //     time:'周一 07:00-07:30',
    // },
    // {
    //     id:2,
    //     num:2,
    //     title:'班级2',
    //     amount:10,
    //     time:'周二 07:30-08:30',
    // },
    // {
    //     id:3,
    //     num:3,
    //     title:'班级3',
    //     amount:19,
    //     time:'周三 07:00-07:30',
    // },
    // {
    //     id:4,
    //     num:4,
    //     title:'班级4',
    //     amount:15,
    //     time:'周四 07:00-07:30',
    // },
    // {
    //     id:5,
    //     num:5,
    //     title:'班级5',
    //     amount:10,
    //     time:'周五 07:00-07:30',
    // },
]
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onoff:false
    };
  }
  onfresh=()=>{
      this.setState({
          onoff:true
      });
      setTimeout(() => {
          this.setState({
              onoff:false
          })
      }, 2000);
  }
  componentDidMount(){
    let APP_ID="JNCQMa1Gt7FOwKHy6DsuBtkv-gzGzoHsz";
    let APP_KEY="ykgoI5tWOVIMUyaBP5u5wJ86"; 
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
    // var classList = AV.Object.extend('classList');
    //     var classListObject = new classList();
    //     classListObject.save({
    //         id:1,
    //         num:1,
    //         title:'班级1',
    //         amount:12,
    //         time:'周一 07:00-07:30',
    //         lessonList:[{   
    //           id:1,
    //           class:'羊吃草问题应用',
    //           signInTime:'',
    //           studentList:[{   
    //             id:1,
    //             name:'John',
    //             score:59
    //           },
    //           {
    //               id:2,
    //               name:'Tom',
    //               score:78
    //           }]
    //       },
    //       {
    //           id:2,
    //           class:'简单四则运算',
    //           signInTime:'',
    //           studentList:[{   
    //             id:1,
    //             name:'xiaoming',
    //             score:63
    //           },
    //           {
    //               id:2,
    //               name:'liying8',
    //               score:39
    //           }]
    //       }]
        //    }).then((object) => {
        //   this.refs.toast.show('注册成功');
        //   this.setState({
        //     newAccount:{
        //       name:'',
        //       password:''
        //     }
        //   })
        // })
    let data=[];
    var query = new AV.Query('classList');
    query.find().then((results) => {
      results.forEach((e) => {
      //   /** 
      //    *  id:1,
      //       num:1,
      //       title:'班级1',
      //       amount:12,
      //       time:'周一 07:00-07:30',
      //   */
        var id = e.get('id');
        var num= e.get('num');
        var title= e.get('title');
        var amount= e.get('amount');
        var time= e.get('time');
        var objectId=e.get('objectId');
        var lessonList=e.get('lessonList')
        data.push({
          id,
          num,
          title,
          amount,
          time,
          objectId,
          lessonList
        });
      });console.log(data)
      this.setState({
        remoteData:data,
      })

    }).catch(function (error) {
        alert(JSON.stringify(error));
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    let {remoteData}=this.state;
    return (
      <View style={styles.box}>
      <View style={styles.box1}>
        <Text style={styles.title1}>总人数:15</Text>
      </View>
        <View style={styles.scroll}>
            {/* <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.onoff}
                        onRefresh={this.onfresh}
                    />
                }
            > */}
            <FlatList 
                data={remoteData}
                keyExtractor={(item)=>{item.id}}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity activeOpacity={0.8} onPress={navigate.bind('','LessonList', { data: item })}>
                            <View style={{position:'relative'}}>
                            <Card 
                                {...{
                                    num:item.num,
                                    title:item.title,
                                    amount:item.amount,
                                    time:item.time
                                }}
                            />
                            {/* <View style={{position:'absolute',right:50}}>
                              <CheckBox checked={true} color={item.signIn? "#0771FF":"#FF3E3E"} />
                              <Text note style={{marginTop:10}}>{item.signIn?'已签到':'未签到'}</Text>
                            </View> */}
                            </View>
                        </TouchableOpacity>
                    )
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.onoff}
                        onRefresh={this.onfresh}
                    />
                }
            />
            {/* <TouchableHighlight underlayColor='#E1F6FF' onPress={navigate.bind('','Home', { name: 'Jane' })}> */}
                {/* <Card /> */}
            {/* </TouchableHighlight> */}
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
            {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    box:{
      backgroundColor:'white'
    },
    scroll:{
        // height:300,
        paddingTop: 10,
        height:'100%'
    },
    box1:{
        backgroundColor:'#f4f3f4',
        height:60,
        borderBottomWidth: 2,
        borderColor: 'rgba(235,242,247,1);',
        justifyContent: 'center'
    },
    title1:{
        color:'#000000',
        fontSize: 20,
        textAlign:'center',
        fontFamily:'PingFangSC-Regular',
    }
});
export default List;
