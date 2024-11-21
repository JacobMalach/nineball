import React, { useState, useEffect, useRef } from 'react';
import { EntryBox } from './entryBox';
import { EnteredItem } from './enteredItem';
import axios from 'axios';

export function Create(props) {

  const[tags, setTags] = useState([]);
  const[image, setImage] = useState([]);
  const[cords, setCords] = useState([0, 0]);
  const[filled, setFilled] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const isMounted = useRef(false);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if(isMounted.current) {
      drawImage();
    } else {
      isMounted.current = true;
    }
  }, [image])

  const drawImage = () => {
    var f = [...filled];
    var i = Math.floor(cords[0]/210) + Math.floor(cords[1]/210) * 3;
    f[i] = 1;
    setFilled(f);

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

  const newTag = (tag) => {
    setTags(tags.concat([tag]));
  }

  const removeTag = (tag) => {
    var lst = tags;
    lst = lst.filter(x => x !== tag);
    setTags(lst);
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

const onSubmit = async (e) => {
  e.preventDefault();

  if (!filled.includes(0)) {
    var i = canvasRef.current.toDataURL();
    const entry = {
      games: tags,
      image: i,
    };

    console.log(entry);

    try {
      // Wait for the POST request to complete
      const response = await axios.post(process.env.REACT_APP_API_URL + '/entry/add', entry);
      console.log(response.data);
      
      // Only redirect if the POST request is successful
      window.location = '/';
    } catch (error) {
      console.log('Error submitting the form:', error);
    }
  }
};

  return (
    <div>
      <div class="row text-center">
        <div class="col-sm">
          <h3>Create New Entry</h3>
          <EntryBox onClick={newTag}/>
          {tags.map(tag => <EnteredItem item={tag} onClick={removeTag}/>)}
          <form onSubmit={(e) => {onSubmit(e)}}>
            <input type="submit" value="Create Nineball" className="btn btn-primary" />
          </form>
        </div>
        <div class="col-md">
          <p>Click to Upload Nine Images</p>
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