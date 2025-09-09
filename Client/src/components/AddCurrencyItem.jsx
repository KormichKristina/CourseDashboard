import styles from '../assets/Styles.module.css'
import { GetMyInfo } from '../script/GetUserInfo';
import { AddCurrency } from '../script/AddCurrency';

export default function AddCurrencyItem({item,addCurrency}){

    const AddCurrencyEvent=async ()=>{

        let accessToken=localStorage.getItem('access');
        await AddCurrency(item,accessToken);
        await GetMyInfo(accessToken);

        if(addCurrency !=null){
            addCurrency(item);
        }
    }

    return(
        <div className={styles.currencyItem}>
            <p className={styles.montserrat}>{item}</p>
            <button onClick={AddCurrencyEvent} style={{borderRadius:'50%',width:30,height:30,fontSize:18}} className={styles.searchButton}>+</button>
        </div>
    );
}