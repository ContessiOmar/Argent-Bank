import React from 'react';
import "../css/main.css"; 




const MainNavLog = ({ updatedUsername }) => {
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="../img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      
      <div>
      <p className="userName">{updatedUsername}</p>
        <a className="main-nav-item" href="/">
          <i className="fa fa-user-circle"></i>
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default MainNavLog;