import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Entry = props => (
  <div>
    <Link to={"/view/" + props.entry._id}>
      <img src={props.entry.image} width="400" height="400" class="mt-5  border border-3 border-dark"></img>
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

    if (this.props.tags !== "null") {
      axios.get('https://backend-production-fc5e.up.railway.app/entry/search/' + this.state.skip + '/' + this.props.tags)
      .then(response => {
        this.setState({ entries: [...this.state.entries, ...response.data], loaded: true, skip: this.state.skip + 6 })
      })
      .catch((error) => {
        console.log(error);
      })

    console.log(this.state.skip)
    } else {
      axios.get('http://localhost:5000/entry/' + this.state.skip)
        .then(response => {
          this.setState({ entries: [...this.state.entries, ...response.data], loaded: true, skip: this.state.skip + 6 })
        })
        .catch((error) => {
          console.log(error);
        })

      console.log(this.state.skip)
    }
  }

  entryList() {
    return <div class="container">
      <div class="row"> 
        {this.state.entries.map(currentEntry => {
          return <div class="col"><Entry entry={currentEntry} key={currentEntry._id}/></div>;
        })}
      </div>
    </div> 
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
          <div class="text-center">
            {this.state.loaded ? this.entryList() : ""}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}