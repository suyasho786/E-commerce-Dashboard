import React from "react";
import {Link, json, useNavigate} from "react-router-dom";


const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/Signup');
        
    }      
    return (
        <div className="nav">
            
            <img src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-s-design_460848-8637.jpg?w=740&t=st=1703847559~exp=1703848159~hmac=1b16d1b28a654ab79d0a8c2e4ca31e692096c24348ae0a984198343d3e44e07e"
            className="logo"
              />
           
            {auth ?<ul className="nav-ul">
            
                <li> <Link to="/">Product </Link> </li>
                <li> <Link to="/add">Add Product </Link> </li>
                {/* <li> <Link to="/update">Update </Link> </li> */}
                {/* <li> <Link to="/Login">Login</Link> </li    > */}
                <li> <Link to="/profile">Profile </Link> </li>
                <li><Link to="/Signup" onClick={logout}>logout ({JSON.parse(auth).name})</Link></li>
                
            </ul>
            :
            <ul className="nav-ul nav-right">
                <li> <Link to="/Login">Login</Link> </li>
                <li><Link to="/Signup" onClick={logout}>Signup </Link></li>
            </ul>
        }
        </div>
    )
}
export default Nav;
