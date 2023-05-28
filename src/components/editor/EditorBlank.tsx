import { FormEvent, FunctionComponent, useState } from "react"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import styles from "./Editor.module.css"

const EditorBlank: FunctionComponent = () => {
    const [title, setTitle] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [content, setContent] = useState<string>("")

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }

    function handleTitle(title: string) {
        setTitle(title)
        return void 0
    }
    function handleCategory(category: string) {
        setCategory(category)
        return void 0
    }
    function handleContent(content: string) {
        setContent(content)
        return void 0
    }

    return <div className={styles.editor_wrapper}>
        <form 
            id="editor_form"
            name="editor_form"
            onSubmit={handleSubmit}
        >
            <section className={styles.editor_top_section}>
                <EditorHeader 
                    title={title}
                    category_name={category}
                    handleTitle={handleTitle}
                    handleCategory={handleCategory}
                />
            </section>
            <EditorContent 
                content={content}
                handleContent={handleContent}
            />
        </form>
    </div>
}

export default EditorBlank