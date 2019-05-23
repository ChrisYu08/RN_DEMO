import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
 
// 获取屏幕的宽和高
let {width,height} = Dimensions.get('window');
var AV = require('leancloud-storage');
let APP_ID="JNCQMa1Gt7FOwKHy6DsuBtkv-gzGzoHsz";
let APP_KEY="ykgoI5tWOVIMUyaBP5u5wJ86"; 
let defaultHeadset=require('../../img/emptyHead.png');
let liHeadSET=require('../../img/head.jpg');
let ChrisHead=require('../../img/1.jpg');
class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      account:'',
      password:'',
      show:true,
      head:defaultHeadset
    }
  }
  signIn=()=>{
    let {account,password} = this.state;
    const { navigate } = this.props.navigation;
    let data=[];
    var query = new AV.Query('LoginApp');
    // query.descending('createdAt'); //降序
        //请求登录
        query.find().then((results) => {
          results.forEach((e) => {
            var name = e.get('name');
            var password= e.get('password');
            data.push({
              name,
              password
            });
          });
          //判断登录
          if(!!account&&!!password){
            let canPass=false;
            data.forEach((e,i)=>{
              if(e.password==password && e.name==account){
                canPass=true
                
              }
            })
            if(canPass){
              this.refs.toast.show('登录成功');
              setTimeout(() => {
                navigate('List', { account,password });
              }, 200);
            }else{
              this.refs.toast.show('用户名或密码不正确');
            }
          }else{
            this.refs.toast.show('用户名或密码不正确');
          }
          this.setState({
            data,
            account:'',
            password:''
          })

        }).catch(function (error) {
            alert(JSON.stringify(error));
            this.setState({
              account:'',
              password:''
            })
          });
    
  }
  openWchat=()=>{
    this.refs.toast.show('wechat功能还没开通/(ㄒoㄒ)/~~');
  }
  openQQ=()=>{
    this.refs.toast.show('QQ功能还没开通/(ㄒoㄒ)/~~');
    
  }
  changeText=(value)=>{
    if(value=='liying' || value=='ly' ){
      this.setState({
        head:liHeadSET
      })
    }else if(value=='Chris'){
      this.setState({
        head:ChrisHead
      })
    }else{
      this.setState({
        head:defaultHeadset
      })
    }
    this.setState({
      account:value
    })
  }
  changePassword=(value)=>{
    this.setState({
      password:value
    })
  }
  goRegister=()=>{
    let {account,password} = this.state;
    const { navigate } = this.props.navigation;
    navigate('Register', { account,password });
  }
  componentDidMount(){
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
  }
    render() {
      let {show} = this.state;
        return (
            <View style={styles.container}>
            <Toast 
              ref="toast"
              position='bottom'
              positionValue={200}
              style={{backgroundColor:'grey'}}
              // textStyle={{color:'red'}}
            />
                {/*头像*/}
                <Image
                    style={styles.iconStyle}
                    source={this.state.head}/>
 
                {/*账号和密码*/}
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={'请输入用户名'}
                    // keyboardType='numeric'
                    value={this.state.name}
                    autoCapitalize={'none'}
                    onChangeText={this.changeText}
                    onFocus={()=>{
                      this.setState({
                        show:false
                      })
                    }}
                    onEndEditing={()=>{
                      this.setState({
                        show:true
                      })
                    }}
                    />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='请输入密码'
                    // keyboardType='numeric'
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                    password={true}
                    value={this.state.password}
                    onChangeText={this.changePassword}
                    onFocus={()=>{
                      this.setState({
                        show:false
                      })
                    }}
                    onEndEditing={()=>{
                      this.setState({
                        show:true
                      })
                    }}
                    />
 
                {/*登录*/}
                <TouchableOpacity activeOpacity={1} onPress={this.signIn}>
                  <View style={styles.loginBtnStyle}>
                      <Text style={{color:'white'}}>登录</Text>
                  </View>
                </TouchableOpacity>
                {/*设置*/}
                <View style={styles.settingStyle}>
                    <Text></Text>
                    <TouchableOpacity activeOpacity={1} onPress={this.goRegister}>
                      <Text>新用户注册</Text>
                    </TouchableOpacity>
                </View>
 
                {/*其他的登录方式*/}
                {show?
                  <View style={styles.otherStyle}>
                    <Text>其他登录方式：</Text>
                    <TouchableOpacity activeOpacity={1} onPress={this.openWchat}>
                      <Image style={styles.otherImageStyle} source={require('../../img/wechat.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={this.openQQ}>
                      <Image style={styles.otherImageStyle} source={require('../../img/qq.png')}></Image>
                    </TouchableOpacity>
                    {/* <Image style={styles.otherImageStyle} source={require('../../img/1.jpg')}></Image> */}
                </View>
                :
                  null
                }
                
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        marginTop:'10%',
        flex: 1,
        // 侧轴的对齐方式
        alignItems:'center',
        backgroundColor: '#dddddd'
    },
    iconStyle: {
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:2,
        borderColor:'white',
        marginTop:50,
        marginBottom:50
    },
    textInputStyle: {
        width:width,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        marginBottom:1
    },
    loginBtnStyle: {
        width: width*0.9,
        height: 40,
        backgroundColor:'#5a98de',
        alignItems:'center',
        justifyContent:'center',
        marginTop:40,
        marginBottom: 20,
        borderRadius:10
    },
    settingStyle: {
        width: width*0.95,
        height: 40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    otherStyle: {
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        zIndex:0,
        bottom:30,
        left: 20
    },
    otherImageStyle: {
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:10
    }
  })
  export default Login;