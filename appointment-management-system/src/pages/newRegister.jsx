/* Register.jsx */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/newRegister.css';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [role, setRole] = useState('');
  const [speciality, setSpeciality] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="register-container">
      <div className="screenshot-section">
        <div className="ss-main-text">
          Elevate your appointment management process with MediSync
        </div>
        <div className="ss-subtext">
          Sign up now to simplify your appointment booking
        </div>
        <img
          className="sample-pic"
          src={'/finalest.png'}
          alt="Screenshot of the application"
        />
      </div>
      <div className="form-section">
        <div className="register-box">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeID">Employee ID</label>
              <input
                type="text"
                id="employeeID"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>
            {role === 'Doctor' && (
              <div className="form-group">
                <label htmlFor="speciality">Speciality</label>
                <input
                  type="text"
                  id="speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <button
                type="submit"
                onClick={() =>
                  navigate(role == 'Doctor' ? '/doctorscreen' : '/home')
                }
              >
                Register
              </button>
            </div>
            <p >
              Already registered?{' '}
              <button
                style={{
                  background: 'none',
                  fontSize: '16px',
                  color: 'purple',
                }}
                onClick={() => {
                  navigate('/login');
                }}
              >
                Sign in now
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
