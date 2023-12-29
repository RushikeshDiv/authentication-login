import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Mainheader from './components/MainHeader/MainHeader';
import { useState } from 'react';
import Login from './components/Login/Login';

          

function App() {


  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const storedData = localStorage.getItem("isLoggedIn");
  

  useEffect(()=>
  {
    if(storedData==="1")
    {
      setIsLoggedIn(true);

    }

  }, [])
 
const loginHandler=(email,password)=>
{
  
 // if(email==="admin@bitcode.in && password==="1234567")

  setIsLoggedIn(true);
};
const logoutHandler=()=>
{
  setIsLoggedIn(false);
  localStorage.setItem("isLoggedIn","0");
  
};

console.log('isLoggedIn ----', isLoggedIn);


  return (
    <React.Fragment>
      <Mainheader isAuthenticated = {isLoggedIn} onLogout={logoutHandler}></Mainheader>
      <main>
      <Login onLogin={loginHandler}/>
        {/* {!isLoggedIn && <Login onLogin={loginHandler}/>} */}
     
         {isLoggedIn && <Home onLogout={logoutHandler}/>}
      
     
      </main>
    </React.Fragment>
    
  );
}

export default App;
