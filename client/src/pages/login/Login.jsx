import { useRef } from 'react'
import './login.css'

function Login() {

    const email = useRef();
    const password = useRef();

    const handleClick = (e) => {
        e.preventDefault()
        console.log(email.current.value)
    }

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
            <form className="loginRight" onSubmit={handleClick}>
                <div className="loginBox">
                    <input placeholder='Email' required type="email" className="loginInput" ref={email}/>
                    <input placeholder='Password' required type="password" minLength="6" className="loginInput" ref={password} />
                    <button className="loginButton">Login</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">Create New Account</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login