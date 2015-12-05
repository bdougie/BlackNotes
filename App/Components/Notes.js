import React from 'react-native';
import ViewNote from './ViewNote';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';
import Swipeout from 'react-native-swipeout';
import { invert } from 'lodash';

let {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 50,
    height: 590,
  },
  rowContainer: {
    padding: 10,
  },
  note: {
    flex: 1,
    fontSize: 22,
    padding: 15,
  },
  loading: {
    marginTop: 300,
    marginBottom: 287,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {},
});

class Notes extends React.Component{
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      isLoading: true,
      rawData: {},
      note: '',
      error: ''
    }
  }

  componentDidUpdate() {
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    api.getNotes()
      .then((data) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(data),
          isLoading: false,
          rawData: data,
        });
      })
      .catch((error) => console.log(error));
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
        <Text>Loading notes...</Text>
      </View>
    );
  }

  renderRow(rowData) {
    var swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.deleteNote(rowData) }
    }];

    return (
      <Swipeout right={swipeBtns}
        autoClose='true'
        backgroundColor= 'transparent'>
        <TouchableHighlight
          underlayColor='rgba(192,192,192,1,0.6)'
          onPress={this.viewNote.bind(this, rowData)} >
          <View>
            <View style={styles.rowContainer}>
              <Text style={styles.note}> {rowData} </Text>
            </View>
            <Separator />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  deleteNote(rowData) {
    api.deleteNote(rowData, this.noteId(rowData));
    this.setState({
      isLoading: true,
    });
  }

  viewNote(rowData) {
    this.props.navigator.push({
      title: 'The Note',
      component: ViewNote,
      passProps: {
        noteText: rowData,
        noteId: this.noteId(rowData),
      }
    });
  }

  noteId(noteText) {
    let rawData = this.state.rawData;
    let invertedRawData = invert(rawData);
    return invertedRawData[noteText]
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
};

export default Notes;

