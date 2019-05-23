import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text,View } from 'native-base';
import Toast, {DURATION} from 'react-native-easy-toast';
var AV = require('leancloud-storage');
let APP_ID="JNCQMa1Gt7FOwKHy6DsuBtkv-gzGzoHsz";
let APP_KEY="ykgoI5tWOVIMUyaBP5u5wJ86"; 
export default class FloatingLabelExample extends Component {
  constructor(props){
    super(props);
    this.state={
      newAccount:{
        name:'',
        password:'',
        includeName:false
      }
    }
  }
  setPassword=(value)=>{
    let {newAccount}=this.state;
    newAccount.password=value;
    this.setState({
      newAccount
    })
  }
  setAccount=(value)=>{
    let {newAccount}=this.state;
    newAccount.name=value;
    this.setState({
      newAccount
    })
  }
  JudgeRegisterName=()=>{
    let {newAccount}=this.state;
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
          //判断注册名是否重复
          data.forEach((e,i)=>{
            if(e.name==newAccount.name){
              this.refs.toast.show('用户名已存在');
              this.setState({
                includeName:true
              })
            }
          })
          setTimeout(() => {
            this.register()
          }, 100);
        }).catch(function (error) {
            // alert(JSON.stringify(error));
            this.setState({
              name:'',
              password:''
            })
          });
  }
  register=()=>{
    let {newAccount,includeName}=this.state;
    if(includeName) return
    if(newAccount.name && newAccount.password){
      if(!newAccount.name.trim() || !newAccount.password.trim()){
        this.refs.toast.show('输入错误');
      }else{
        var LoginApp = AV.Object.extend('LoginApp');
        var loginObject = new LoginApp();
        loginObject.save({
          name:newAccount.name,
          password:newAccount.password
        }).then((object) => {
          this.refs.toast.show('注册成功');
          this.setState({
            newAccount:{
              name:'',
              password:''
            }
          })
        })
      }
    }else{
      this.refs.toast.show('输入错误');
    }
  }
  componentDidMount(){

  }
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Toast 
              ref="toast"
              position='bottom'
              positionValue={200}
              style={{backgroundColor:'grey'}}
              // textStyle={{color:'red'}}
            />
        <Content style={{marginTop:50}}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input autoCapitalize={'none'} onChangeText={this.setAccount} value={this.state.newAccount.name} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input autoCapitalize={'none'} onChangeText={this.setPassword} value={this.state.newAccount.password} />
            </Item>
          </Form>
          <View style={{width:'100%',marginTop: 50}}>
            <Button onPress={this.JudgeRegisterName} style={{alignSelf:'center'}} rounded>
              <Text>注册</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}