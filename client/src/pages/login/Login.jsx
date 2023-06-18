import { useRef } from 'react'
import './login.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#ffffff',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function Login() {

    const email = useRef();
    const password = useRef();

    const {user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value}, dispatch)
    }
    console.log(user)
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
                    <input placeholder='Password' required type="password" minLength="5" className="loginInput" ref={password} />
                    <button className="loginButton" type='submit' disabled={isFetching}>{isFetching
                    ?
                    <ThemeProvider  theme={theme}>
                        <CircularProgress/>
                    </ThemeProvider>   
                    : "Login"}
                    </button>
                    {error && <div className='loginFailedMessage'>{error}</div>}
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