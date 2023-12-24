import React from 'react'
import {Link}  from "react-router-dom"

const Home=()=> {
  return (
    <div>
        <h1>
            Home
        </h1>
        
        <Link to="/anime" className="a">"Wake Up To Reality!"</Link>
      
    </div>
  )
}

export default Home
