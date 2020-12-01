import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Login from './views/Login'
import Navbar from './comp/nav'
import Home from './views/Home'


export default function App() {
  return (
    <Router>
    <div className="App" style={{height:"100vh"}}>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        </Switch>
    </div>
    </Router>
  );
}

