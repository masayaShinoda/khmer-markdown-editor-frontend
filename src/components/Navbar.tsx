import { FunctionComponent } from 'react'
import { Link, useLocation } from "react-router-dom"
import styles from "../styles/Navbar.module.css"

const Navbar: FunctionComponent = () => {
    const location = useLocation()
    
    interface NavItem {
        path: string,
        icon_class: string,
        name: string,
    }

    const nav_items: NavItem[] = [
        {
            path: "/",
            icon_class: "home",
            name: "ទំព័រដើម",
        },
        {
            path: "/editor",
            icon_class: "add_document",
            name: "អត្ថបទថ្មី",
        },
        {
            path: "/account",
            icon_class: "account",
            name: "គណនី​",
        },
        {
            path: "/settings",
            icon_class: "settings",
            name: "ការកំណត់",
        },
        {
            path: "/help",
            icon_class: "question",
            name: "របៀបប្រើប្រាស់",
        },
    ]

    const logo = "/images/maya-logo-icon.svg"

    return <div className={styles.navbar}>
        <div className={styles.logo_container}>
            <img 
                src={logo}
                width="56" height="56"
                alt="Logo"
                className={styles.logo}
            />
        </div>
        <nav className={styles.nav}>
            {nav_items.map(item => {
                return (
                    <Link 
                        to={item.path} 
                        className={`${styles.nav_link} ${location.pathname === item.path ? styles.active : null}`} 
                        key={item.name}
                        aria-label={item.name}
                        title={item.name}
                    >
                        <i className={`${styles.icon} icon ${item.icon_class}`}></i>
                        <span>{item.name}</span>
                    </Link>
                )
            })}
        </nav>
    </div>
}

export default Navbar