import { FunctionComponent, ReactNode, useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from "../styles/Layout.module.css"

interface Props {
    children: ReactNode
}

const Layout: FunctionComponent<Props> = (props: Props) => {
    const [isDark, setIsDark] = useState<boolean>(false)

    useEffect(() => {
        // check if user has a preference stored in localStorage
        const theme_localstorage = localStorage.getItem("theme")
    
        // if user does not have a preference stored, use system default
        if(theme_localstorage === null) {
            const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
            if(prefersColorScheme.matches) {
                setIsDark(true)
                localStorage.setItem("theme", "dark")
            } else {
                setIsDark(false)
                localStorage.setItem("theme", "light")
            }
        } else {
            // user does have preference
            if(theme_localstorage === "dark") {
                setIsDark(true)
            } else {
                setIsDark(false)
            }
        }
    }, [])


    return <div id="layout" data-theme={isDark ? "dark" : "light"} className={styles.layout}>
        <Navbar  />
        <main className={styles.main}>
            {props.children}
        </main>
    </div>
}

export default Layout