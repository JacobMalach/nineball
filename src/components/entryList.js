import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Entry = props => (
  <div>
    <Link to={"/view/" + props.entry._id}>
      <img src={props.entry.image} width="400" height="400"></img>
    </Link>
  </div>
)

export default class EntryList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      loaded: false,
      skip: 0
    };

    this.getEntries = this.getEntries.bind(this)
  }

  componentDidMount() {
    
    this.getEntries()
      
  }

  getEntries() {
    axios.get('http://localhost:5000/entry/' + this.state.skip)
      .then(response => {
        this.setState({ entries: [...this.state.entries, ...response.data], loaded: true, skip: this.state.skip + 9 })
      })
      .catch((error) => {
        console.log(error);
      })

      console.log(this.state.skip)
  }

  entryList() {
    return this.state.entries.map(currentEntry => {
      return <Entry entry={currentEntry} key={currentEntry._id}/>;
    })
  }

  render() {
    return (
      <div class="container">
        <InfiniteScroll
          dataLength={this.state.entries}
          next={() => this.getEntries()}
          hasMore={true}
          loader={
            <p>loading</p>
          }
          >
            <div>
              {this.state.loaded ? this.entryList() : ""}
            </div>
        </InfiniteScroll>
      </div>
    )
  }
}