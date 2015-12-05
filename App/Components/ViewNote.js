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

class ViewNote extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      error: '',
    }
  }

  handleChange() {
    console.log('noted')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.noteData}</Text>
        <TextInput
        style={styles.input}
        value="WHTA?!"
        onChange={this.handleChange.bind(this)} />
      </View>
    );
  }
}

ViewNote.propTypes = {
  noteData: React.PropTypes.object.isRequired,
}

export default ViewNote;



