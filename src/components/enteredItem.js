import React from 'react';

export class EnteredItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const item = this.props.item;
    this.props.onClick(item);
  }

  render() {
    return (
      <div>
        <p>{this.props.item}</p>
        <button onClick={this.handleClick} class="btn btn-danger">X</button>
      </div>
    );
  }
}