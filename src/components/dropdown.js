import React from 'react';

export default class Dropdown extends React.Component {
  render() {
    const options = this.props.options.map((option, idx) => {
      return (
        <option key={option.key} value={option.key}>{option.slug}</option>
      )
    })
    if (!this.props.selected) {
      return null
    }
    return (
      <select
        value={this.props.selected}
        onChange={this.props.onChange}
      >
        {options}
      </select>
    );
  }
}
