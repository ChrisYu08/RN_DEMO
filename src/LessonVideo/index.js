import React, { Component } from 'react';
import { View, Text,StyleSheet, FlatList,RefreshControl,Image,TouchableHighlight,TouchableOpacity } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
// import Video from 'react-native-video';
class LessonVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      isRefreshing:false,//下拉控制
      studentData:[
        // {   
        //     id:1,
        //     name:'John',
        //     score:59
        // },
        // {
        //     id:2,
        //     name:'Tom',
        //     score:78
        // }
    ]
    };
  }
  pressVideo=()=>{
    let {paused}=this.state;
    this.setState({
      paused:!paused
    })
    // this.player.presentFullscreenPlayer();
  }
  componentDidMount(){
    let { navigate,state } = this.props.navigation;console.log(state.params.data)
    this.setState({
      studentData:state.params.data.studentList
    })
  }
  render() {
    return (
      <View style={styles.container}>
          {/* <Video source={{uri: "https://flv2.bn.netease.com/videolib1/1808/28/ufiAS113z/SD/ufiAS113z-mobile.mp4"}}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            style={styles.fullScreen}//组件样式
            rate={this.state.rate}//播放速率
            paused={this.state.paused}//暂停
            volume={this.state.volume}//调节音量
            muted={this.state.muted}//控制音频是否静音
            resizeMode={this.state.resizeMode}//缩放模式
            onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
            onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
            onEnd={this.onEnd}//视频播放结束时的回调函数
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
            onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
            repeat={false}//确定在到达结尾时是否重复播放视频。 
            fullscreen={true}
            /> */}
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
                        // <TouchableOpacity activeOpacity={0.8} onPress={navigate.bind('','LessonVideo', { data: item })}>
                            <View style={styles.list}>
                                <Image 
                                    source={{uri:"http://n1.itc.cn/img8/wb/recom/2016/04/22/146131935847875919.JPEG"}}
                                    style={{width:44,height:44,borderRadius:22,marginLeft:16}}
                                ></Image>  
                                <Text style={styles.leftContent}>{item.name}</Text>
                                {/* <Text style={styles.txt4}>{item.name}</Text> */}
                                <View style={styles.rightPart}>
                                  {/* <TouchableOpacity activeOpacity={0.8} onPress={this.signIn.bind('',item.id)}> */}
                                    <Text style={styles.sign}>作业得分:</Text>
                                  {/* </TouchableOpacity> */}
                                  <Text style={styles.showTime}>{item.score}</Text>
                                </View>
                            </View>
                        // </TouchableOpacity>
                    )
                }}
                
            />
              </View>
          </View>
      </View>
    );
  }
}

export default LessonVideo;

var styles = StyleSheet.create({
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
      // justifyContent:'space-between',
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
    width:55,
    height:17,
    fontSize:12,
    fontFamily:'PingFangSC-Regular',
    fontWeight:'400',
    color:'rgba(24,141,255,1)',
    lineHeight:17,
    // marginTop:25,
    color:'black'
  },
  rightPart:{
    // alignItems:'flex-end',
    position:'absolute',
    right:35,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  showTime:{
    height:17,
    fontSize:12,
    fontFamily:'PingFangSC-Regular',
    fontWeight:'400',
    color:'rgba(24,141,255,1)',
    lineHeight:17,
  }
});