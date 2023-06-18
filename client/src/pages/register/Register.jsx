import { useRef } from 'react';
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.current.value !== confirmPassword.current.value){
            confirmPassword.current.setCustomValidity("Passwords dont match")
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try{
                await axios.post("/auth/register", user)
                navigate("/login")
            } catch(err){
                console.log(err)
            }
        }
    }
    // console.log(user)

  return (
    <>
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialGram</h3>
                <span className="loginDesc">
                SocialGram helps you connect and share with the people in your life.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder='Username' className="loginInput" required ref={username}/>
                    <input placeholder='Email' className="loginInput" required type='email' ref={email}/>
                    <input placeholder='Password' className="loginInput" required type='password' ref={password}/>
                    <input placeholder='Confirm Password' className="loginInput" required type='password' ref={confirmPassword} />
                    <button className="loginButton" type='submit'>Sign Up</button>
                    <button className="loginRegisterButton">Sign into your account</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register