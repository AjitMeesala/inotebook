import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const { title, description } = note;

  const handleDelete = () => {
    deleteNote(note._id);
    props.showAlert("Note deleted successfully.", "success");
  }
  const handleEdit = () => { 
    updateNote(note);
  }

  return (
    <div className="col-md-3 me-1">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body"> 
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={handleEdit}></i>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
