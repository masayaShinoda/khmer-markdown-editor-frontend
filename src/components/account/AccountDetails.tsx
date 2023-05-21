import { FunctionComponent, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import styles from "./Account.module.css"
import { useNavigate } from "react-router-dom"

interface Props {
    user: {
        username: string,
    }
}

const AccountDetails: FunctionComponent<Props> = (props: Props) => {

    const navigate = useNavigate()

    const { setUser, setAccessToken } = useContext(UserContext)

    function handleSignOut() {
        setUser(null)
        setAccessToken(null)
        localStorage.removeItem("access_token")
        navigate('/login')
    }

    return <div>
        <h1>អំពីគណនី</h1>
        <div className={styles.account_details_container}>
            <h5 title="ឈ្មោះគណនីប្រើសម្រាប់ចូលប្រើប្រាស់កម្មវិធី">ឈ្មោះគណនី <i className="icon hint"></i></h5>
            <p>{props.user.username}</p>
        </div>

        <button
            className="btn_main scale_2"
            aria-label="Sign out"
            onClick={handleSignOut}
        >
            <i className="icon sign_out"></i>
            ចេញពីគណនី
        </button>
    </div>
}

export default AccountDetails