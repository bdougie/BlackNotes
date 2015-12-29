import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';
import simpleStore from 'react-native-simple-store';
import HTMLView from 'react-native-htmlview';

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
});

class EditNote extends React.Component{
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
         placeholder="Note Title is empty..."/>
       <Separator />
       <TextInput
         value={this.state.note}
         style={styles.noteInput}
         multiline={true}
         onLayout={0,0,300,600}
         onChange={this.handleChange.bind(this)}/>
      </View>
    );
  }
}

EditNote.propTypes = {
  noteText: React.PropTypes.string.isRequired,
  noteTitle: React.PropTypes.string.isRequired,
  noteId: React.PropTypes.string.isRequired,
}

export default EditNote;
