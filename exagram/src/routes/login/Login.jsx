import React, { useState, useEffect } from 'react'; 
import './Login.scss'; // Assuming you are using a separate SCSS file for styling
import ApiManager from '../../components/api/ApiManager'; // 引入 ApiManager

const apiManager = new ApiManager();

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 在组件挂载时获取 CSRF Cookie
    apiManager.get('/users/csrf/', { withCredentials: true })
      .then(response => {
        console.log('CSRF token cookie has been set.');
      })
      .catch(error => {
        console.error('Error while setting CSRF cookie:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiManager.post('/api/token/', { username, password }, { withCredentials: true });
      if (response.status === 200) {
        console.log('Login successful');
        // 处理登录成功逻辑，比如导航到首页或设置用户状态
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  const handleRegisterClick = () => {
    // 导航到注册页面
    window.location.href = '/register';
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <div className="login-input-group">
          <label className="login-label">Username:</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-prompt">
        Don't have an account? <span onClick={handleRegisterClick} className="register-link">Register</span>
      </div>
    </div>
  );
}

export default Login;
