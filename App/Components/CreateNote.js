import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} = React;

let styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  emptyTouch: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInput: {
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 1
  },
  noteInput: {
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 18
  },
});

class CreateNote extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      note: '',
      title: '',
      error: '',
    }
  }

  handleTitleChange(e) {
    this.setState({
      title: e.nativeEvent.text
    })
  }

  handleBodyChange(e) {
    this.setState({
      note: e.nativeEvent.text
    })
  }

  handleSubmit() {
    let note = this.state.note;
    let title = this.state.title;
    this.setState({
      note:'',
      title:'',
    });
    api.addNote(note, title);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.titleInput}
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
          placeholder="Title" />
       <Separator />
       <TextInput
        autoFocus={true}
        enablesReturnKeyAutomatically={true}
        style={styles.noteInput}
        value={this.state.note}
        multiline={true}
        onLayout={0,0,300,600}
        onChange={this.handleBodyChange.bind(this)}
        placeholder="Start your note here..." />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            autoCorrect={true}
            underlayColor="#88D4F5">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default CreateNote;

