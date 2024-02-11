import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const [pass,setPassword]=useState(true);
    const [credential, setcredential] = useState({email:"",password:""});
    let history= useNavigate();
    const handleSubmit=async(e)=>{
     e.preventDefault();
        // todo: API call
        const response = await fetch(`http://localhost:4000/api/auth/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email:credential.email,password:credential.password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            localStorage.setItem('token',json.authtoken);
            history('/');
            props.showalert(" Login Successfully","success");
        }else{
            props.showalert(' Invalid Credentials',"danger");
        }
        const response1 = await fetch(`http://localhost:4000/api/auth/getuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            
          });
          const json1= await response1.json();
          console.log(json1);
          localStorage.setItem('userdetail',json1.name);

    }
    // for hiding and displaying the password
   const handlePass=()=>{
    if(pass===true){
    setPassword(false);
      }else{
    setPassword(true); 
      }
    }
   
  return (
    <div className='container'>
        <h1 className='mt-1'>Login to Access iNotebook</h1>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email Address</label>
      <input type="email" className="form-control" id="email" placeholder="xyx@gmail.com" name='email' aria-describedby="emailHelp" vlaue={credential.email} onChange={(e)=>setcredential({...credential,[e.target.name]:e.target.value})}/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type={pass?"password":"text"} className="form-control"name='password' placeholder="Password must be 5 characters" id="password" value={credential.password} onChange={(e)=>setcredential({...credential,[e.target.name]:e.target.value})} minLength={5}required/>
      <div className="mb-3 form-check">
    <input type="checkbox" onClick={handlePass} className="form-check-input" id="pasword"/>
    <label className="form-check-label" htmlFor="exampleCheck1"  >Check me out</label>
     </div>
    </div>
    <button type="submit" className="btn btn-primary" disabled={credential.password<5}>Login</button>
  </form>
  </div>
  )
}
