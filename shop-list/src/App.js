// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homep from './Pages/Homep';
import SignInPage from './Pages/SignInPage';
import UserPage from './Pages/UserPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homep />} />
        <Route path="/sign-in.html" element={<SignInPage />} />
       <Route path="/user.html" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
