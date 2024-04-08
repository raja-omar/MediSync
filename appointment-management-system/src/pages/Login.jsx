import React from 'react';
// import { Link } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
    return(
        <div className="doctor-login-section">
            <div className='container'>
                <h1 className='header'>LOGIN</h1>
                <form className='form'>
                    <input required type="text" placeholder="username" name="username" className='input'/>
                    <input required type="password" placeholder="password" name="password" className='input'/>
                    {/* <span>New doctor? <Link to="/registerDoctor">Register here</Link></span> */}
                    {/* <span>Are you a receptionist? <Link to="/receptionistLogin">Login here</Link></span> */}
                </form>
                <button className='button'>Login</button>

            </div>
        </div>
    );
}


export default Login;
