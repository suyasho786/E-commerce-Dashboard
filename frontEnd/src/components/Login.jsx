// src/components/Login.js

import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
})

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // You can add authentication logic here
    let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
      
        if(result.auth){
          localStorage.setItem("user",JSON.stringify(result.user));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/');
        }else{
          alert('please enter correct user details');
          
        }
         
        console.warn(result);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom, #ff9ff3, #8e44ad)',
    color: 'white',
    textAlign: 'center',
  },
  heading: {
    color: '#3498db',
    fontFamily: 'cursive',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    margin: '10px 0',
  },
  input: {
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #3498db',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
};

export default Login;
