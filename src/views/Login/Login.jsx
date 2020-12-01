import React,{useState,useEffect} from 'react'
import {Redirect,withRouter } from 'react-router-dom'

function Login({history}) {
    const [state,setState] = useState({
        email:'admin@admin.com',
        pass:'admin@123'
    })
    const handleLogin = e =>{
        e.preventDefault()
        // email: admin@admin.com, password: “admin@123”
        if(state.email ==='admin@admin.com' && state.pass === 'admin@123'){
            localStorage.setItem('user',JSON.stringify({loggedIn: true}))
            return history.push('/')
        }
        return alert('Invalid credentials')
    }
    const data = JSON.parse(localStorage.getItem('user'))
    const handleChange = e => setState({...state,[e.target.name]:e.target.value})
    if(data!==null && data.loggedIn===true) return <Redirect to='/' />
    return (
        <div className='col-10 col-md-5 mx-auto shadow-sm p-5 rounded mt-5'>
            <form method='post' onSubmit={handleLogin} 
            className='form'>
                <h3 className='text-center'>Login form</h3>

                <input type="email" name="email" required={true}
                placeholder='Enter email' value={state.email} 
                onChange={handleChange}
                className='form-control mb-3' />

                <input type="password" name="pass" required={true}
                placeholder='Enter password' value={state.pass} 
                onChange={handleChange}
                className='form-control mb-3' />

                <button className='btn btn-primary' type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(Login)
