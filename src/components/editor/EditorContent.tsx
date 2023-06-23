import { ChangeEvent, FunctionComponent, useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
// import PromptUserProgress from "../utils/PromptUserProgress"
import styles from "./Editor.module.css"

interface ArticleContentProps {
    content: string,
    handleContent: (content: string) => void,
}

const EditorContent: FunctionComponent<ArticleContentProps> = (props: ArticleContentProps) => {
    // const [contentModified, setContentModified] = useState(false)
    const [outputVisible, setOutputVisible] = useState(false)

    function handleContentInput(e: ChangeEvent<HTMLTextAreaElement>) {
        props.handleContent?.(e.target.value)
    }


    return <>
        <button
            type="button"
            onClick={() => setOutputVisible(!outputVisible)}
            className="btn_main">
            {
                outputVisible ? "កែអត្តបទ" : "បង្ហាញលទ្ថផល"
            }
        </button>
        <section className={styles.editor_content}>
            {
                outputVisible ?
                    <div className={styles.markdown_output_container}>
                        <ReactMarkdown>
                            {props.content}
                        </ReactMarkdown>
                    </div>
                    : <textarea
                        required
                        name="content"
                        value={props.content}
                        onChange={handleContentInput}
                        placeholder={props.content.length > 0 ? "" : "[សរសេរអត្តបទនៅទីនេះ]"}
                        className={styles.editor_textarea}
                    >
                    </textarea>
            }
        </section>
    </>
}

export default EditorContent