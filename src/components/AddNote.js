import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

export const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""}) 
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showalert(" Added a Note Succcessfully ","success");
    }
  return (
<div className='container'>
    <h1>Add  a  Note</h1>
    <form className='my-3' onSubmit={handleClick}>
<div className="mb-3">
     <label htmlFor="title" className="form-label">Title</label>
     <input type="text" className="form-control"  id="title" name="title" onChange={(e)=>setNote({...note,[e.target.name]:e.target.value})} aria-describedby="emailHelp"value={note.title}  minLength={5} required/>
</div>
 <div className="mb-3">
     <label htmlFor="description" className="form-label">Description</label>
     <input type="text"  className="form-control" name="description" id="description" onChange={(e)=>setNote({...note,[e.target.name]:e.target.value})} value={note.description} minLength={5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text"  className="form-control" name="tag" id="tag" value={note.tag} onChange={(e)=>setNote({...note,[e.target.name]:e.target.value})}/>
  </div>

  <button  type="submit" className="btn btn-outline-primary" >Submit</button>
</form>
    </div>
  )
}
