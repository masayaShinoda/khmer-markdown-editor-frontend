import { FunctionComponent, useEffect, useContext, useState, FormEvent } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import LoadingSpinner from "../utils/LoadingSpinner"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import styles from "./Editor.module.css"

const Editor: FunctionComponent = () => {
    const { slug } = useParams()
    const { accessToken } = useContext(UserContext)
    
    const [title, setTitle] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [createdAt, setCreatedAt] = useState<string>("")
    const [updatedAt, setUpdatedAt] = useState<string>("")
    

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

    async function get_article(slug: string | undefined, token: string,) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/article/${slug}/`
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            return response.json()
        } catch (err) {
            return { "error": err }
        }
    }

    useEffect(() => {
        get_article(slug, accessToken)
            .then(data => {
                setTitle(data.title)
                setCategory(data.category_name ? data.category_name : "")
                setContent(data.content)
                setCreatedAt(data.created_at)
                setUpdatedAt(data.updated_at)
            })

    }, [slug, accessToken])


    return (
        <>
            {title && content ?
                <div className={styles.editor_wrapper}>
                    <form 
                        id="editor_form"
                        name="editor_form"
                        onSubmit={handleSubmit}
                    >
                        <section className={styles.editor_top_section}>
                            <EditorHeader 
                                title={title}
                                category_name={category}
                                created_at={createdAt}
                                updated_at={updatedAt}
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
            : <>
                <LoadingSpinner />
                <span style={{marginLeft: ".75rem"}}>Loading...</span>
            </>}                
        </>
    )
}

export default Editor