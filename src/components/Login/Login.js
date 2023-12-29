
import classes from './Login.module.css';
import Card from '../UI/Card/Card';
import Button from "../UI/Button/Button";
import { useEffect, useReducer, useState } from 'react';

const emailReducer=(prevState,action)=>
{
    if(action.type==="USER_INPUT")
    {
        return{value:action.value,isValid:action.value.includes("@")}
    }
    if(action.type==="USER_BLUR"){
        return{value:prevState.value,isValid:prevState.value.includes("@")};

    }
return {value:"",isValid:false};
}
const passwordReducer=(prevState,action)=>
{
  if(action.type==="USER_INPUT")
  {
    return({value:action.value, isValid:action.value.trim().length>6})
  }
  if(action.type==="USER_BLUR")
  {
    return({value:prevState.value, isValid:prevState.value.trim().length>6})
  }
  return{value:"",isValid:false};
}

const Login = (props) => {
    // const [enteredEmail,setEnteredEmail]=useState('');

    // const[emailIsValid,setEmailIsValid]=useState();
    // const[enteredPassword,setEnteredPassword]=useState('');
    // const[passwordIsValid,setPasswordisValid]=useState();
     const[formIsValid,setFormIsValid]=useState(false);

    const [emailState,dispatchEmail]=useReducer(emailReducer,{value:"",isValid:null});
    
    const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:"",isValid:null})


  
//    useEffect(()=>
//     {
//         let t1=setTimeout(()=>
//         {
//             console.log("input has changed");


//           setFormIsValid
//             (
//             enteredEmail.includes('@') && enteredPassword.trim().length>6

//             );
//         }, 500);

//         return () =>
//         {
//             console.log("this is return function");
//             clearTimeout(t1);
//         };
        
//     },[emailState.isValid,passwordState.isValid]);

    const emailChangeHandler = (event) => {
      //  setEnteredEmail(event.target.value);
      dispatchEmail({type:"USER_INPUT",value:event.target.value});

      setFormIsValid(event.target.value.trim().length> 6 && emailState.value.includes('@'));
    };
    
    const passwordChangeHandler=(event)=>{
    //    setEnteredPassword(event.target.value);
        dispatchPassword
        ({type:"USER_INPUT",value:event.target.value});

        setFormIsValid(
           event.target.value.trim().length> 6 && emailState.value.includes('@'));  
    };

    const validateEmailHandler=()=>{
  //  setEmailIsValid(emailState.value.includes('@'));
      dispatchEmail({type:"USER_BLUR"});
      
    };
     
    const validatePasswordHandler=()=> {

     //setPasswordisValid( enteredPassword.trim().length>6 );
     dispatchPassword({type:"USER_BLUR"});

    };
    const submitHandler=(event)=> {

        event.preventDefault();
        localStorage.setItem("isLoggedIn","1");
        props.onLogin(emailState.value,passwordState.value);
    };

    console.log('Login component render');

    return(
        <Card className={classes.login}>
          
            <form onSubmit={submitHandler}>
            <div className={`${classes.control} ${emailState.isValid===false ? classes.invalid: ''}`}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}></input>
            </div>
              
            <div className={` ${classes.control}

                 ${passwordState.isValid === false ? classes.invalid: ''}`}>

                  <label htmlFor="password">password</label>

                    <input type="password" id="password"

                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur  ={validatePasswordHandler}>   

                    </input>

            </div>

                
            <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>Login</Button>
                 
                  
            </div>
         </form>
        </Card>
      
        
    );
              
};
export default Login;