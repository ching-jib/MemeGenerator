import React, { useState, useEffect } from "react";
import "../styles/Meme.css";

export default function Meme() {
  //Store data as an object consisting of Top/Bottom Text and Image
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImages: "http://i.imgflip.com/1bij.jpg",
  });

  //store the API memes once loaded
  const [allMemes, setAllMemes] = useState([]);

  //fetch data from the API
  //useEffect to load once after page renders
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      //setAllMemes to the data response
      //.then((data) => console.log(data))
      .then((data) => setAllMemes(data.data.memes))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getMemeImage = () => {
    //Generate a random number based on the total number of memes from API
    //Update MemeImage when function is called
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    //Access prevstate and only update randomImages
    setMeme((prevState) => ({
      ...prevState,
      randomImages: url,
    }));
  };

  //Event handler - onChange for textbox
  //JS object destructuring
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  };

  //Event handler - onClick for clear textbox
  const handleClearText = () => {
    //Access prevstate and only update topText & bottomText
    setMeme((prevText) => ({
      ...prevText,
      topText: "",
      bottomText: "",
    }));
  };

  return (
    <div className="main">
      <div className="form">
        <input
          type="text"
          className="form-input"
          placeholder="Top Text"
          name="topText"
          value={meme.topText}
          onChange={handleTextChange}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Bottom Text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleTextChange}
        />
        <button className="clear-button" onClick={handleClearText}>
          Clear all texts
        </button>
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImages} alt="memeImage" className="meme-image" />
        <h2 className="memetext-top">{meme.topText}</h2>
        <h2 className="memetext-bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
