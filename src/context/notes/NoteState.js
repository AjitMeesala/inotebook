import NoteContext from "./NoteContext.js";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/api/notes/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all note
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    //logic to add a note on client side
    getNotes();
  };

  // delete a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
    });

    const json = await response.json();

    //logic to delete on client side
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit on client side
    for (let i = 0; i < newNotes.length; ++i) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes: notes,
        getNotes: getNotes,
        addNote: addNote,
        deleteNote: deleteNote,
        editNote: editNote,
        setNotes: setNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
