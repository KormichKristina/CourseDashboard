import styles from '../assets/Styles.module.css'
import { useNavigate } from 'react-router-dom';
import {LogIn} from '../script/LogInRequest.js';
import {useState,useEffect} from 'react'

function LogInForm(){
    const navigate = useNavigate();
    const [nameInput,setNameInput]=useState('');
    const [passwordInput,setPasswordInput]=useState('');


    const logIn=async ()=>{
        try{
            await LogIn(nameInput,passwordInput);
            console.log("loaded");
            //console.log(tokens);
            navigate('/profile');
        
        }
        catch(error){
            alert(error);
        }
       
    
    }

    return <div className={styles.containerForm}>
        <form style={{height:'350px'}}>
            <h1 style={{fontSize:'30px'}} className={styles.montserrat}>Log in</h1>
            <div style={{height:'100px'}} className={styles.formInputs}>
                <input onChange={(e)=>setNameInput(e.target.value)} placeholder="Your name" className={styles.montserrat}/>
                <input onChange={(e)=>setPasswordInput(e.target.value)} type="password" placeholder="Your password" className={styles.montserrat}/>
            </div>
            <div className={styles.formButtons}>
                <button type="button" onClick={()=>navigate("/")} className={styles.montserrat}>Cancel</button>
                <button type="button" onClick={logIn} className={styles.montserrat}>OK</button>
            </div>
        </form>
    </div>
}

export default LogInForm;