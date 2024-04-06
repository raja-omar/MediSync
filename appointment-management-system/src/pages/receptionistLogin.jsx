import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Login.css";

const RecepLogin = () => {
    return(
        <div className="login-section">
            <h1>LOGGING IN AS A RECEIPTIONIST</h1>
            <form>
                <input required type="text" placeholder="username" name="username"/>
                <input required type="password" placeholder="password" name="password"/>
                <button>Login</button>
                <span>New receptionist? <Link to="/registerReceptionist">Register here</Link></span>
                <span>Are you a doctor? <Link to="/doctorLogin">Login here</Link></span>
            </form>
        </div>
    )
}


export default RecepLogin;
