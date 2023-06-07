// utility component for back buttons
import { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"

interface BackBtnProps {
    back_to?: string
}

const BackButton: FunctionComponent<BackBtnProps> = (props: BackBtnProps) => {
    const navigate = useNavigate()

    function handleGoBack() {
        if(props.back_to === "/") {
            navigate("/")
        } else {
            const hasPreviousPage = window.history.length > 1
    
            if (hasPreviousPage) {
                navigate(-1)
            } else {
                navigate("/")
            }
        }
    }

    return (
        <button 
            onClick={handleGoBack} 
            aria-label="Back to previous page"
            className="btn_main btn_main__icon_btn"
        >
            <i className="icon arrow_left"></i>
        </button>
    )
}

export default BackButton