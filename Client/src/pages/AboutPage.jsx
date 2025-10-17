import Header from "../components/Header";
import styles from '../assets/styles.module.css'
import {useState,useEffect} from 'react';

export default function AboutPage(){

    const [isAuth,setIsAuth]=useState(false);
      useEffect(()=>{
    
        if(localStorage.length!=0){
          setIsAuth(true);
        }
    
      },[])

    return (
        <div>
            <Header RequireAuth={isAuth}></Header>
            <div className={styles.profileContainer} >
                            <div style={{width:'70%'}} className={styles.currencyDashbord}>
                            <p className={styles.montserrat}>A project demonstrating modern web development skills, covering the entire software development cycle - from architecture design to containerization and deployment.<br/><br/>
                                The project was created as part of an in-depth study of microservice architecture and its benefits, application containerization using Docker, frontend and backend interaction via REST API, and professional development environment setup.<br/><br/>
                                This project was a crucial step for me in understanding how modern applications are designed and deployed in real-world settings. From concept to working system, each step yielded valuable insights into the world of enterprise development.<br/><br/>
                                Here you can view exchange rates and find the currencies you need. You can also use the currency calculator to calculate the exchange rate. If you create an account or log in to an existing one, you can add currencies and view their history. Exchange rate information is retrieved from three different APIs.<br/><br/>
                            </p>

                            <p style={{color:'#4b20ff'}} className={styles.montserrat}>
                                Author: Kristina Kormich, third-year student, beginner .NET developer
                            </p>
                            </div>
                    </div>
        </div>
    );
}