import React from 'react';
import './Home.css';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userName,setUseName] = useState('');
  useEffect(() =>{
    const check=localStorage.getItem('userId')
    console.log(check)
    if(check){
      const g = localStorage.getItem('user')
      //console.log(JSON.parse(g));
      const t = JSON.parse(g);
      setUseName(t?.name);
    } else {
      setUseName('');
    }
  },[])
  return (
    <div className='home'>
      <h1>Welcome to Supermarket Stock Management <span className='userName-home'>{userName && userName}</span></h1>
      <p>Manage your grocery stock efficiently and effortlessly.</p>
      {!userName ?
      <div className='logButtons'>
      <Link to="/login"><button className='log' >Login</button></Link>
      <Link to="/register"> <button className='logReg'>Register</button></Link>
      </div>
      :
      <div>
        <Link to="/products"> <button className='productList'>to product list</button></Link>
      </div>
      }
    </div>
  );
};

export default Home;
