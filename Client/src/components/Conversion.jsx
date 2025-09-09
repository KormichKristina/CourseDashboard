import styles from '../assets/Styles.module.css'
import {useState,useEffect} from 'react'
import { ConversionRequest } from '../script/Conversion'; 

export default function Conversion(){

    const [currencies,setCurrencies]=useState(["USD","EUR","RUB"])
    const [amount,setAmount]=useState(0);
    const [result,setResult]=useState(0);
    const[selectedCurr,setSelectedCurr]=useState("USD");
    const [resultCurr,setResultCurr]=useState("USD");

    const calculateResult= async ()=>{
        let data=await ConversionRequest(selectedCurr,resultCurr,amount);
        setResult(data);
    }

    return (
        <div style={{display:'grid', placeItems:'center', height:'100vh'}}>
            <div className={styles.conversionContainer}>
                <div>
                    <select onChange={(e)=>{setSelectedCurr(e.target.value)}} style={{border:'1px solid #d8d8d8'}} className={styles.curSelect}>
                        {
                            currencies.map(item=>{
                                return (<option value={item}>{item}</option>);
                            })
                        }
                    </select>
                    <div className={styles.conversionInput}>
                    <input onChange={(e)=>setAmount(e.target.value)} defaultValue={0} type='number' className={`${styles.currencyInput} ${styles.montserrat}`}></input>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',height:200,alignItems:'center',justifyContent:'flex-end'}}>
                    <button onClick={calculateResult} style={{width:100}} className={styles.searchButton}>Conversion</button>
                </div>
                <div>
                    <select onChange={(e)=>{setResultCurr(e.target.value)}} style={{border:'1px solid #d8d8d8'}} className={styles.curSelect}>
                        {
                            currencies.map(item=>{
                                return (<option>{item}</option>);
                            })
                        }
                    </select>
                    <div className={styles.conversionInput}>
                    <input value={result} readOnly={true} type='number' className={`${styles.currencyInput} ${styles.montserrat}`}></input>
                    </div>
                </div>

            </div>
        </div>
    );

}