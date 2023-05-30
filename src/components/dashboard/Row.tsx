import { KeyboardEvent, FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"

interface Props {
    slug: string,
    title: string,
    category_name: string,
    updated_at: string,
    created_at: string,
}

const Row: FunctionComponent<Props> = (props: Props) => {
    const navigate = useNavigate()
    
    function handleTableRowLink(slug: string) {
        navigate(`/editor/slug/${slug}/`)
    }
    function handleTableRowKeyDown<T extends HTMLTableRowElement>(e: KeyboardEvent<T>, slug: string) {
        if(e.key === "Enter") {
            handleTableRowLink(slug)
        }
    }

    return <>
        <tr 
            className={styles.row} 
            tabIndex={0}
            data-href={`/editor/${props.slug}`}
            onClick={() => handleTableRowLink(props.slug)}
            onKeyDown={(e) => handleTableRowKeyDown(e, props.slug)}
        >
                <td>
                    <span>{props.title}</span>
                </td>
                <td>
                    <span>{props.category_name ? props.category_name : "មិនកំណត់"}</span>
                </td>
                <td className={styles.td_datetime}>
                    <time>
                        <span className={styles.td_time}>
                            {new Date(props.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        <span className={styles.td_date}>
                            {(new Date(props.updated_at)).toLocaleDateString('km')}
                        </span>
                    </time>
                </td>
                <td className={styles.td_datetime}>
                    <time>
                        <span className={styles.td_time}>
                            {new Date(props.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        <span className={styles.td_date}>
                            {(new Date(props.created_at)).toLocaleDateString('km')}
                        </span>
                    </time>
                </td>
        </tr>
    </>
}

export default Row