import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.box}>
        <Text> Home</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    box:{
        marginTop: 25,
        backgroundColor:'yellow'
    }
});
export default componentName;
