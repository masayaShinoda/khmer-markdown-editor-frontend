import { FunctionComponent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "../utils/BackButton"
import delete_article from "../../utils/delete_article"
import styles from "./Editor.module.css"

interface EditorHeaderProps {
    is_blank_page?: boolean,
    article_id: string,
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
        delete_article(props.access_token, props.article_id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    return
                }
                if (data.success) {
                    console.log(data)
                    return navigate("/")
                }
            })
    }

    return <section className={styles.editor_header}>
        <div className={styles.top_section}>
            <div className={styles.editor_header_title_section}>
                <nav style={{ marginRight: `.5rem` }}>
                    <BackButton back_to="/" />
                </nav>
                <input
                    required
                    type="text"
                    name="title"
                    value={props.title}
                    placeholder="[ចំណងជើង]"
                    onChange={handleTitleInput}
                    onKeyDown={(e) => { e.key === "Enter" && e.preventDefault() }} // prevent enter key from submitting
                    className={`${styles.editor_input_text} ${styles.editor_input_text__title}`}
                />
            </div>
            <div className={styles.editor_header_action_buttons}>
                <button
                    id="submit_editor_form"
                    type="submit"
                    aria-label="Save progress"
                    className={`btn_main btn_main__clr_secondary ${styles.editor_header_action_button}`}
                >
                    <i className="icon save"></i>
                    <span>រក្សា&#8288;ទុក</span>
                </button>
                {
                    !props.is_blank_page ?
                        <button
                            onClick={handleDeleteButton}
                            type="button"
                            aria-label="Delete"
                            className={`btn_main ${styles.editor_header_action_button}`}
                            style={{
                                marginLeft: `.5rem`
                            }}
                        >
                            <i className="icon trash"></i>
                            <span>
                                លុប
                            </span>
                        </button>
                        : null
                }

            </div>
        </div>
        <div className={styles.date_section}>
            <span>
                <span className={styles.date_label}>
                    ប្រភេទអត្តបទ៖
                </span>
                <span className={styles.editor_header_input_category_container}>
                    <input
                        type="text"
                        name="category"
                        placeholder={category_from_props.length > 0 ? category_from_props : "មិនកំណត់"}
                        value={props.category_name}
                        onChange={handleCategoryInput}
                        onKeyDown={(e) => { e.key === "Enter" && e.preventDefault() }} // prevent enter key from submitting
                        className={`${styles.editor_input_text} ${styles.editor_header_input_category}`}
                    />
                </span>
            </span>
            {props.updated_at ?
                <span>
                    <span className={styles.date_label}>
                        កែប្រែចុងក្រោយ៖
                    </span>
                    <time>{(new Date(props.updated_at)).toLocaleDateString('km')} - {new Date(props.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                </span>
                : null}
        </div>
        {/* <div className={styles.controls_section}>
            <button>

            </button>
        </div> */}
    </section>
}

export default EditorHeader