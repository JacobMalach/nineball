import React, { useState, useEffect, useRef } from 'react';
import { EntryBox } from './entryBox';
import { EnteredItem } from './enteredItem';
import axios from 'axios';

export function Create(props) {

  const[games, setGames] = useState([]);
  const[image, setImage] = useState([]);
  const[cords, setCords] = useState([0, 0]);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    drawImage();
  }, [image])

  const drawImage = () => {

    const ctx = prepCanvas();
    const imgSrc = image;
    var img = new Image();
    img.onload = () => {
      ctx.clearRect(cords[0], cords[1], 210, 210)
      ctx.drawImage(img, cords[0], cords[1], 210, 210);
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

  const newGame = (game) => {
    setGames(games.concat([game]));
  }

  const removeGame = (game) => {
    var lst = games;
    lst = lst.filter(x => x != game);
    setGames(lst);
  }

  const canvasClick = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    setCords(cordHelper(x, y));
    fileRef.current.click()
  }

  const cordHelper = (x, y) => {
    const canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;
    x = Math.floor(x/210) * 210;
    y = Math.floor(y/210) * 210;
    return [x, y]
  }

  const convertImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setImage(reader.result);
    }
    reader.readAsDataURL(file);
}

  const onSubmit = (e) => {
    e.preventDefault();

    const entry = {
      games: games
    }

    console.log(entry);

    axios.post('http://localhost:5000/entry/add', entry)
        .then(res => console.log(res.data));

    window.location = '/';
    
  }

  return (
    <div>
      <div class="row text-center">
        <div class="col-sm">
          <h3>Create New Entry</h3>
          <EntryBox onClick={newGame}/>
          {games.map(game => <EnteredItem item={game} onClick={removeGame}/>)}
          <form onSubmit={(e) => {onSubmit(e)}}>
            <input type="submit" value="Create Nineball" className="btn btn-primary" />
          </form>
        </div>
        <div class="col-md">
          <p>Click to Upload Images</p>
          <canvas 
          ref={canvasRef}
          onClick={canvasClick}
          height="630" 
          width="630" 
          background style={{border:"black 3px solid"}}/>
          <input
            ref={fileRef}
            hidden={true}
            class="form-control w-75 m-1"
            type="file"
            onChange={(e) => {
              convertImage(e);
            }}>
          </input>
        </div>
      </div>
    </div>
  )
}