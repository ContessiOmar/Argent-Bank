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

