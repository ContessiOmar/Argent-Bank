import React from 'react';
import "../css/main.css";
import { Link } from 'react-router-dom';
import { useUser } from '../services/UserContest';

const MainNav = ({ isAuthenticated }) => {
  const { userName } = useUser();
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="../img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
           
              <p className="user-name">{userName}</p>

            <Link className="main-nav-item" to="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="sign-in.html">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
