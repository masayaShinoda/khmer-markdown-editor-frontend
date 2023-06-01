import { FunctionComponent } from "react"

interface ModalChoiceProps {
    isOpen: boolean,
    title: string,
}

const ModalChoice: FunctionComponent<ModalChoiceProps> = (props: ModalChoiceProps) => {

    return <dialog open={props.isOpen}>
        <p>{props.title}</p>
    </dialog>
}

export default ModalChoice