import React from 'react';
import './Login.scss';
import { useLogin } from '../../routes/useLogin';

function Login() {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit,
        handleRegisterClick
    } = useLogin();

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
