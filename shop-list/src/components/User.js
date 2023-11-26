import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../store/actions/user.actions';
import MainNav from '../components/MainNav';
import { useUser } from '../services/UserContest';
import { getUserData, updateUserName } from '../services/api';

const User = () => {
  const isAuthenticated = true;
  const dispatch = useDispatch();
  const { userName, setUserName } = useUser();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      getUserData(token)
        .then((data) => {
          setUserData(data.body);
          setUserName(data.body.userName);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [setUserName]);

  const handleEditClick = () => {
    setEditing(true);
    setEditedUserName(userName);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserName(sessionStorage.getItem('token'), editedUserName);
      setUserName(editedUserName);
      dispatch(setUsername(editedUserName));
      setEditing(false);
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  return (
    <div className='bg-dark'>
      <MainNav isAuthenticated={isAuthenticated} />
      <div className="header">
        {editing ? (
          <>
            <input
              type="text"
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
            />

            <input
              type="text"
              value={userData.firstName}
              className="firstName"
              readOnly 
            />
            
            <input
              type="text"
              value={userData.lastName}
              className="lastName"
              readOnly 
            />

            <button className="save-button" onClick={handleSaveClick}>
              Save
            </button>
          </>
        ) : (
          <>
            <h1>Welcome back<br />{userName}!</h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
};

export default User;