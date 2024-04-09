import React from 'react';
// import { Link } from 'react-router-dom';
import "../styles/Login.css";

const Reg = () => {
    const sectionRef = React.useRef(null);
    React.useEffect(() =>{
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const circles = document.querySelectorAll('.circle');
            circles.forEach((circle, index) => {
                const dx = (window.innerWidth / 2 - clientX) / (20 * (index + 1)); // More subtle movement for each subsequent circle
                const dy = (window.innerHeight / 2 - clientY) / (20 * (index + 1));
                circle.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
            });
        };
        sectionRef.current.addEventListener('mousemove', handleMouseMove);

        return () => {
            sectionRef.current.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])
    return(
        <div className="doctor-register-section" ref={sectionRef}>
            <div className='container'>
                <h1 className='header'>REGISTER NEW USER</h1>
                <form className='form'>
                    <input required type="text" placeholder="username" name="username" autoComplete="off" className='input'/>
                    <input required type="password" placeholder="password" name="password" autoComplete="off" className='input'/>
                    <input required type="email" placeholder="email" name="email" autoComplete="off" className='input'/>
                    <select required placeholder="role" className='input'>
                        <option value="">Select role</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Receptionist">Receptionist</option>                    
                    </select>
                    <input required type="text" placeholder="address" name="password" autoComplete="off" className='input'/>
                    <input required type="tel" placeholder="phone" name="password" autoComplete="off" className='input' pattern='[0-9]{10}' title="Please enter a valid 10-digit phone number"/>
                    <input required type="text" placeholder="specialty" name="specialty" autoComplete="off" className='input'/>
                    {/* <span>Already have an account? <Link to="/login">Login</Link></span> */}
                </form>
                <button className='button'>Register</button>
            </div>
            <div className="circle" id="circle1"></div>
            <div className="circle" id="circle2"></div>
            <div className="circle" id="circle3"></div>
            <div className="circle" id="circle4"></div>
            <div className="circle" id="circle5"></div>
           
        </div>
    );
}


export default Reg;
