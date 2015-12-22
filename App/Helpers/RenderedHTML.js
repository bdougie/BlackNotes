import React from 'react-native';

let {
  View,
  Text,
} = React;

export default class RenderedHTML extends React.Component{
  createMarkUp() {
    return {__html: 'First &middot; Second'};
  }

  render() {
    return (
      <Text
        className='RenderedHTML'
        dangerouslySetInnerHTML={this.createMarkUp()} />

    );
  }
};
