import React from 'react-native';
import ViewNote from './ViewNote';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';
import Swipeout from 'react-native-swipeout';
import EmptyView from './EmptyView.js';
import LoadingView from './LoadingView.js';
import { filter, indexOf, invert, findKey } from 'lodash';
import Rebase from 're-base';

let base = Rebase.createClass('https://blacknotes.firebaseio.com/testUser/');

let {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 590,
  },
  rowContainer: {
    padding: 10,
  },
  note: {
    flex: 2,
    fontSize: 22,
    padding: 15,
  },
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .1,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  },
});

class Notes extends React.Component{
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      isLoading: true,
      empty: false,
      rawData: {},
      note: '',
      error: '',
      searchText: '',
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.state.searchText === '') {
      this.fetchData();
    }
  }

  filterNotes(searchText, notes) {
    let text = searchText.toLowerCase();
    return filter(notes, (n) => {
      let note = n.body.toLowerCase();
      return note.search(text) !== -1;
    });
  }

  fetchData() {
   api.getNotes()
     .then((data) => {
       this.setState({
         dataSource: this.ds.cloneWithRows(data),
         isLoading: false,
         empty: false,
         rawData: data,
       });
     })
     .catch((error) => {
       console.log(error)
       this.setState({
           empty: true,
         isLoading: false,
       });
     });
  }

  setSearchText(e) {
    let searchText = e.nativeEvent.text;
    this.setState({searchText});

    base.fetch('notes', {
      context: this,
      asArray: true,
      then(data){
        let filteredData = this.filterNotes(searchText, data);
        this.setState({
          dataSource: this.ds.cloneWithRows(filteredData),
          rawData: data,
        });
      }
    });
  }

  renderRow(rowData) {
    let swipeBtns = [{
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
              <Text style={styles.note}> {rowData.title} </Text>
            </View>
            <Separator />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  deleteNote(rowData) {
    this.setState({searchText:''});
    api.deleteNote(rowData, this.noteId(rowData));
  }

  viewNote(rowData) {
    this.props.navigator.push({
      component: ViewNote,
      passProps: {
        noteText: rowData.body,
        noteTitle: rowData.title,
        noteId: this.noteId(rowData),
      }
    });
  }

  noteId(note) {
    let rawData = this.state.rawData;
    return findKey(rawData, note)
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingView />
    }

    if (this.state.empty) {
      return <EmptyView />
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
          placeholder="Search" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
};

export default Notes;

