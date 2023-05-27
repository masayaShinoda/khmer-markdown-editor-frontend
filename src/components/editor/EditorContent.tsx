import { FunctionComponent } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import styles from "./Editor.module.css"

interface ArticleContent {
    content: string,
}

const EditorContent: FunctionComponent<ArticleContent> = (props: ArticleContent) => {
    return <section className={styles.editor_content}>
        <textarea 
            name="" 
            id="" 
            defaultValue={props.content}
            className={styles.editor_textarea}
        >
        </textarea>
    </section>
}

export default EditorContent