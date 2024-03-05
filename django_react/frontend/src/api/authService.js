
const API_URL = 'http://localhost:8000/api'; // Adjust according to your backend URL

export const login = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  localStorage.setItem('token', data.access); // Adjust according to the response structure
};

export const signup = async ({ email, password, confirmPassword }) => {
  const response = await fetch(`${API_URL}/signup/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, confirmPassword }),
  });
  if (!response.ok) throw new Error('Signup failed');
  // Handle signup success, e.g., redirect to login page
};
