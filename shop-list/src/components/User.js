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

  const handleCancelClick = () => {

    setEditedUserName('');
  };

  return (
    <div className='bg-dark'>
      <MainNav isAuthenticated={isAuthenticated} />
      <div className="header">
        {editing ? (
          <>

            <h2>Edit user info</h2>
            <div className='userForm'>

              <div className="formRow">
                <label htmlFor="userName">User name:</label>
                <input
                  type="text"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                />
              </div>

              <div className="formRow">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  value={userData.firstName}
                  className="firstName"
                  readOnly
                />
              </div>

              <div className="formRow">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  value={userData.lastName}
                  className="lastName"
                  readOnly
                />
              </div>

              <div className="buttonRow">
                <button className="save-button" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
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
    </div >
  );
};

export default User;