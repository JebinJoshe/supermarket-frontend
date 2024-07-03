import React, { useState } from 'react';
import axios from 'axios';
import Registerbg from '../assests/bg-removebg-preview.png';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://supermarket-data-mrti.onrender.com/api/users/register', { name, email, password, address });
      
      if(response?.status === 200){
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('userId', response?.data?.userId);
        console.log(response);
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 400){
        setError(err?.response?.data?.msg)
      }
      else{
        setError(err?.message)
      }
      setTimeout(()=> {
        setError("")
      },4000)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='register'>
      {error && <p className='regp'>{error}</p>}
      <form onSubmit={onSubmit}>
        <h1 className='regheading'>Register</h1>
        <div className='regname'>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='regemail'>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='regpassword'>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='regadders'>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        
        <button type="submit" className='regbutton' disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : 'Register'}
        </button>
      </form>
      <div className='regright'>
        <img src={Registerbg} alt="login-background" className='regimg' />
      </div>
    </section>
  );
};

export default Register;