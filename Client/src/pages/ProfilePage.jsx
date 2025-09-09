import Header from "../components/Header";
import MyInfo from "../components/MyInfo";
import { useNavigate } from 'react-router-dom';
import { GetMyInfo } from '../script/GetUserInfo';
import {useState,useEffect} from 'react';

export default function ProfilePage(){

    const accessToken=localStorage.getItem("access");
    const [isAuth,setIsAuth]=useState(false);
    const navigate = useNavigate();
    let data;
    useEffect(()=>{
        
        async function GetData() {
            try {
              data=await GetMyInfo(accessToken);
              if(data !=null){
                setIsAuth(true);
              }
              
            } catch (error) {
              setIsAuth(false);
              navigate("/sign-up")
              console.log(error);
              
            }
            
        }
              
        GetData();
              
      },[]);
    
      if(isAuth){
        return (
        <div>
        <Header RequireAuth={true}></Header>
        <MyInfo></MyInfo>
        
        </div>);
      }
    

}