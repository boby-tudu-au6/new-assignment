import React from 'react'
import {NavLink} from 'react-router-dom'
const { REACT_APP_CODE } = process.env

export default function Nav() {
    let data = JSON.parse(localStorage.getItem('user'))
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink activeClassName='active' 
                className="nav-link" exact to='/'>Profile</NavLink>
            </li>
            {
                data===null || data.loggedIn===false ?
                <li className="nav-item">
                    <NavLink activeClassName='active' 
                    className="nav-link" exact to='/login'>Login</NavLink>
                </li>:
                <li className="nav-item">
                    <NavLink activeClassName='active' onClick={()=>localStorage.removeItem('user')}
                    className="nav-link" exact to='/login'>Logout</NavLink>
                </li>
            }
        </ul>
    )
}
