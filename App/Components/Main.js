import React from 'react-native';
import Notes from './Notes.js'
import CreateNote from './CreateNote'

let {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;


let styles = StyleSheet.create({
  container: {
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 80,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class Main extends React.Component{
  constructor(props) {
    super(props);
  }

  createNote() {
    this.props.navigator.push({
      title: 'New Note',
      component: CreateNote,
    });
  }

  footer() {
    return (
      <View style={styles.footerContatiner}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.createNote.bind(this)}
          underlayColor="#9BAAF3">
            <Text style={styles.buttonText}>Create Note</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <Notes navigator={this.props.navigator} />
        {this.footer()}
      </View>
    )
  }

};

export default Main;
