
import styles from '../assets/styles.module.css';
import logo from '../assets/coin.png'; 
import { LogoutRequest } from '../script/LogoutRequest';
import { GetMyInfo } from '../script/GetUserInfo';
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';

function Header(props) {

  const navigate = useNavigate();
  
  

  const LogoutBtn= async ()=>{
    let accessToken=localStorage.getItem("access");
    await LogoutRequest(accessToken);
    localStorage.clear();
    navigate("/");
  }
  const mainContent=()=>{
    
    if(!props.RequireAuth){
        return(
      <div className={styles.authContainer}>
            <a href='/sign-up' className={styles.montserrat}>Sign up</a>
            <a href='/log-in' style={{ color: '#4b20ff' }} className={styles.montserrat}>Log in</a>
      </div>);
    }
    else{
        return(
      <div style={{width:350}} className={styles.authContainer}>
            <a href='/calculate' className={styles.montserrat}>Calculator</a>
            <a href='/profile' className={styles.montserrat}>Profile</a>
            <a onClick={LogoutBtn} style={{ color: '#4b20ff' }} className={styles.montserrat}>Log out</a>
      </div>
    )
    }
    
    
  }

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <p className={`${styles.montserrat} ${styles.welcomeLabel}`} onClick={()=>navigate('/')}>Course dashboard</p>
      </div>
      
      <div className={styles.navigation}>
        {mainContent()}
        <a href='/about' className={styles.montserrat}>About project</a>
      </div>
    </header>
  );
}

export default Header;