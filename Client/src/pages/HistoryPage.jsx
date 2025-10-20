import { useSearchParams, Link } from 'react-router-dom';
import Header from "../components/Header";
import HistoryContainer from "../components/HistoryContainer";
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { GetMyInfo } from '../script/GetUserInfo';
import { GetCurrencyHistory } from '../script/GetCurrencyHistory';

export default function HistoryPage(){

    const [searchParams] = useSearchParams();
    const currencyName = searchParams.get('currencyName');
    const[currencies,setCurrencies]=useState([])
    console.log(currencyName)
    const accessToken=localStorage.getItem("access");
    const [isAuth,setIsAuth]=useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        
        async function GetHistory() {
            setCurrencies(await GetCurrencyHistory(currencyName));
            
        }

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
        GetHistory();
        },[]);

    if(isAuth){
        return (
        <div>
            <Header RequireAuth={true}></Header>
            <HistoryContainer currencyList={currencies}></HistoryContainer>
        </div>
        );
    }
    
}