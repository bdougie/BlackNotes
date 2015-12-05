import React from 'react-native';
import api from './../Lib/Api';

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
  searchInput: {
    alignItems: 'stretch',
    height: 60,
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
      error: '',
    }
  }

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text
    })
  }

  handleSubmit() {
    let note = this.state.note;
    this.setState({note:''});
    api.updateNote(note, this.props.noteId)
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
       <TextInput
            style={styles.searchInput}
            value={this.props.noteText}
            onChange={this.handleChange.bind(this)}
            placeholder="New Note" />
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
  noteId: React.PropTypes.string.isRequired,
}

export default ViewNote;



