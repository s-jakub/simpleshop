import React, { useEffect, useState } from 'react'
import './LoginPage.styles.css'

import Navbar from '../../containers/Navbar'
import Input from '../../components/Input'
import Alert from '../../components/Alert'
import Loading from '../../components/Loading'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, register } from '../../store/slices/userSlice'

const LoginPage = () => {

    const [isLoginBtnActive, setIsLoginBtnActive] = useState(true);
    const [isRegisterBtnActive, setIsRegisterBtnActive] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [regEmail, setRegEmail] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [regName, setRegName] = useState("")
    const [regSubname, setRegSubname] = useState("")
    
    const dispatch = useDispatch();
    const {userInfo, status, errorMsg} = useSelector(state => state.user)


    useEffect(() => {
        if(userInfo._id) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const toggleBtns = () => {
        setIsLoginBtnActive(!isLoginBtnActive)
        setIsRegisterBtnActive(!isRegisterBtnActive)
    }

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login({email, password}))
    }

    const registerHandler = e => {
        e.preventDefault();
        dispatch(register({name:regName, subname:regSubname, email:regEmail, password:regPassword}))
    }

  return (
    <>
        <Navbar />
        <section className="login-register-container">
            <div className={isLoginBtnActive ? `login-container active-login active ` : 'login-container'}>
                <div className="login">
                    <div>
                    <h2 className="title">Jesteś już użytkownikiem?</h2>

                    {errorMsg && isLoginBtnActive && <Alert type='warning' text={errorMsg} />}
                    {status === 'loading' && isLoginBtnActive && <Loading /> }

                    <form action="#" className="login-form" onSubmit={(e) => loginHandler(e)}>
                       {isLoginBtnActive && <> 
                            <div className="space">
                                <Input type={'email'} name='email' placeholder={'Email'} inputValue={email} onChangeCallback={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space">
                                <Input type={'password'} name='password' placeholder={'Hasło'} inputValue={password}  onChangeCallback={(e) => setPassword(e.target.value)}/>
                            </div>
                        </>}
                        <button 
                            type="submit" 
                            className={isLoginBtnActive ? 'btn-active' : 'btn-style'}
                            onClick={() => !isLoginBtnActive ? toggleBtns() : ''} >Zaloguj się</button>
                    </form>

                    {isLoginBtnActive && <button className="forgot-password">Nie pamiętam hasła</button> }
                    </div>
                </div>
            </div>

            <div className={isRegisterBtnActive ? `register-container active active-register` : 'register-container'}>
                <div className="register">
                    <h2 className="title">Jesteś tu pierwszy raz?</h2>

                    {errorMsg && isRegisterBtnActive && <Alert type='warning' text={errorMsg} />}
                    {status === 'loading' && isRegisterBtnActive && <Loading /> }

                    <form action="#" className="login-form" onSubmit={(e) => registerHandler(e)}>
                       {isRegisterBtnActive && <> 
                            <div className="space">
                                <Input type={'email'} name='email' placeholder={'Email'} inputValue={regEmail} onChangeCallback={e => setRegEmail(e.target.value)}/>
                            </div>
                            <div className="space inline">
                                <Input type={'text'} name='name' placeholder={'Imię'} inputValue={regName} onChangeCallback={e => setRegName(e.target.value)}/>
                                <Input type={'text'} name='subname' placeholder={'Nazwisko'} inputValue={regSubname} onChangeCallback={e => setRegSubname(e.target.value)}/>
                            </div>
                            <div className="space">
                                <Input type={'password'} name='password' placeholder={'Hasło'} inputValue={regPassword} onChangeCallback={e => setRegPassword(e.target.value)}/>
                            </div>
                        </>}
                        <button 
                            type="submit" 
                            className={isRegisterBtnActive ? 'btn-active' : 'btn-style'}
                            onClick={() => !isRegisterBtnActive ? toggleBtns() : ''} >Zarejestruj się</button>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default LoginPage