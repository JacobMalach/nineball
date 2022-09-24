import React, { Component } from 'react';
import axios from 'axios';

const Entry = props => (
  <tr>
    <td>{props.entry.games}</td>
  </tr>
)

export default class EntryList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
  }

  componentDidMount() {
    
    axios.get('http://localhost:5000/entry/')
      .then(response => {
        this.setState({ entries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  entryList() {
    return this.state.entries.map(entry => {
      return <p>{entry.games.join(", ")}</p>;
    })
  }


  render() {
    return (
      <div>
        <h3>Entry List</h3>
        {this.entryList()}
      </div>
    )
  }
}