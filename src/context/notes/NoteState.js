import React, { useState } from "react";
import NoteContext from "./noteContext";

export const NoteState =  (props) => {
    const host = "http://localhost:5000";
      const notesInitial =[];
  const [notes, setNotes] = useState(notesInitial);
  
  const getNotes =async () => {
    // todo: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')      }
    });
    const json = await  response.json(); 
    setNotes(json);
  };

  // add a note
  const addNote =async (title, description, tag) => {
    // todo: API call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const note =await  response.json();
  // logic to add the note 


    setNotes(notes.concat(note));
  };
  // delete a note
  const deleteNote = async (id) => {
    //api call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      },
    });
    console.log( await response.json());
    // logic
    console.log("Deleted a node", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

     let newNotes =await  JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <div>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  );
};
