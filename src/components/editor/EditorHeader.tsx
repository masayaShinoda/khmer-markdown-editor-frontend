import { FunctionComponent, ChangeEvent, useState } from "react"
import styles from "./Editor.module.css"

interface ArticleMetadata {
    title: string,
    category?: string,
    created_at?: string,
    updated_at?: string,
}

const EditorHeader: FunctionComponent<ArticleMetadata> = (props: ArticleMetadata) => {
    const category_from_props: string = props.category ? props.category : ""

    const [titleInputValue, setTitleInputValue] = useState<string>(props.title)
    const [categoryInputValue, setCategoryInputValue] = useState<string>(category_from_props)

    function handleTitleInput(e: ChangeEvent<HTMLInputElement>) {
        setTitleInputValue(e.target.value)
    }
    function handleCategoryInput(e: ChangeEvent<HTMLInputElement>) {
        setCategoryInputValue(e.target.value)
    }

    return <section className={styles.editor_header}>
        <input 
            type="text" 
            name="title" 
            value={titleInputValue} 
            // placeholder={props.title}
            onChange={handleTitleInput}
            className={`${styles.editor_input_text} ${styles.editor_input_text__title}`}
        />
        <div className={styles.date_section}>
            {props.created_at ?
                <span>
                    <span className={styles.date_label}>
                        បង្កើតឡើង៖ 
                    </span>
                    <time>{(new Date(props.created_at)).toLocaleDateString('km')} - {new Date(props.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
                </span>
            : null}
            <span>
                <span className={styles.date_label}>
                    ប្រភេទអត្តបទ៖ 
                </span>
                <span>
                    <input 
                        type="text" 
                        name="category"
                        placeholder={categoryInputValue.length > 0 ? categoryInputValue : "មិនកំណត់"}
                        value={categoryInputValue}
                        onChange={handleCategoryInput}
                        className={`${styles.editor_input_text}`}
                    />
                </span>
            </span>
        </div>
    </section>
}

export default EditorHeader