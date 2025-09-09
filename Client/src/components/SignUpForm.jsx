import styles from '../assets/Styles.module.css'
import { useNavigate } from 'react-router-dom';
import{SignUp} from '../script/SignUpRequest.js'
import {useState,useEffect} from 'react'

function SignUpForm(){
    const navigate = useNavigate();

    const [nameInput,setNameInput]=useState("");
    const[passwordInput,setPasswordInput]=useState("");
    const [confirmPassword,setConfirmPassword]=useState('');
    const btnClicked=async ()=>{
        try{

            if(nameInput==' '){
                throw new Error("this name is invalid");
            }
            if(confirmPassword!=passwordInput){
                throw new Error("write your password correct");
            }

            await SignUp(nameInput,passwordInput);
            //console.log(tokens);
            navigate('/profile');
        
        }
        catch(error){
            alert(error);
        }

    }
    return <div className={styles.containerForm}>
        <form>
            <h1 style={{fontSize:'30px'}} className={styles.montserrat}>Sign up</h1>
            <div className={styles.formInputs}>
                <input onChange={(e)=>setNameInput(e.target.value)} placeholder="Your name" className={styles.montserrat}/>
                <input onChange={(e)=>setPasswordInput(e.target.value)} type="password" placeholder="Your password" className={styles.montserrat}/>
                <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder='Confirm password' className={styles.montserrat}></input>
            </div>
            <div className={styles.formButtons}>
                <button type="button" onClick={()=>navigate("/")} className={styles.montserrat}>Cancel</button>
                <button type="button" onClick={btnClicked} className={styles.montserrat}>OK</button>
            </div>
        </form>
    </div>
}

export default SignUpForm;