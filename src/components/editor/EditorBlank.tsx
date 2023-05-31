import { FormEvent, FunctionComponent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import { UserContext } from "../../context/UserContext"
import save_article from "../../utils/save_article"
import slugify from "../../utils/slugify"
import styles from "./Editor.module.css"
import useHotkeySave from "../../hooks/useHotkeySave"

const EditorBlank: FunctionComponent = () => {
	const navigate = useNavigate()

	const { accessToken } = useContext(UserContext)

	const [slug, setSlug] = useState<string>("")
	const [title, setTitle] = useState<string>("")
	const [category, setCategory] = useState<string>("")
	const [content, setContent] = useState<string>("")

	function handleSubmit(e?: FormEvent) {
		e?.preventDefault()

		save_article(accessToken, slug, title, category, content).then((data) => {
			if (data.error) {
				console.log(data.error)
				return
			}
			if (data) {
				navigate(`/editor/slug/${slug}`)
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
		handleSubmit()
	})

	return (
		<div className={styles.editor_wrapper}>
			<form id="editor_form" name="editor_form" onSubmit={handleSubmit}>
				<section className={styles.editor_top_section}>
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
				</section>
				<EditorContent content={content} handleContent={handleContent} />
			</form>
		</div>
	)
}

export default EditorBlank
