import React from 'react-native';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} = React;

let styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  text: {
    fontSize: 55,
    color: 'red',
    alignSelf: 'center',
  },
  input: {
    color: 'white',
    backgroundColor: 'red',
  },
});

class CreateNote extends React.Component{
  handleChange() {
    console.log('noted')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hola Mundo!</Text>
        <TextInput
        style={styles.input}
        value="WHTA?!"
        onChange={this.handleChange.bind(this)}
        placeholder="New Note"/>
      </View>
    );
  }
}

export default CreateNote;

