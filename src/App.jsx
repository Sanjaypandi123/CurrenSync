import { useEffect, useState } from 'react'
import './App.css'

import axios from 'axios'
import Currency from './components/Currency'
import SSUUMMAA from './components/SSUUMMAA'

function App() {




  return (
    <>

    
      <div className="container">
        <Currency />
        {/* <SSUUMMAA/> */}
      </div>
    </>
  )
}

export default App
