import { FunctionComponent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "../utils/BackButton"
import delete_article from "../../utils/delete_article"
import styles from "./Editor.module.css"

interface EditorHeaderProps {
    slug: string,
    title: string,
    category_name: string,
    created_at?: string,
    updated_at?: string,
    handleTitle: (title: string) => void,
    handleCategory: (category: string) => void,
    access_token: string,
}

const EditorHeader: FunctionComponent<EditorHeaderProps> = (props: EditorHeaderProps) => {
    const navigate = useNavigate()

    const category_from_props: string = props.category_name ? props.category_name : ""

    function handleTitleInput(e: ChangeEvent<HTMLInputElement>) {
        props.handleTitle?.(e.target.value)
    }
    
    function handleCategoryInput(e: ChangeEvent<HTMLInputElement>) {
        props.handleCategory?.(e.target.value)
    }

    function handleDeleteButton() {
        delete_article(props.access_token, props.slug)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                    return
                }
                if(data) {
                    console.log(data)
                    return navigate("/")
                }
            })
    }

    return <section className={styles.editor_header}>
        <div className={styles.top_section}>
            <nav style={{marginRight: `1rem`}}>
                <BackButton back_to="/" />
            </nav>
            <input 
                required
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
                <span>រក្សា&#8288;ទុក</span>
            </button>
            <button 
                onClick={handleDeleteButton}
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