import Header from "../components/Header";
import Conversion from "../components/Conversion";
import { useNavigate } from 'react-router-dom';
import { GetMyInfo } from '../script/GetUserInfo';
import {useState,useEffect} from 'react';

function CalculatorPage(){
    
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
            <Conversion></Conversion>
        </div>
    );
}
export default CalculatorPage;
