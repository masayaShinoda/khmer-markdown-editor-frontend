import { FunctionComponent, ChangeEvent } from "react"
import BackButton from "../utils/BackButton"
import styles from "./Editor.module.css"

interface ArticleMetadata {
    title: string,
    category_name: string,
    created_at?: string,
    updated_at?: string,
    handleTitle: (title: string) => void,
    handleCategory: (category: string) => void,
}

const EditorHeader: FunctionComponent<ArticleMetadata> = (props: ArticleMetadata) => {
    const category_from_props: string = props.category_name ? props.category_name : ""


    function handleTitleInput(e: ChangeEvent<HTMLInputElement>) {
        props.handleTitle?.(e.target.value)
    }
    
    function handleCategoryInput(e: ChangeEvent<HTMLInputElement>) {
        props.handleCategory?.(e.target.value)
    }

    return <section className={styles.editor_header}>
        <div className={styles.top_section}>
            <nav style={{marginRight: `1rem`}}>
                <BackButton />
            </nav>
            <input 
                type="text" 
                name="title" 
                value={props.title} 
                placeholder="[ចំណងជើង]"
                onChange={handleTitleInput}
                className={`${styles.editor_input_text} ${styles.editor_input_text__title}`}
            />
            <button 
                id="submit_editor_form"
                type="submit"
                aria-label="Save progress"
                className="btn_main"
                style={{
                    marginLeft: `1rem`
                }}
            >
                <i className="icon save"></i>
                <span>
                    រក្សាទុក
                </span>
            </button>
            <button 
                aria-label="Delete"
                className="btn_main"
                style={{
                    marginLeft: `.5rem`
                }}
            >
                <i className="icon trash"></i>
                <span>
                    លុប
                </span>
            </button>
        </div>
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
                        placeholder={category_from_props.length > 0 ? category_from_props : "មិនកំណត់"}
                        value={props.category_name}
                        onChange={handleCategoryInput}
                        className={`${styles.editor_input_text}`}
                    />
                </span>
            </span>
        </div>
    </section>
}

export default EditorHeader