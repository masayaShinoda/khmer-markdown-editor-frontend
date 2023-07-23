import { ChangeEvent, FunctionComponent, useRef, useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
// import PromptUserProgress from "../utils/PromptUserProgress"
import styles from "./Editor.module.css"

interface ArticleContentProps {
    content: string,
    handleContent: (content: string) => void,
}

const EditorContent: FunctionComponent<ArticleContentProps> = (props: ArticleContentProps) => {
    const [contentModified, setContentModified] = useState(false)
    const [outputVisible, setOutputVisible] = useState(false)
    const textAreaRef = useRef(null)

    function handleContentInput(e: ChangeEvent<HTMLTextAreaElement>) {
        props.handleContent?.(e.target.value)

        if (!contentModified) {
            setContentModified(true)
        }
        
        function resizeTextArea() {
            textAreaRef.current.style.height = "auto"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
        }
        resizeTextArea()
    }


    // useEffect(() => {
    //     // the handler for actually showing the prompt
    //     // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
    //     const handler = (event: BeforeUnloadEvent) => {
    //         event.preventDefault();
    //         event.returnValue = "";
    //     };

    //     // if the form is NOT unchanged, then set the onbeforeunload
    //     if (formState !== "unchanged") {
    //         window.addEventListener("beforeunload", handler);
    //         // clean it up, if the dirty state changes
    //         return () => {
    //             window.removeEventListener("beforeunload", handler);
    //         };
    //     }
    //     // since this is not dirty, don't do anything
    //     return () => { };
    // }, [formState]);


    return <>
        <button
            type="button"
            onClick={() => setOutputVisible(!outputVisible)}
            className="btn_main"
            style={{ margin: `.5rem 0` }}
        >
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
                        ref={textAreaRef}
                        rows={20}
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