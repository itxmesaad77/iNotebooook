import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'

export const Navbar = (props) => {
    const  location = useLocation();   
    const navigate=useNavigate();
    const handleSignOut=(e)=>{
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("userdetail");
      navigate('/login');
      props.showalert(" You have successfully sign out from inotebook","success");
        }
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark  " >
    <div className="container-fluid">
    <Link className="navbar-brand" to="/" >iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link  className={`nav-link ${location==="/"?"active":""}`} to="/" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location==="/about"?"active":""}`} to="/about" >About</Link>
        </li>    
      </ul>
      {!localStorage.getItem("token")?
  <form className="d-flex" role="search">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
      </form>:<><p className='text-light m-2 '>{localStorage.getItem("userdetail")}</p> 
      <Link className="btn btn-primary"  role="button" onClick={handleSignOut}>Log Out</Link>
      </>}
    </div>
  </div>
</nav>
    </div>
  )
}
