import React from 'react';
import { Notes } from './Notes';


export const Home = (props) => {

  return (
    <div className='container my-3'>
      <h1 className='text-center'>iNotebook - Save Your Imaginations</h1>
       <Notes showalert={props.showalert}/> 
    </div>
  )
}
