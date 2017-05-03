import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ContentEditable extends Component {
  render() {
    const emitChange = this.emitChange.bind(this);
    return (
      <div
        onInput={emitChange}
        onBlur={emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }
  emitChange() {
    var html = ReactDOM.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
}

export default ContentEditable;
