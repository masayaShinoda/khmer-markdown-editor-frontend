import { FunctionComponent } from "react"
import styles from "./Dashboard.module.css"

interface Props {
    title: string,
    category: string,
    updated_at: string,
    created_at: string,
}

const Row: FunctionComponent<Props> = (props: Props) => {

    return <>
        <tr className={styles.row}>
            <td>
                <span>{props.title}</span>
            </td>
            <td>
                <span>{props.category ? props.category : "មិនកំណត់"}</span>
            </td>
            <td className={styles.td_date}>
                <span>
                    <time>{new Date(props.updated_at).toLocaleTimeString()} - {(new Date(props.updated_at)).toLocaleDateString('km')}</time>
                </span>
            </td>
            <td className={styles.td_date}>
                <span>
                    <time>{new Date(props.created_at).toLocaleTimeString()} - {(new Date(props.created_at)).toLocaleDateString('km')}</time>
                </span>
            </td>
        </tr>
    </>
}

export default Row