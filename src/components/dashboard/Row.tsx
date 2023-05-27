import { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"

interface Props {
    slug: string,
    title: string,
    category: string,
    updated_at: string,
    created_at: string,
}

const Row: FunctionComponent<Props> = (props: Props) => {
    const navigate = useNavigate()
    
    function handleTableRowLink(slug: string) {
        navigate(`/editor/${slug}`)
    }

    return <>
        <tr 
            className={styles.row} 
            data-href={`/editor/${props.slug}`}
            onClick={() => handleTableRowLink(props.slug)}
        >
                <td>
                    <span>{props.title}</span>
                </td>
                <td>
                    <span>{props.category ? props.category : "មិនកំណត់"}</span>
                </td>
                <td className={styles.td_date}>
                    <span>
                        <time>{new Date(props.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {(new Date(props.updated_at)).toLocaleDateString('km')}</time>
                    </span>
                </td>
                <td className={styles.td_date}>
                    <span>
                        <time>{new Date(props.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {(new Date(props.created_at)).toLocaleDateString('km')}</time>
                    </span>
                </td>
        </tr>
    </>
}

export default Row