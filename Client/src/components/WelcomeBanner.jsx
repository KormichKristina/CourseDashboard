import styles from '../assets/styles.module.css';
import logo from '../assets/background (2).jpg'; 

function WelcomeBanner(){
    return (
    <div className={styles.welcomeImg}>
        <h1 className={styles.montserrat}>Welcome!</h1>
        <p className={styles.montserrat}>Discover the world of international finance with our intuitive platform. Get instant access to up-to-date exchange rates from around the world, track changes, and make informed financial decisions.</p>
    </div>

    );
}

export default WelcomeBanner