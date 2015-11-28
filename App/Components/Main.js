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
  button: {
    flex: 1,
    padding: 15,
    height: 46,
    backgroundColor: "#555555",
    borderColor: "#555555",
    borderWidth: 1,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    alignSelf: "center"
  },
  footerContainer: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Main extends React.Component{
  constructor(props) {
    super(props);
  }

  onButtonPress() {
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
          onPress={this.onButtonPress.bind(this)}
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
        <Notes />
        {this.footer()}
      </View>
    )
  }

};

export default Main;

