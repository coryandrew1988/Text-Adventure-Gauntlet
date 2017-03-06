import React, { Component } from 'react';
import { ListView as ReactListView } from 'react-native';

export default class ListView extends Component {
  constructor() {
    super();

    this.handleContentSizeChange = () => {
      if (!this.props.shouldLockToBottom) { return; }

      this.refs.listView.scrollToEnd(); return;
    };
  }

  render() {
    return <ReactListView {...this.props}
      ref="listView"
      onContentSizeChange={this.handleContentSizeChange}
    />;
  }
}

Object.assign(ListView, ReactListView);

ListView.propTypes = {
  shouldLockToBottom: React.PropTypes.bool
};
