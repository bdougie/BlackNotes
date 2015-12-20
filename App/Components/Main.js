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
    flex: 1,
  },
  margin: {
    marginTop: 50,
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
    flex: 2,
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
        <Text style={styles.margin}/>
        <Notes
          navigator={this.props.navigator} />
        {this.footer()}
      </View>
    )
  }

};

export default Main;
