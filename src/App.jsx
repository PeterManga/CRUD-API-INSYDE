import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavbarComponent from './components/navbar/NavbarComponent';
import { Body } from './pages/Body/Body';

function App() {
  return (
    <Router>
      <>
        <NavbarComponent />
        <Body />
      </>
    </Router>
  );
}

export default App;
