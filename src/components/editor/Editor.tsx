import { FunctionComponent, useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import LoadingSpinner from "../utils/LoadingSpinner"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import BackButton from "../utils/BackButton"
import styles from "./Editor.module.css"

interface Article {
    title: string,
    category: string,
    content: string,
    created_at: string,
    updated_at: string,
}

const Editor: FunctionComponent = () => {
    const { slug } = useParams()
    const { accessToken } = useContext(UserContext)
    
    const [article, setArticle] = useState<Article | null>(null)

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
                setArticle({
                    title: data.title,
                    category: data.category,
                    content: data.content,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                })
            })
    }, [slug, accessToken])


    return (
        <>
            {article ?
                <div className={styles.editor_wrapper}>
                    <nav style={{marginBottom: `1rem`}}>
                        <BackButton />
                    </nav>
                    <EditorHeader 
                        title={article.title} 
                        category={article.category} 
                        created_at={article.created_at} 
                        updated_at={article.updated_at} 
                    />
                    <EditorContent 
                        content={article.content}
                    />
                </div>
            : <>
                <LoadingSpinner />
                <span style={{marginLeft: ".75rem"}}>Loading...</span>
            </>}                
        </>
    )
}

export default Editor