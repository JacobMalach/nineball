import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function View(props) {
    const[games, setGames] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get('http://localhost:5000/entry/' + params.id)
          .then(response => {
            setGames(response.data.games)
          })
          .catch((error) => {
            console.log(error);
          })
      }, []);

    /*
    const drawImage = () => {

        const ctx = prepCanvas();
        const imgSrc = image;
        var img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        }
        img.src = imgSrc;
      }
    
      const prepCanvas = () => {
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "25px Century Gothic";
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.lineWidth = 2;
        return ctx;
      }

      */
    
      return (
        <div>
          <p>{games.join(", ")}</p>
        </div>
      )
}