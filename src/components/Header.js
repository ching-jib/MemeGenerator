import React from "react";
import "../styles/Meme.css";

export default function Header() {
  return (
    <header className="header">
      <img src="./images/troll.png" alt="troll" className="header-image" />
      <h2 className="header-title">Meme Generator</h2>
    </header>
  );
}
