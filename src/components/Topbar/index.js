import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}> 班级列表 </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor:'#4cf73f'
    },
    txt:{
      fontSize:20,
      fontWeight:'600'
    }
});
export default Topbar;
