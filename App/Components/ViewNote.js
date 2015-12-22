import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';
import simpleStore from 'react-native-simple-store';
import AutoLinker from 'autolinker';
import HTMLView from 'react-native-htmlview';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} = React;

let ShareManager = React.NativeModules.ShareManager;

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

  share() {
    let noteText = this.state.note;
    ShareManager.note(noteText);
  }

  cacheNoteTitle(value) {
    simpleStore.save('title', value)
    .catch((error) => console.log('error'));
  }

  cacheNoteText(value) {
    simpleStore.save('notes', value)
    .catch((error) => console.log('error'));
  }

  renderMarkUp() {
    let { noteText } = this.props
    let htmlRenderedNote = AutoLinker.link(noteText, {phone: true, email: true});
    return (
      <View style={styles.noteInput}>
        <HTMLView
          value={htmlRenderedNote}
          onLinkPress={(url) => console.log('navigating to: ', url)} />
      </View>
    );
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
          style={styles.noteInput}
          multiline={true}
          onLayout={0,0,300,600}
          onChange={this.handleChange.bind(this)}>
          {this.renderMarkUp()}
        </TextInput>
        <TouchableHighlight
          style={styles.button}
          onPress={this.share.bind(this)}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}>Share</Text>
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
