import { FormEvent, FunctionComponent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import EditorIndicator from "./EditorIndicator"
import ToastMessage from "../utils/ToastMessage"
import save_article from "../../utils/save_article"
import slugify from "../../utils/slugify"
import useHotkeySave from "../../hooks/useHotkeySave"
import styles from "./Editor.module.css"

const EditorBlank: FunctionComponent = () => {
	const navigate = useNavigate()

	const { accessToken } = useContext(UserContext)

	const [slug, setSlug] = useState<string>("")
	const [title, setTitle] = useState<string>("")
	const [category, setCategory] = useState<string>("")
	const [content, setContent] = useState<string>("")

	const [activeToastMsg, setActiveToastMsg] = useState<string | null>(null)

	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [connectionError, setConnectionError] = useState<boolean>(false)


	function handleSubmit(e?: FormEvent) {
		e?.preventDefault()

		setIsSaving(true)

		save_article(accessToken, slug, title, category, content).then((data) => {
			if (data.error) {
				// console.log(data.error)
				setConnectionError(true)
				setIsSaving(false)
				return
			}
			if (data) {
				setConnectionError(false)
				navigate(`/editor/slug/${slug}`)
				setIsSaving(false)
				return
			}
		})

	}

	function handleTitle(title: string) {
		setTitle(title)
		// setSlug(title)
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
		<div className={styles.editor_wrapper}>
			<form id="editor_form" name="editor_form" onSubmit={handleSubmit}>
				<EditorHeader
					is_blank_page={true}
					article_id=""
					slug={slug}
					title={title}
					category_name={category}
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
				<EditorContent content={content} handleContent={handleContent} />
				{isSaving ?
					<EditorIndicator text="កំពុងរក្សាទុក" />
					: null}
			</form>
		</div>
	)
}

export default EditorBlank
