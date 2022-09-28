import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Entry = props => (
  <tr>
    <td>{props.entry.games}</td>
    <td>
      <Link to={"/view/" + props.entry._id}>
        <img src={props.entry.image} width="200" height="200"></img>
      </Link>
    </td>
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
    return this.state.entries.map(currentEntry => {
      return <Entry entry={currentEntry} key={currentEntry._id}/>;
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