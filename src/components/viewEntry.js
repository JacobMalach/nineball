import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function View(props) {
    const[games, setGames] = useState([]);
    const[image, setImage] = useState("");
    const params = useParams();

    useEffect(() => {
        console.log(process.env.REACT_APP_API_URL + '/entry/view/' + params.id)
        axios.get(process.env.REACT_APP_API_URL + '/entry/view/' + params.id)
          .then(response => {
            setGames(response.data.games)
            setImage(response.data.image)
          })
          .catch((error) => {
            console.log(error);
          })
      }, []);
    
      return (
        <div>
          <p>{games.join(", ")}</p>
          <img src={image}></img>
        </div>
      )
}