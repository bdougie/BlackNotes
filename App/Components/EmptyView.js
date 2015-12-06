import React from 'react-native';

let {
  View,
  Text,
  StyleSheet,
} = React;

let styles = StyleSheet.create({
  emptyView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A9A9A9',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

class EmptyView extends React.Component{
  render() {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>
          Your notes are empty, click the <Text style={styles.boldText}>Create Note</Text> Button to add your first.
        </Text>
      </View>
    );
  }
};

export default EmptyView;
