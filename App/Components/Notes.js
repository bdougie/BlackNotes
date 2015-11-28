import React from 'react-native';
import api from './../Lib/Api';
import Separator from './../Helpers/Separator';

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
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'column',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Notes extends React.Component{
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      isLoading: true,
      note: '',
      error: ''
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    api.getNotes()
      .then((data) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(data),
          isLoading: false
        });
      });
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
        <Text>Loading notes...</Text>
      </View>
    );
  }

  addNote() {
    api.addNote();
  }

  viewNote() {
    console.log('clicked');
  }

  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.note}> {rowData} </Text>
        </View>
        <Separator />
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    )
  }
};

export default Notes;

