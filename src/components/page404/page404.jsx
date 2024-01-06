import styles from './page404.module.css';
import { Link } from 'react-router-dom';

function Page404() {
    return (
        <main>
        <section className={styles.page404}>
            <h1 className={styles.page404__heading}>404</h1>
            <p className={styles.page404__text}>Страница не найдена</p>
             <Link to="/" className={styles.page404__link}>Перейти на главную</Link>
        </section>
        </main>
    );
}

export default Page404