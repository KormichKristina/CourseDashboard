import { cloneElement, useEffect, useState } from 'react';
import styles from '../assets/styles.module.css'
import { GetMyInfo } from '../script/GetUserInfo';
import MyCurrenciesItem from './MyCurrenciesItem';
import { useNavigate } from 'react-router-dom';

export default function MyInfo(){

    const navigate = useNavigate();
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const [currencies,setCurrencies]=useState([]);
    const[searchResults,setSearchResults]=useState([]);
    const [searchInputValue,setSearchInputValue]=useState('');
    const [isDeleted,setIsDeleted]=useState(true);
    const [deletedName,setDeletedName]=useState('');

    useEffect(()=>{
        
        setName(localStorage.getItem('name'));
        setPassword(localStorage.getItem('password'));
        if(localStorage.getItem("currencies")!=null){
            setCurrencies(localStorage.getItem("currencies").split(','));
            setSearchResults(localStorage.getItem("currencies").split(','));
        }
        

    },[])

    const CurrencyList=()=>{
        

        if(isDeleted){

            return (
            
            searchResults.map(item=>{
                    return (<MyCurrenciesItem key={Math.random().toString().substring(2,9)} item={item} onCurrChanged={DeleteCurrency}></MyCurrenciesItem>);
            })
        
        );
        }
        
    }

    useEffect(() => {
        setSearchResults(currencies);
    }, [currencies]);
    const DeleteCurrency=(currName)=>{
        
        setCurrencies(c=>c.filter(i=>i!=currName));
        
    }
    const handleInputChange = (e) => {
        setSearchInputValue(e.target.value);
    };
    const Search=()=>{
        let searchResult=currencies.filter(c=>c.includes(searchInputValue));
        setSearchInputValue(searchResult);
    }
    return (
        
    <div className={styles.profileContainer}>
        <div className={styles.profileInfoContainer}>
            <div className={styles.profileInfo}>
                <p style={{color:'#4b20ff',fontSize:25}} className={styles.montserrat}>Your profile</p>
                <div className={styles.inputContainer}>
                <input defaultValue={name} readOnly={true}></input>
                <input defaultValue={password}readOnly={true}></input>
                </div>
                <button onClick={()=>navigate('/add-currency')} className={styles.searchButton} style={{alignSelf:'center',width:120}}>Add a currency</button>
            </div>
            
        </div>
        <div className={styles.currencyDashbord} style={{width:'600px',borderRadius:'0px 0px 25px 25px'}}>
            {
                CurrencyList()
            }
        </div>
    </div>);


}