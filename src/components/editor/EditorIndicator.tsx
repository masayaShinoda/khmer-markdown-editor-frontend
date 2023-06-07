// fixed position container for loading spinner, used in Editor component
import { FunctionComponent } from "react"
import LoadingSpinner from "../utils/LoadingSpinner"
import styles from "./Editor.module.css"

interface Props {
    text?: string,
}

const EditorIndicator: FunctionComponent<Props> = (props: Props) => {
    return <div className={styles.editor_indicator_container}>
        <LoadingSpinner theme="primary" />
        {props.text ? <span className={styles.editor_indicator_text}>
            {props.text}
        </span> : null}
    </div>
}

export default EditorIndicator