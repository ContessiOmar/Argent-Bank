// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homep from '../src/Pages/Homep';
import SignInPage from '../src/Pages/SignInPage';
import UserPage from '../src/Pages/UserPage';


function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Homep />} />
        <Route path="/sign-in.html" element={<SignInPage />} />
       <Route path="/user-page.html" element={<UserPage />} />
      </Routes>
    </Router>
   
  );
}

export default App;
