import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:4000/api/register', formData);

      message.success('Registration successful!');
      console.log(response);

      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);


        message.error(error.response.data.message || 'Invalid username or password');
      } else if (error.request) {
        console.error('Error Request:', error.request);
        message.error('No response from the server. Please try again later.');
      } else {
        console.error('Error Message:', error.message);
        message.error('Error during registration. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <div className="register-page d-flex">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
          <Link to="/login">I already have an account!</Link>
        </form>
      </div>
    </>
  );
};

export default Register;
