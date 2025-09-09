import Header from "../components/Header";
import Banner from "../components/WelcomeBanner"
import MainContent from "../components/CurrencyDashbord"
import {useState,useEffect} from 'react';

function HomePage(){

  const [isAuth,setIsAuth]=useState(false);
  useEffect(()=>{

    if(localStorage.length!=0){
      setIsAuth(true);
    }

  },[])

  return (
  <div>
      <Header RequireAuth={isAuth}/>
      <Banner/>
      <MainContent/>
  </div>
  );
}

export default HomePage;