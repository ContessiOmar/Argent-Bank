import "../css/main.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store/actions/login.actions';
import { LoginApi } from '../services/api';
import { useNavigate } from 'react-router-dom';



const Log = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    dispatch(setUser(email, password));
    try {
      const response = await LoginApi(email, password);
      //const token = response.token;
      //sessionStorage.setItem('token', token);

      console.log("LOGIN!!!!!", response);

      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
      navigate('/user-page.html');

    } catch (error) {
      console.error('PAS DE LOGIN :(', error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
         
         
          <button type="button" className="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Log;