import styles from '../assets/styles.module.css'
import {DeleteCurrency} from '../script/DeleteCurrency'
import { GetMyInfo } from '../script/GetUserInfo';

export default function MyCurrenciesItem({item,onCurrChanged}){

    const deleteItem=async ()=>{
        let accessToken=localStorage.getItem('access');
        await DeleteCurrency(item,accessToken);
        await GetMyInfo(accessToken);
        if(onCurrChanged){
            onCurrChanged(item);
        }
        
    }
    if(item!=null&&item!=''){
        return (
        <div className={`${styles.currencyItem} ${styles.montserrat}`}>
                    <p>{item}</p>
                    <div style={{width:150,display:'flex',justifyContent:'space-between'}}>
                    <button style={{width:70}} className={styles.searchButton} type="button">see hisory</button>
                    <button style={{width:70}} className={styles.searchButton} onClick={deleteItem} type="button">delete</button>
                    </div>
                    
        </div>
    );
    }
    
}