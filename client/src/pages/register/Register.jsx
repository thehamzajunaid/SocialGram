import './register.css'

function Register() {
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
                    <input placeholder='Username' className="loginInput" />
                    <input placeholder='Email' className="loginInput" />
                    <input placeholder='Password' className="loginInput" />
                    <input placeholder='Confirm Password' className="loginInput" />
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton">Sign into your account</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register