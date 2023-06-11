import './login.css'

function Login() {
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
                <div className="loginBox">
                    <input placeholder='Email' className="loginInput" />
                    <input placeholder='Password' className="loginInput" />
                    <button className="loginButton">Login</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">Create New Account</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login