import styles from '../assets/styles.module.css'

export default function HistoryContainer(props){

    /*
    Object.entries(props.currencyList).map(([key,value])=>{
        console.log(key);
        Object.entries(value.rates).map(([currency,rate])=>{
            console.log(currency,'------',rate)
        });
    });
    */

    const getCurrencySection=(key,value)=>{
        let date=new Date()
        date.setDate(date.getDate()-key)
        let dateStr=date.toISOString().split('T')[0].replaceAll('-','.')



        return(
            <div>
                <p style={{margin:15}} className={styles.montserrat}>{dateStr}</p>
                
                <div className={styles.montserrat} style={{margin:15,fontSize:13}}>
                    {
                        Object.entries(value.rates).map(([currency,rate])=>{
                            return(
                                <div className={styles.currencyItem}>
                                    <p>{currency}</p>
                                    <p>{rate}</p>
                                </div>
                            );
                        })
                    }
                    
                    
                </div>
            </div>
            
        );
    }

    const printsItems=()=>{
        let length=Object.keys(props.currencyList).length
        const printNotFoundString=()=>{
            if(length==0){
                return (
                    <p className={styles.montserrat} style={{textAlign:'center'}}>History for this currency is not avialable</p>
                );
            }

        }
        return (
            <div style={{width:'40%'}} className={styles.currencyDashbord}>
                {
                    Object.entries(props.currencyList).map(([key,value])=>
                    {
                        if(!value.rates){
                            length-=1;
                            return;
                        }
                        return getCurrencySection(key,value);
                    })
                }
                {
                    printNotFoundString()
                }
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            {
                printsItems()
            }
        </div>
    );
}