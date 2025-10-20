import Header from "../components/Header";
import Banner from "../components/WelcomeBanner"
import MainContent from "../components/CurrencyDashbord"
import {useState,useEffect} from 'react';

function HomePage(){

  const accessToken=localStorage.getItem("access");
    const [isAuth,setIsAuth]=useState(false);
    useEffect(()=>{
        
        async function GetData() {
            try {
                await GetMyInfo(accessToken);
                setIsAuth(true);
            } catch (error) {
                setIsAuth(false);
                console.log(error);
                
            }
            
        }
                
        GetData();
                
        },[]);

  return (
  <div>
      <Header RequireAuth={isAuth}/>
      <Banner/>
      <MainContent/>
  </div>
  );
}

export default HomePage;