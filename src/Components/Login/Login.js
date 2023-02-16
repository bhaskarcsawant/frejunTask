import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material"
import Cookies from 'universal-cookie';
import './Login.css'

function Login() {
    //declaring the state variables
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [disable, setDisable] = useState(true)

    //initializing the cookies to store
    const cookies = new Cookies();

    //to navigate the user within pages
    let navigate = useNavigate();
    const navigateUser = () => {
        if (cookies.get('user')) { //to check if user has already logged in - if yes, redirect to users page : id no then redirect to the login page
            navigate("/users");
        }
        else {
            navigate("/");
        }
    }
    //to handle the login
    //normally we make the login functinality with creating a backend api , 
    //but since we need to logged in by only one user, And this is test so I'm creating the functionality in frontend by If-Else block with provided user credentials

    const handleLogin = () => {

        if (username && password) { //to check if wether the user has entered the credentials - if yes then
            if (username === "admin@frejun") { //check the id - if correct then
                if (password === '12345678') { //check the password - if correct then
                    cookies.set('user', ['logged_in', 'admin@frejun']) //set the cookies
                    return navigate("/users"); // and navigate to users page
                }
                else {// if credentials are wrong then show the appropriate error msg
                    setMsg('incorrect username or password')
                }
            }
            else {
                document.getElementById('msgBox').style.display = 'block';
                setMsg('incorrect username or password')
            }
        }
        else {
            document.getElementById('msgBox').style.display = 'block';
            setMsg('Enter details')
        }
    }
    useEffect(() => { //check if user has started to enter the credentials: if yes then change the color of login bt
        if (!username && !password) {
            document.getElementById('loginBt').style.cursor = 'not-allowed';
            document.getElementById('loginBt').style.backgroundColor = 'var(--green-2)';
            document.getElementById('msgBox').style.display = 'none';
            setDisable(true)

        } else {
            document.getElementById('loginBt').style.cursor = 'pointer';
            document.getElementById('loginBt').style.backgroundColor = 'var(--green)';
            setDisable(false)
        }
    })
    useEffect(() => { //to call the navigateuser function to navigate the user
        navigateUser()
    }, [])
    return (
        <>
            <Box id="loginBox"
                sx={{
                    width: 350,
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3vh',
                }}
            >
                <h2 align='center'>Log in</h2>
                <div id='inputContainer'>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='Enter your username' onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div id='inputContainer'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button id='loginBt' disabled={disable} onClick={() => handleLogin()}>Log in</button>
            </Box>
            <h3 style={{ padding: "1rem", backgroundColor: 'var(--yellow)', fontSize: 'var(--font-13)', borderRadius: '8px' }} id="msgBox" align='center'>{msg}</h3>
        </>


    )
}

export default Login