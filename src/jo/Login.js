import React, { useState } from 'react';
import axios from 'axios';
import Loginbg from '../assests/bg-removebg-preview.png';
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://jebinjoshe-supermarket-backend-5k42.onrender.com/api/users/login', { email, password });
      if(response?.status === 200){
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('userId', response?.data?.user?.id);
        localStorage.setItem('user',  JSON.stringify(response?.data?.user) );
        console.log(response);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 400){
        setError(err?.response?.data?.msg);
      } else {
        setError(err?.message);
      }
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='login'>
      {error && <p className='loginlo'>{error}</p>}
      <div className='left'>
        <h1 className='heading'>Welcome</h1>
        <p className='paragraph'>We are glad to see you back with us</p>
        <form onSubmit={onSubmit}>
          <div className='email'>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='password'>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='loginbutton' disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>
      </div>
      <div className='right'>
        <img src={Loginbg} alt="login-background" className='loginimg' />
      </div>
    </section>
  );
};

export default Login;