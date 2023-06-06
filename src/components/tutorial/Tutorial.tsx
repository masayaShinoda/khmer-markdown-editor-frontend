import { FunctionComponent } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const tutorial_content: string = `
## ១. ការណែនាំ
ខ្ញុំមានឈ្មោះថា[ម៉ាសាយ៉ា](https://masayashida.com) ហើយបានបង្កើតកម្មវិធីនេះឡើងក្នុងគោលបំណងជំរុញការសរសេរភាសាខ្មែរនៅលើបណ្តាញអ៊ីនធឺណិត ហើយក៏ខ្ញុំចង់យកឱកាសនេះដើម្បីហាត់សរសេរកូដនិងសរសេរអក្សរខ្មែរផងដែរ។

## ២. ទម្រង់សរសេរម៉ាកដោន (Markdown)
ម៉ាកដោន​ (Markdown) គឺជាទម្រង់នៃការសរសេរបង្កើតឡើងដើម្បីជំនួយទៅដល់ការសរសេរមាតិកាផ្សេងៗដូចជាអត្តបទឬសៀវភៅជាដើម។
ឧទាហរណ៍៖ អ្នកចង់សរសេរចំណងជើងអត្តបទមួយនៅក្នុងគេហទំព័ររបស់អ្នក។

### ២.១. ចំណងជើង

នៅក្នុងភាសា HTML អ្នកត្រូវសរសេរកូដក្នុងទម្រង់ខាងក្រោម៖

~~~
<h1>ចំណងជើង</h1>
~~~

នៅក្នុងទម្រង់សរសេរម៉ាកដោន អ្នកមិនចាំបាច់សរសេរកូដស្មុគស្មាញនោះទេ គឺគ្រាន់តែប្រើសញ្ញាមួយនៅដើមបន្ទាត់ប៉ុណ្ណោះ៖
~~~
# ចំណងជើង
~~~

`

const Tutorial: FunctionComponent = () => {
    return <>
        <h1>របៀបប្រើប្រាស់</h1>
        <div id="table-of-contents">
            
        </div>
        <div className="content_kh">
            <ReactMarkdown>{tutorial_content}</ReactMarkdown>
        </div>
    </>
}

export default Tutorial