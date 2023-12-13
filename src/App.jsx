import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useRoutes } from "react-router-dom"

import './App.css'
import { Home } from './pages/home'
import { Images } from './pages/Images'

function App() {
  

  const element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/images",
      element: <Images />
    }
  ])

 return element;
  
}

export default App
