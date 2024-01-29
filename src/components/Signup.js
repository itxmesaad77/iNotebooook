import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup =  (props) => {
    const [password, setPassword] = useState(true);
    const [confirmpassword, setConfirmPassword] = useState(true);
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
 const navigate=useNavigate();
    // view the password(
const handlePass=()=>{
if(password===true){
    setPassword(false);
}else{
    setPassword(true);
}
}
const handleConfirmPass=()=>{
    if(confirmpassword===true){
        setConfirmPassword(false);
    }else{
        setConfirmPassword(true);
    }
    }

  // submitting the form 
    const handleSubmit = async(e)=>{
    e.preventDefault();
    if(credentials.cpassword===credentials.password){
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
      const json= await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate('/login');
        props.showalert(" Succcessfully created an account","success");
    }else{
        props.showalert(" Please enter the correct credentials i.e: change an email","danger");
        }
    }else{
        props.showalert(" Password and confirm password are differnet","danger")
    }
   
   }
 
  return (
    <div className='container'>
        <h1>Create an account to use iNotebook</h1>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
  <label htmlFor="name" className="form-label">Enter Your Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={(e)=>setcredentials({...credentials,[e.target.name]:e.target.value})} placeholder="John Wick"/>
    <label htmlFor="email" className="form-label">Enter Your Email</label>
    <input type="email" className="form-control" value={credentials.email} onChange={(e)=>setcredentials({...credentials,[e.target.name]:e.target.value})} id="email" name="email" aria-describedby="emailHelp" placeholder="xyz@gmail.com" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type={password?"password":"text"} className="form-control" name="password" onChange={(e)=>setcredentials({...credentials,[e.target.name]:e.target.value})}value={credentials.password} id="password"minLength={5} placeholder='Password must be atleast 5 character' required/>
    <div className="mb-3 form-check">
    <input type="checkbox"onClick={handlePass} className="form-check-input" id="passord"/>
    <label className="form-check-label" htmlFor="exampleCheck1" >Check me out</label>
  </div>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type={confirmpassword?"password":"text"} className="form-control"value={credentials.cpassword} name="cpassword" onChange={(e)=>setcredentials({...credentials,[e.target.name]:e.target.value})} id="cpassword" minLength={5}placeholder='Confirm your password' required/>
    <div className="mb-3 form-check">
    <input type="checkbox" onClick={handleConfirmPass} className="form-check-input" id="cpasword"/>
    <label className="form-check-label" htmlFor="exampleCheck1"  >Check me out</label>
  </div>
  </div>
  <button type="submit" disabled={credentials.password.length<5|| credentials.cpassword<5} className="btn btn-primary" >SignUp</button>
   </form>
    </div>
  )
}
