import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Login.css";

const RegisterRecep = () => {
    return(
        <div className="register-section">
            <h1>REGISTERING AS A RECEPTIONIST</h1>
            <form>
                <input required type="text" placeholder="username" name="username" autoComplete="off"/>
                <input required type="email" placeholder="email" name="email" autoComplete="off"/>
                <input required type="password" placeholder="password" name="password" autoComplete="off"/>
                <button>Register</button>
                <span>Already have an account? <Link to="/receptionistLogin">Login</Link></span>
            </form>
        </div>
    )
}

export default RegisterRecep;