import React from 'react';

export class EntryBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
    
  handleChange(e) {
    const t = e.target.value;
    this.setState({
        tag: t
    })
  }

  handleClick() {
    const tag = this.state.tag;
    this.props.onClick(tag);
    this.setState({
        tag: ""
    })
  }

  render() {
    return (
      <div>
        <h4>Enter Tag: </h4>
        <input 
        onChange={this.handleChange} 
        type="text"
        value={this.state.tag} />
        <button onClick={this.handleClick}>Add Tag</button>
      </div>
    );
  }
}