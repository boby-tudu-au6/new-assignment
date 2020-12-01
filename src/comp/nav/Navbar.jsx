import React,{useEffect} from 'react'
import Nav from './Nav'
import {withRouter} from 'react-router-dom'
import {checkLogin} from '../../redux/action/action'



function Navbar(props) {
    // const {checkLogin} = props
    useEffect(()=>{
        console.log(props)
    },[])
    return (
        <nav className="navbar navbar-dark navbar-expand-sm bg-dark justify-content-between">
            <a className="navbar-brand text-light" href='/'>Logo</a>
            <Nav/>
        </nav>
    )
}

export default withRouter(Navbar)

