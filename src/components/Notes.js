import React ,{useContext, useEffect,useRef,useState}from 'react'
import noteContext from '../context/notes/noteContext';
import { Noteitem } from './Noteitem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';


export const Notes = (props) => {
    const context=useContext(noteContext);
    const navigation=useNavigate();
    const {notes ,getNotes,editNote}=context;
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    const handleClick=(e)=>{
        console.log('Updating the notes');
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showalert(" Notes Updated Successfully","success");
    }
    useEffect(() => {
      if(localStorage.getItem("token")){
        
     getNotes();
      }else{
        navigation('/login')  ;
        props.showalert(' Please Login to Redirect','danger');
      }
     // eslint-disable-next-line
    },[])
    const updateNote=(currentNote)=>{
       ref.current.click();
       setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    const ref = useRef(null);
    const refClose = useRef(null);
  return (
    <>
    <AddNote showalert={props.showalert}/>
<button type="button" ref={ref} className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Note </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.etitle}  id="etitle" name="etitle" onChange={(e)=>setNote({...note,[e.target.name]:e.target.value})} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text"  className="form-control" name="edescription"value={note.edescription} id="edescription" onChange={(e)=>setNote({...note,[e.target.name]:e.target.value})}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text"  className="form-control" name="etag" id="etag"value={note.etag} onChange={(e)=>setNote({...note,[e.target.name]:e.target.value})}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='row'>
        <h1>Your Notes</h1>
        <div className="row">
            {notes.length===0 && <p>No notes to display</p>}
        {notes.map((note)=>{
            return <Noteitem showalert={props.showalert} key={note._id} updateNote={updateNote} note={note}/>;      
        })}
        </div>
    </div>
    </>
  )
}
