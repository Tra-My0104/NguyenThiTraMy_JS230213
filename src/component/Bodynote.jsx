import React from "react";
import "./Bodynote.css";

function Bodynote(props) {
  return (
    <div className="container">
      <textarea name="" id="" cols="60" rows="5" className="textNote" placeholder="Title"></textarea>
      <button className="btn">+</button>
    </div>
  );
}

export default Bodynote;
