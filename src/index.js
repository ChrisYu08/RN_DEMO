/*
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import List from './List/index';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return ( 
            <View>
                 <List /> 
            </View>
        );
    }
}
 
export default Main;
*/

import Home from './Home';
import List from './List';
import Classdetail from './Classdetail';
import Studentdetail from './Studentdetail';
import Login from './Login';
import Register from './Register';
import LessonList from './LessonList';
import LessonVideo from './LessonVideo';
import {
    createStackNavigator
  } from 'react-navigation';
  import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator.js'
const Main = createStackNavigator({
        Login: { screen: Login,
          navigationOptions: ({navigation}) => ({
              header:null,
              headerTitle:'',
              headerBackTitle:null,
              //linear-gradient(90deg, #32CEFF 0%, #0771FF 100%)
              headerStyle:{},
              headerMode: 'screen',
              headerTitleStyle:{},
              headerTintColor:''
          })
        },
        Register: { screen: Register,
          navigationOptions: ({navigation}) => ({
            headerTitle:'注册',
            headerBackTitle:null,
            //linear-gradient(90deg, #32CEFF 0%, #0771FF 100%)
            headerStyle:{backgroundColor:'#0771FF'},
            headerMode: 'screen',
            headerTitleStyle:{
                fontSize: 20,
                fontWeight:'600',
                color:'white'
            },
            headerTintColor:'white'
          })
        },
        LessonVideo: { screen: LessonVideo,
          navigationOptions: ({navigation}) => ({
            headerTitle:'学员统计',
            headerBackTitle:null,
            //linear-gradient(90deg, #32CEFF 0%, #0771FF 100%)
            headerStyle:{backgroundColor:'#0771FF'},
            headerMode: 'screen',
            headerTitleStyle:{
                fontSize: 20,
                fontWeight:'600',
                color:'white'
            },
            headerTintColor:'white'
          })
        },
        Classdetail: { screen: Classdetail,
                navigationOptions: ({navigation}) => ({
                    headerTitle:'班级详情',
                    headerBackTitle:null,
                    //linear-gradient(90deg, #32CEFF 0%, #0771FF 100%)
                    headerStyle:{backgroundColor:'#0771FF'},
                    headerMode: 'screen',
                    headerTitleStyle:{
                        fontSize: 20,
                        fontWeight:'600',
                        color:'white'
                    },
                    headerTintColor:'white'
                })
        },
        LessonList: { screen: LessonList,
          navigationOptions: ({navigation}) => ({
              headerTitle:'课程列表',
              headerBackTitle:null,
              //linear-gradient(90deg, #32CEFF 0%, #0771FF 100%)
              headerStyle:{backgroundColor:'#0771FF'},
              headerMode: 'screen',
              headerTitleStyle:{
                  fontSize: 20,
                  fontWeight:'600',
                  color:'white'
              },
              headerTintColor:'white'
          })
        },
        List: { screen: List, navigationOptions: ({navigation}) => ({
            headerTitle:'班级',
            headerBackTitle:null,
            headerMode: 'screen',
            headerStyle:{backgroundColor:'#0771FF'},
            headerTitleStyle:{
                fontSize: 20,
                fontWeight:'600',
                color:'white'
            },
            headerTintColor:'white'
        })},
        Studentdetail: { screen: Studentdetail, navigationOptions: ({navigation}) => ({
            headerTitle:'学员详情',
            headerBackTitle:null,
            headerMode: 'screen',
            headerStyle:{backgroundColor:'#0771FF'},
            headerTitleStyle:{
                fontSize: 20,
                fontWeight:'600',
                color:'white'
            },
            headerTintColor:'white'
        })},
    },
    {
        initialRouteName: 'List',
        transitionConfig:()=>({
          // 只要修改最后的forVertical就可以实现不同的动画了。
          screenInterpolator:StackViewStyleInterpolator.forHorizontal,
      })
  
    }
);

  export default Main;