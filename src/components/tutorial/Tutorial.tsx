import { FunctionComponent } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const tutorial_content: string = `
**តារាងមាតិកា**
- [ការណែនាំ](#ការណែនាំ)

## ការណែនាំ
ខ្ញុំមានឈ្មោះថា[ម៉ាសាយ៉ា](https://masayashida.com) ហើយបានបង្កើតកម្មវិធីនេះឡើងក្នុងគោលបំណងជំរុញការសរសេរភាសាខ្មែរនៅលើបណ្តាញអ៊ីនធឺណិត ហើយក៏ខ្ញុំចង់យកឱកាសនេះដើម្បីហាត់សរសេរកូដនិងសរសេរអក្សរខ្មែរផងដែរ។
`

const Tutorial: FunctionComponent = () => {
    return <>
        <h1>របៀបប្រើប្រាស់</h1>
        <ReactMarkdown>{tutorial_content}</ReactMarkdown>
    </>
}

export default Tutorial