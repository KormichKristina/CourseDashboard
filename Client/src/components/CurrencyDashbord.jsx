import {useState,useEffect} from 'react'
import styles from '../assets/styles.module.css';
import caretUp from '../assets/caret-arrow-up.png';
import CurrencyDashbordItem from './CurrencyDashbordItem';
import {GetCurrencies} from '../script/GetCurrencies.js'

function CourseDashboard() {

  let data=""
  const [tenCur,setTenCur]=useState([]);
  const[searchCur,setSearchCur]=useState([])
  const [selectText,setSelectText]=useState('USD');

  useEffect(()=>{async function SetData(){
    data=(await GetCurrencies(selectText));

    const arr=[];
    for(let d of data){
      arr.push({
        id:Math.random().toString().substring(2,9),
        content:d[1]
      });
    }
    setTenCur(arr);
    setSearchCur(arr);
    }
  
    SetData();
  }
  ,[]);
  
  
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue)
  };

  const ChangeSearchCourses=()=>{
    let searchResult=tenCur.filter(c=>String(c.content.myCode).includes(inputValue));
    setSearchCur(searchResult);
  }

  const ChangeSelected= async (e)=>{
    setSelectText(e.target.value);
    data=(await GetCurrencies(selectText));
    console.log("h")
    const arr=[];
    for(let d of data){
      arr.push({
        id:Math.random().toString().substring(2,9),
        content:d[1]
      });
    }

    setTenCur(arr);
    setSearchCur(arr.filter(a=>searchCur.find(s=>s.content.myCode==a.content.myCode)!=null));
    console.log(searchCur);
  }

  
  
  return (
    <div className={styles.mainContainer}>

      <article className={styles.courseArticle}>
        <div className={styles.textArticle}>
          <h1 className={styles.montserrat}>Top 10 currencies</h1>
          <p style={{ color: '#4b20ff', marginBottom: '30px' }} className={styles.montserrat}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum placeat iure cupiditate mollitia delectus blanditiis minima voluptas neque rerum, ipsa fuga nulla nisi totam nostrum soluta tempore dolores libero. Officia!
          </p>
        </div>
          <select onChange={ChangeSelected} className={styles.curSelect}>
          <option value="USD">USD</option>
          </select>
        
        
        <div className={styles.currencyDashbord}>
        {
          tenCur.slice(0,10).map(item=>{
            return (<CurrencyDashbordItem key={item.id} item={item.content}></CurrencyDashbordItem>)
          })
          
        }
        </div>
        
      </article>


      <article className={styles.courseArticle}>
        <div className={styles.textArticle}>
          <h1 className={styles.montserrat}>Find rare currencies!</h1>
          <p style={{ color: '#4b20ff', marginBottom: '30px' }} className={styles.montserrat}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum placeat iure cupiditate mollitia delectus blanditiis minima voluptas neque rerum, ipsa fuga nulla nisi totam nostrum soluta tempore dolores libero. Officia!
          </p>
        </div>
        
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            id="search" 
            className={`${styles.searchInput} ${styles.montserrat}`} 
            placeholder="Search" 
            onChange={handleInputChange}
          />
          <button type="button" onClick={ChangeSearchCourses} className={`${styles.searchButton} ${styles.montserrat}`}>OK</button>
        </div>

        <div style={{marginBottom:60}} className={`${styles.currencyDashbord} ${styles.scrollContainer}`}>
          {
          
          searchCur.map(item=>{
            return (<CurrencyDashbordItem key={item.id} item={item.content}></CurrencyDashbordItem>)
          })
          
        }
        </div>
      </article>
    </div>
  );
}

export default CourseDashboard;