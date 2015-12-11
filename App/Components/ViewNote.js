import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';

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
    alignItems: 'stretch',
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

class ViewNote extends React.Component{
  constructor(props) {
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

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text
    })
  }

  handleSubmit() {
    let title = this.state.title;
    let note = this.state.note;

    title = title === '' ? this.props.noteTitle : title
    note = note === '' ? this.props.noteText : note

    api.updateNote(title, note, this.props.noteId)
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.titleInput}
          value={this.props.noteTitle}
          onChange={this.handleTitleChange.bind(this)}
          placeholder="Note Title is empty..." />
       <Separator />
       <TextInput
            style={styles.noteInput}
            value={this.props.noteText}
            onChange={this.handleChange.bind(this)}
            placeholder="Note is empty..." />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

ViewNote.propTypes = {
  noteText: React.PropTypes.string.isRequired,
  noteTitle: React.PropTypes.string.isRequired,
  noteId: React.PropTypes.string.isRequired,
}

export default ViewNote;



