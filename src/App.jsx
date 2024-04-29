import { useState } from 'react';
//import './App.css'

import NavbarComponent from'./components/NavbarComponent'
import Archivos from './pages/Files'


function App() {

  return (
    <>
     <NavbarComponent></NavbarComponent>   
     <Archivos></Archivos>
    </>
  )
}

export default App
