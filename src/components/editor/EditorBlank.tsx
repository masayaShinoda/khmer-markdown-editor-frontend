import { FunctionComponent } from "react"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import BackButton from "../utils/BackButton"
import styles from "./Editor.module.css"

const EditorBlank: FunctionComponent = () => {
    
    return <div className={styles.editor_wrapper}>
        <nav style={{marginBottom: `1rem`}}>
            <BackButton />
        </nav>
        <EditorHeader 
            title="[ចំណងជើង]"
            category="[ប្រភេទអត្តបទ]"
        />
        <EditorContent 
            content="[សរសេរអត្តបទនៅទីនេះ]"
        />
    </div>
}

export default EditorBlank