import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import ActiveLink from '../ActiveLink'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <a>
                <Image src='https://avatars.githubusercontent.com/u/103395926?v=4' alt='Logo' width={80} height={80}/>
            </a>

            <nav>
                <ActiveLink text='oi' href='/' activeClass={styles.active}/>
                <ActiveLink text='arroz' href='/posts' activeClass={styles.active}/>
               
            </nav>

            <a href="#" type='button' className={styles.readyButton}>Começar</a>
        </div>
    </header>
  )
}
