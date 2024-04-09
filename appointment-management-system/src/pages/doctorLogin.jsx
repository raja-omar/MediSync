import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Login.css";

const DocLogin = () => {
    return(
        <div className="login-section">
            <h1>LOGGING IN AS A DOCTOR</h1>
            <form>
                <input required type="text" placeholder="username" name="username"/>
                <input required type="password" placeholder="password" name="password"/>
                <button>Login</button>
                <span>New doctor? <Link to="/registerDoctor">Register here</Link></span>
                <span>Are you a receptionist? <Link to="/receptionistLogin">Login here</Link></span>
            </form>
        </div>
    )
}
export default DocLogin;
