import React from "react";
import "./Bodynote.css";
import { useEffect, useState } from "react";

function Bodynote() {
    const [inputText , setInputText] = useState("");
    const [note , setNote] = useState("")

    const handleText = (e) => {
        setInputText(e.target.value);
      };

    const handleClick = () => {
        fetch("http://localhost:3000/api/v1/noteapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Tilte : inputText }),
    });
    setInputText("");
    loadData();
    }

    const loadData = () => {
        fetch("http://localhost:3000/api/v1/noteapp", { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            setNote(data);
          });
      };
  
      const handleDelete = (id) => {
        fetch(`http://localhost:3000/api/v1/noteapp/${id}`, { method: "DELETE" })
          .then((response) => response.json())
          .then((data) => {
            loadData();
          });
      };
    
      useEffect(() => {
        loadData();
      }, []);

  return (
    <div className="container">
      <textarea 
      name="" 
      id="" 
      cols="60" 
      rows="5" 
      className="textNote" 
      placeholder="Title"
      value={inputText}
      onChange={(e) => handleText(e)}
      ></textarea>
      <button className="btn-btn" onClick={handleClick}>+</button>

      <div className="boxText">
        {note.data?.map((e) => (
            <div className="box">
             <div className="tilte">{e.Tilte}</div>
        <button className="btnDelete" onClick={(e) => handleDelete(e.NoteappId)}>
            <i class="fa-solid fa-trash"></i>
        </button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Bodynote;
