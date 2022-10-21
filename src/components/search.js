import React from 'react';
import EntryList from "./entryList";
import { useParams } from 'react-router-dom';

export function Search(props) {
    const params = useParams();
    
      return (
        <div>
          <EntryList tags={params.tags}/>
        </div>
      )
}