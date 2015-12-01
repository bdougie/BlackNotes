import React from 'react-native';
import ViewNote from './ViewNote';
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

  viewNote() {
    this.props.navigator.push({
      title: 'The Note',
      component: ViewNote,
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight 
        underlayColor='rgba(192,192,192,1,0.6)'
        onPress={this.viewNote}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.note}> {rowData} </Text>
          </View>
          <Separator />
        </View>
      </TouchableHighlight>
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

