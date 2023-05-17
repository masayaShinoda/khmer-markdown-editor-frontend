import { FunctionComponent } from "react"
import styles from "../../styles/Settings.module.css"
import { Link } from "react-router-dom"
import toggle_theme from "../../utils/toggle_theme"

const Settings: FunctionComponent = () => {
    interface GridItemButtonProps {
        name: string, icon_class?: string, on_click: Function
    }
    
    const GridItemButton: FunctionComponent<GridItemButtonProps> = (props: GridItemButtonProps) => {

        return <button 
                    className={`${styles.grid_item} ${styles.grid_item_button}`}
                    onClick={() => props.on_click()}
                >
                    {props.icon_class ? <i className={`${styles.icon} icon ${props.icon_class}`}></i> : ""}
                    {props.name}
                </button>
    }

    return <div>
        <h1>ការកំណត់</h1>
        <div className={styles.settings_grid}>
            <GridItemButton name="បិទ/បើកភ្លើង" icon_class="lightbulb" on_click={toggle_theme} />
        </div>
    </div>
}

export default Settings