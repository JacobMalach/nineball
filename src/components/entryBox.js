import React from 'react';

export class EntryBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
    
  handleChange(e) {
    const g = e.target.value;
    this.setState({
        game: g
    })
  }

  handleClick() {
    const game = this.state.game;
    this.props.onClick(game);
    this.setState({
        game: ""
    })
  }

  render() {
    return (
      <div>
        <h4>Enter Game: </h4>
        <input 
        onChange={this.handleChange} 
        type="text"
        value={this.state.game} />
        <button onClick={this.handleClick}>Add Game</button>
      </div>
    );
  }
}