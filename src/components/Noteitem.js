import React ,{useContext}from "react";
import noteContext from '../context/notes/noteContext';

export const Noteitem = (props) => {

  const context=useContext(noteContext);
  const {deleteNote}=context;
  const { note,updateNote } = props;
  const handleDelete=()=>{
deleteNote(note._id)
props.showalert(" Notes Deleted Successfully","success");
  }
  const handleUpdate=()=>{
    updateNote(note);
  }
  return (
    <div className="col-md-3 my-2">
      <div className=" card  ">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <div className="row justify-content-between ">
          <div className="col-md-2"><i className="fa-sharp fa-solid fa-trash" onClick={handleDelete}></i></div>
          <div className="col-md-2"><i className="fa-solid fa-pen-to-square" onClick={handleUpdate}></i></div>
          </div>
        </div>
      </div> 
    </div>
  );
};
