import React from 'react-native';
import EditNote from './EditNote';
import Separator from './../Helpers/Separator';
import AutoLinker from 'autolinker';
import HTMLView from 'react-native-htmlview';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
} = React;

let URLHandler = React.NativeModules.URLHandler;

let styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  titleText: {
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 1
  },
  noteText: {
    padding: 10,
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

    this.setState({title: this.props.noteTitle});
    this.setState({note: this.props.noteText});
  }

  handleURL(url) {
    LinkingIOS.canOpenURL(url, (supported) => {
      if (!supported) {
        URLHandler.open(url);
        console.log(`${url}: will only open on device and not simulator`);
      } else {
        LinkingIOS.openURL(url)
      }
    });
  }

  renderMarkUp() {
    let { noteText } = this.props
    let htmlRenderedNote = AutoLinker.link(noteText, {phone: true, email: true});
    return (
      <View>
        <HTMLView
          value={htmlRenderedNote}
          onLinkPress={(url) => this.handleURL(url) } />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.titleText}>
         {this.state.title}
       </Text>
       <Separator />
       <TouchableHighlight
        style={styles.noteText}
        onPress={this.editNote.bind(this)}>
         {this.renderMarkUp()}
       </TouchableHighlight>
      </View>
    );
  }

  editNote(rowData) {
    let { noteText, noteTitle, noteId } = this.props;

    this.props.navigator.replace({
      component: EditNote,
      passProps: {
        noteText: noteText,
        noteTitle: noteTitle,
        noteId: noteId,
      }
    });
  }
}

ViewNote.propTypes = {
  noteText: React.PropTypes.string.isRequired,
  noteTitle: React.PropTypes.string.isRequired,
  noteId: React.PropTypes.string.isRequired,
}

export default ViewNote;
