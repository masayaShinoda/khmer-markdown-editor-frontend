import { FunctionComponent, useEffect, useContext, useState, FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import LoadingSpinner from "../utils/LoadingSpinner"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import EditorIndicator from "./EditorIndicator"
import ToastMessage from "../utils/ToastMessage"
import slugify from "../../utils/slugify"
import update_article from "../../utils/update_article"
import useHotkeySave from "../../hooks/useHotkeySave"
import styles from "./Editor.module.css"

const Editor: FunctionComponent = () => {
    const navigate = useNavigate()

    const slugParam = useParams().slug || ""
    const { accessToken } = useContext(UserContext)

    const [articleId, setArticleId] = useState<string>("")
    const [slug, setSlug] = useState<string>(slugParam)
    const [title, setTitle] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [createdAt, setCreatedAt] = useState<string>("")
    const [updatedAt, setUpdatedAt] = useState<string>("")

    const [activeToastMsg, setActiveToastMsg] = useState<string | null>(null)

    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [connectionError, setConnectionError] = useState<boolean>(false)


    function handleSubmit(e?: FormEvent) {
        e?.preventDefault()

        setIsSaving(true)

        update_article(accessToken, articleId, slug, title, category, content)
            .then(data => {
                if (data.error) {
                    // console.log(data.error)
                    setConnectionError(true)
                    setIsSaving(false)
                    return
                }
                if (data) {
                    // console.log(data.updated_article)
                    setUpdatedAt(data.updated_article.updated_at)
                    setConnectionError(false)
                    navigate(`/editor/slug/${data.updated_article.slug}/`) // navigate to new slug
                    setIsSaving(false)
                    return
                }
            })

    }

    function handleTitle(title: string) {
        setTitle(title)
        setSlug(slugify(title))
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

    async function get_article(slug: string, token: string,) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/article/slug/${slug}/`
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
        // using slugParam instead of slug to prevent re-fetching article every time slug updates
        get_article(slugParam, accessToken)
            .then(data => {
                setArticleId(data.id)
                setTitle(data.title)
                setCategory(data.category_name ? data.category_name : "")
                setContent(data.content)
                setCreatedAt(data.created_at)
                setUpdatedAt(data.updated_at)
            })

    }, [slugParam, accessToken])

    // listen to keyboard shortcuts
    useHotkeySave(() => {
        document.getElementById("submit_editor_form")?.click()
    })

    // object to store possible toast message contents, and their corresponding class names
    const ToastMessages = {
        "connectionError": {
            "message": "កម្មវិធីមានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់សេវាកម្ម។ សូមព្យាយាមម្តងទៀត។",
            "util_classes": "clr_danger bg_clr_danger_translucent",
        }
    }

    useEffect(() => {
        if (connectionError) {
            setActiveToastMsg("connectionError")
        }
    }, [connectionError])

    return (
        <>
            {/* updatedAt is the condition to listen to because title, category, and content can be empty when user is editing */}
            {updatedAt ?
                <div className={styles.editor_wrapper}>
                    <form
                        id="editor_form"
                        name="editor_form"
                        onSubmit={handleSubmit}
                    >
                        <EditorHeader
                            article_id={articleId}
                            slug={slug}
                            title={title}
                            category_name={category}
                            created_at={createdAt}
                            updated_at={updatedAt}
                            handleTitle={handleTitle}
                            handleCategory={handleCategory}
                            access_token={accessToken}
                        />
                        <div>
                            {
                                activeToastMsg ?
                                    <ToastMessage
                                        activeToastMsg={activeToastMsg}
                                        toastMessages={ToastMessages}
                                    />
                                    : null
                            }
                        </div>
                        <EditorContent
                            content={content}
                            handleContent={handleContent}
                        />
                        {isSaving ?
                            <EditorIndicator text="កំពុងរក្សាទុក" />
                            : null}
                    </form>
                </div>
                : <>
                    <LoadingSpinner theme="primary" />
                    <span style={{ marginLeft: ".75rem" }}>កំពុងទាញយកទិន្នន័យ...</span>
                </>}
        </>
    )
}

export default Editor