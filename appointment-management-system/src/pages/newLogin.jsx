import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/newLogin.css';

export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const docUser = 'doctorSmit@email.com';
  const recepUser = 'recepSaadman@email.com';

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>
      <div className="login-form">
        <div className="login-header">
          <h1 className="header-text">Welcome Back</h1>
          {/* <h2 className="header-subtext">Continue your  </h2> */}
        </div>
        <div className="login-inputs">
          <div>
            <h3>Email</h3>
            <input
              className="login-input"
              id="fix-login-input"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && (
              <h3 className="error-message">Invalid E-mail address.</h3>
            )}
          </div>
          <div>
            <h3>Password</h3>
            <div className="password-input">
              <input
                className="login-input"
                id="fix-login-input"
                type={showPassword ? 'text' : 'password'}
                onChange={(event) => {}}
              />
              <button
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                Show/Hide
              </button>
            </div>
            {passwordError && (
              <h3 className="error-message">
                Must be between 8 and 15 characters in length
                <br></br>
                Must include a number
              </h3>
            )}
            <h4 className="forgot-password">Forgot password?</h4>
          </div>
        </div>
        <div className="login-buttons">
          <button
            className="login-button"
            onClick={() => {
              if (email.includes('doctor')) {
                navigate('/doctorscreen');
              } else {
                navigate('/home');
              }
            }}
          >
            Login
          </button>
        </div>
        <div className="signup-link">
          <h3>New to MediSync?</h3>
          <button
            onClick={() => navigate('/register')}
            className="signup-button"
            style={{ background: 'none', fontSize: '14px' }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
