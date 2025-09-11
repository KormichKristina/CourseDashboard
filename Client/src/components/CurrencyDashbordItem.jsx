import styles from "../assets/styles.module.css"
import caretUp from '../assets/caret-arrow-up.png';
import down from '../assets/down.png'
import minus from '../assets/delete.png'

export default function CurrencyDashbordItem({item}){

  let diffString=String(item.diff);
  let arrow=minus;
  if(item.diff>0){
    diffString="+"+diffString
    arrow=caretUp;
  }
  else if(item.diff<0){
    arrow=down;
  }

  return (<div className={`${styles.currencyItem} ${styles.montserrat}`}>
              <div style={{ display: 'flex', width: '23%', justifyContent: 'space-between' }}>
                <p className={styles.currencyName}>{item.myCode}</p>
                <p>- - - - - - - -</p>
              </div>
              <div style={{ display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'space-around' }}>
                <p className={styles.currencyValue}>{item.value}</p>
                <div className={styles.currencyIndicator}>
                  <img src={arrow} />
                  <p style={{ fontSize: '14px' }}>{diffString}</p>
                </div>
                <p className={styles.currencyCode}>{item.name}</p>
              </div>
            </div>);
}