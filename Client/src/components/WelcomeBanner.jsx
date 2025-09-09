import styles from '../assets/Styles.module.css';
import logo from '../assets/background (2).jpg'; 

function WelcomeBanner(){
    return (
    <div className={styles.welcomeImg}>
        <h1 className={styles.montserrat}>Welcome!</h1>
        <p className={styles.montserrat}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cupiditate laboriosam repudiandae a dolorem nulla eaque pariatur quibusdam! Quia harum, sint laboriosam a accusantium eum iure! Perspiciatis perferendis inventore dolorem.</p>
    </div>

    );
}

export default WelcomeBanner