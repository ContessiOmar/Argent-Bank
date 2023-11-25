const URL = 'http://localhost:3001/api/v1/user';

// Recuperation du Token!
export const LoginApi = async (email, password) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const jsonResponse = await response.json();
    const token = jsonResponse.body.token;
    console.log ('token:' + token);
    sessionStorage.setItem('token', token);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    
    return jsonResponse;
  } catch (error) {
    throw error;
  }
};


export const getUserData = async (token) => {
  try {
    const response = await fetch(`${URL}/profile`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const userData = await response.json();
    console.log('User data:', userData);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};
