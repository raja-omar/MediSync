import React from 'react';
// import { Link } from 'react-router-dom';
import "../styles/Login.css";

const Reg = () => {
    return(
        <div className="doctor-register-section">
            <div className='container'>
                <h1 className='header'>REGISTER</h1>
                <form className='form'>
                    <input required type="text" placeholder="username" name="username" autoComplete="off" className='input'/>
                    <input required type="email" placeholder="email" name="email" autoComplete="off" className='input'/>
                    <select required placeholder="role" className='input'>
                        <option value="">Select role</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Receptionist">Receptionist</option>                    
                    </select>
                    <input required type="text" placeholder="address" name="password" autoComplete="off" className='input'/>
                    <input required type="text" placeholder="phone" name="password" autoComplete="off" className='input'/>
                    <input required type="password" placeholder="password" name="password" autoComplete="off" className='input'/>
                    <button className='button'>Register</button>
                    {/* <span>Already have an account? <Link to="/login">Login</Link></span> */}
                    
                 {/* Add more fields for registration such as address and phone number */}
                
                </form>
            </div>
           
        </div>
    );
}


export default Reg;
