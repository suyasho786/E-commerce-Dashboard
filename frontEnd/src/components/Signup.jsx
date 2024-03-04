import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        if(result){
            navigate('/');
        }
        localStorage.setItem("user" , JSON.stringify(result.result));
        localStorage.setItem("token" , JSON.stringify(result.auth));
        console.warn(result);
    }
    return (
        <div className="register">
            <h1 className="registerText">Register </h1>

            <input className="inputStyle" type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"></input>


            <input className="inputStyle" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter E-mail"></input>

            <input className="inputStyle" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"></input>

            <button onClick={collectData} className="buttonStyle" type="button" >SignUp</button>
        </div>
    )
}
export default Signup;