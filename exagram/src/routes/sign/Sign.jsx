import React from 'react';
import './Sign.scss'; // 假设你在使用单独的 SCSS 文件进行样式处理
import { useRegister } from '../../routes/useRegister';
import ApiManager from '../../components/api/ApiManager';

function Sign() {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        handleSubmit,
        handleLoginClick,
    } = useRegister();

    const handleRegisterClick = () => {
        handleSubmit();
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
