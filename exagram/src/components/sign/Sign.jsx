import React, { useState } from 'react'; 
import './Sign.scss'; // Assuming you are using a separate SCSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post(
        'http://localhost:8000/users/register/', 
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        // 如果注册成功，重定向到登录页面
        navigate('/');
      } else {
        // 如果服务器返回非201状态，显示错误信息
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      // 如果出现任何错误，显示错误信息
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="sign-container">
      <div className="sign-box">
        <h2 className="sign-title">Register</h2>
        <form className="sign-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="username" className="label">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="input" 
              placeholder="Enter your username" 
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="label">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="input" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="input" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password" className="label">Confirm Password:</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirmPassword" 
              className="input" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="sign-button">Register</button>
        </form>
      </div>
      <div className="login-prompt">
        <p>Already have an account? <span onClick={handleLoginClick} className="login-link">Login</span></p>
      </div>
    </div>
  );
}

export default Sign;
