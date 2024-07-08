import React from "react"
import { Routes, Route } from "react-router-dom"
// import { useDispatch } from "react-redux"

import Header from "./components/header.jsx"
import { Main } from '../src/pages/index.js'

// import * as fetches from './redux/slices/index.js'

function App() {

  // const dispatch = useDispatch()
  // React.useEffect( ()  => {
  //    dispatch(fetches.fetchAuthMe())
  // }, [dispatch])

  return ( 
  <>
    <Routes>
        <Route path="/" element={<><Header/><Main/></>  } />
    </Routes>
  </>)
}

export default App;