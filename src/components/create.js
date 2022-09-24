import React, { Component } from 'react';
import { EntryBox } from './entryBox';
import { EnteredItem } from './enteredItem';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };

    this.newGame = this.newGame.bind(this);
    this.removeGame = this.removeGame.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  newGame(game) {
    this.setState({
      games: this.state.games.concat([game])
    })
  }

  removeGame(game) {
    var lst = this.state.games;
    lst = lst.filter(x => x != game);
    this.setState({
      games: lst
    })
  }

  convertImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setImage(reader.result);
    }
    reader.readAsDataURL(file);
}

  onSubmit(e) {
    e.preventDefault();

    const entry = {
      games: this.state.games
    }

    console.log(entry);

    axios.post('http://localhost:5000/entry/add', entry)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <div class="row text-center">
        <div class="col-sm">
          <h3>Create New Entry</h3>
          <EntryBox onClick={this.newGame}/>
          {this.state.games.map(game => <EnteredItem item={game} onClick={this.removeGame}/>)}
        </div>
        <div class="col-md">
          <canvas ref={canvasRef} background style={{border:"black 3px solid"}}/>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="submit" value="Create Nineball" className="btn btn-primary" />
          </div>
        </form>
          </div>
        </div>
    </div>
    )
  }
}