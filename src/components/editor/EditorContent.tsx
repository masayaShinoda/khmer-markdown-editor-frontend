import { ChangeEvent, FunctionComponent } from "react"
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import styles from "./Editor.module.css"

interface ArticleContentProps {
    content: string,
    handleContent: (content: string) => void,
}

const EditorContent: FunctionComponent<ArticleContentProps> = (props: ArticleContentProps) => {
    function handleContentInput(e: ChangeEvent<HTMLTextAreaElement>) {
        props.handleContent?.(e.target.value)
    }

    return <section className={styles.editor_content}>
        <textarea 
            name="content" 
            // defaultValue={props.content.length > 0 ? props.content : ""}
            value={props.content}
            onChange={handleContentInput}
            placeholder={props.content.length > 0 ? "" : "[សរសេរអត្តបទនៅទីនេះ]"}
            className={styles.editor_textarea}
        >
        </textarea>
    </section>
}

export default EditorContent