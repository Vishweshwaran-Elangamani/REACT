import React from 'react'
import "./Home.css"

import { Link } from 'react-router-dom'
function Home() {
  return (
    <div id="body">
      <div id="card">
        <h1>WELCOME TO PAYROLL</h1>
         <Link to="/App">
         
            <button>
              ENTER PAYROLLS
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Home

