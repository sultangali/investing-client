import React from "react"
import { Routes, Route } from "react-router-dom"
// import { useDispatch } from "react-redux"
import Header from "./components/header.jsx"
import { Calendars, Main, One, Instruments, NewsPage, Registration, Login } from '../src/pages/index.js'
import { useDispatch } from "react-redux";
import * as fetches from './redux/slices/user.js'
// import * as fetches from './redux/slices/index.js'

function App() {

  const dispatch = useDispatch()
  React.useEffect( ()  => {
     dispatch(fetches.fetchAuthMe())
  }, [dispatch])

  const [childData, setChildData] = React.useState(null);
  const [childData2, setChildData2] = React.useState(null);
  const [childData3, setChildData3] = React.useState(null);


  const handleChildData = (data) => {
    setChildData(data?.year);
    setChildData2(data?.time);
    setChildData3(data?.language)
  };

  return ( 
  <>
    <Routes>

        <Route path="/" element={<><Header onDataChange={handleChildData}/><Main currentYear={childData} currentTime={childData2} currentLanguage={childData3} /></>  } />
        <Route path="/investing" element={<><Header onDataChange={handleChildData}/><Main currentYear={childData} currentTime={childData2} currentLanguage={childData3} /></>  } />
        <Route path="/investing/products/:id/:currentYear/:currentTime" element={<><Header onDataChange={handleChildData}/> <One currentYear={childData} currentTime={childData2} currentLanguage={childData3} /></>} />
        <Route path="/calendars" element={<><Header onDataChange={handleChildData}/><Calendars /></>  } />
        <Route path="/instruments" element={<><Header onDataChange={handleChildData}/><Instruments /></>  } />
        <Route path="/news" element={<><Header onDataChange={handleChildData}/><NewsPage /></>  } />

        <Route path="/login" element={<><Header isShort={true} onDataChange={handleChildData}/><Login /></>  } />
        <Route path="/registration" element={<><Header isShort={true} onDataChange={handleChildData}/><Registration /></>  } />
    </Routes>
  </>)
}

export default App;