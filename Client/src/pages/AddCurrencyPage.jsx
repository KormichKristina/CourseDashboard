import Header from "../components/Header";
import styles from '../assets/styles.module.css'
import { useNavigate } from 'react-router-dom';
import { GetMyInfo } from '../script/GetUserInfo';
import {useState,useEffect} from 'react';
import AddCurrencyContainer from '../components/AddCurrencyContainer'

export default function AddCurrencyPage(){

    const accessToken=localStorage.getItem("access");
    const [isAuth,setIsAuth]=useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        
        async function GetData() {
            try {
                await GetMyInfo(accessToken);
                setIsAuth(true);
            } catch (error) {
                setIsAuth(false);
                navigate("/sign-up")
                console.log(error);
                
            }
            
        }
                
        GetData();
                
        },[]);

    return (
        <div>
            <Header RequireAuth={true}></Header>
            <AddCurrencyContainer></AddCurrencyContainer>
            
        </div>
    );
}