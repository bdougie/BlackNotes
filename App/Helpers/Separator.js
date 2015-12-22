import React from 'react-native';

let {
  View,
  StyleSheet,
  Text,
} = React;

let styles = StyleSheet.create({
  separator: {
    height: 1,
    width: 400,
    backgroundColor: '#E4E4E4',
    marginLeft: 15,
  },
});

export default class Separator extends React.Component{
  render(){
    return (
      <View style={styles.separator} />
    );
  }
};

