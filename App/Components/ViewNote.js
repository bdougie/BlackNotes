import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';
import simpleStore from 'react-native-simple-store';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} = React;

let styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
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

class ViewNote extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      note: '',
      title: '',
      error: '',
    }
  }

  componentDidMount() {
    let key = this.props.noteId
    console.log(key);

    this.setState({title: this.props.noteTitle});
    this.setState({note: this.props.noteText});
  }

  handleTitleChange(e) {
    let value = e.nativeEvent.text;
    this.cacheNoteTitle(value);

    this.setState({
      title: value
    });

    api.updateNote(
      value,
      this.state.note,
      this.props.noteId
    );
  }

  handleChange(e) {
    let value = e.nativeEvent.text
    this.cacheNoteText(value);

    this.setState({
      note: value
    });

    api.updateNote(
      this.state.title,
      value,
      this.props.noteId
    );
  }

  cacheNoteTitle(value) {
    simpleStore.save('title', value)
    .catch((error) => console.log('error'));
  }

  cacheNoteText(value) {
    simpleStore.save('notes', value)
    .catch((error) => console.log('error'));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.titleInput}
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
          placeholder="Note Title is empty..." />
       <Separator />
       <TextInput
            style={styles.noteInput}
            value={this.state.note}
            multiline={true}
            onLayout={0,0,300,600}
            onChange={this.handleChange.bind(this)}
            placeholder="Note is empty..." />
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
