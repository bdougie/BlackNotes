import React from 'react-native';
import Main from './App/Components/Main';

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

let styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class BlackNotes extends React.Component {
  createNewNote() {
    this.props.navigator.push({
      component: CreateNote,
      title: 'New Note'
    })
  }

  render() {
    return (
      <NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: 'Black Notes',
          component: Main,
        }} />
    );
  }
};

AppRegistry.registerComponent('BlackNotes', () => BlackNotes);

