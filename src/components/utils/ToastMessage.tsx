import { FunctionComponent } from "react"

interface ToastMessageProps {
    activeToastMsg: string | null,
    toastMessages: any,
}

const ToastMessage: FunctionComponent<ToastMessageProps> = (props: ToastMessageProps) => {
    return (
        <span className={
            `toast utils 
                ${
                    props.activeToastMsg === "routerMsg" ? props.toastMessages["routerMsg"]["util_classes"] 
                    : props.activeToastMsg === "invalidCredentials" ? props.toastMessages["invalidCredentials"]["util_classes"] 
                    : props.activeToastMsg === "connectionError" ? props.toastMessages["connectionError"]["util_classes"] 
                    : null
                }
            `
        }>
            {
                props.activeToastMsg === "routerMsg" ? props.toastMessages["routerMsg"]["message"] 
                : props.activeToastMsg === "invalidCredentials" ? props.toastMessages["invalidCredentials"]["message"] 
                : props.activeToastMsg === "connectionError" ? props.toastMessages["connectionError"]["message"] 
                : null
            }
        </span>
    )
}

export default ToastMessage