import styles from '../assets/styles.module.css'
import {GetCurrencies} from '../script/GetCurrencies.js'
import {useState,useEffect,useRef} from 'react';
import AddCurrencyItem from './AddCurrencyItem.jsx';

export default function AddCurrencyContainer(){

    const [currencies,setCurrencies]=useState([]);
    const [afterRemoveCur,setAfterRemoveCur]=useState([]);

    useEffect(()=>{async function SetData(){
    const data=(await GetCurrencies("USD"));
    let myCurr=[];
    if(localStorage.getItem("currencies")!=null){
        myCurr=localStorage.getItem("currencies").split(',');
    }
    const arr=data.map(d=>d[1].myCode).filter(c=>!myCurr.includes(c))
    setCurrencies(arr);
    setAfterRemoveCur(arr);
    console.log(arr);
    }
  
    SetData();
  }
  ,[]);
  useEffect(() => {
        setAfterRemoveCur(currencies);
    }, [currencies]);

    const RemoveCurr = (currName) => {
        setCurrencies(prev => prev.filter(c => c !== currName));
    };

    return (
        <div className={styles.profileContainer} >
                <div style={{marginBottom:60,width:500}} className={styles.currencyDashbord}>
                    {
                        afterRemoveCur.map(item=>{
                            return (<AddCurrencyItem key={Math.random().toString().substring(2,9)} item={item} addCurrency={RemoveCurr}></AddCurrencyItem>);
                        })
                    }
                </div>
        </div>
    );
}