import React, { Component } from 'react';
import { ListView as ReactListView } from 'react-native';

export default class ListView extends Component {
  constructor() {
    super();

    this.onLayout = event => {
      this.listViewHeight = event.nativeEvent.layout.height
    };
    this.onContentSizeChange = () => {
      if (!this.props.shouldLockToBottom) { return; }

      this.refs.listView.scrollTo({
        y: this.refs.listView.getMetrics().contentLength - this.listViewHeight
      })
    };
  }

  render() {
    return <ReactListView {...this.props}
      ref="listView"
      onLayout={this.onLayout}
      onContentSizeChange={this.onContentSizeChange}
    />;
  }
}

Object.assign(ListView, ReactListView);
