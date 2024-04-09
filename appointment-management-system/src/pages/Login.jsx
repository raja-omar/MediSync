import React from 'react';
// import { Link } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
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
        <div className="doctor-login-section" ref={sectionRef}>
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
            <div className="circle" id="circle1"></div>
            <div className="circle" id="circle2"></div>
            <div className="circle" id="circle3"></div>
            <div className="circle" id="circle4"></div>
            <div className="circle" id="circle5"></div>
        </div>
    );
}


export default Login;
