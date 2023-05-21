import { FormEvent, FunctionComponent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../utils/LoadingSpinner"
import register from "../../utils/register"
import styles from "./Account.module.css"

const RegisterForm: FunctionComponent = () => {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [inputsAreEmpty, setInputsAreEmpty] = useState<boolean>(true)
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)
    const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false)


    // handle empty inputs
    useEffect(() => {
        if(username.length === 0 || email.length === 0 || password.length === 0) {
            setInputsAreEmpty(true)
            setSubmitBtnDisabled(true)
        } else {
            setInputsAreEmpty(false)
            setSubmitBtnDisabled(false)
        }
    }, [username, email, password])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        register(username, email, password)
            .then(data => {
                console.log(data)
            })
    }


    return <>
        <h2>បង្កើតគណនីថ្មី</h2>
        <div style={{marginBottom: `1rem`}}>
            <Link to="/login" className="utils type_scale_2">ខ្ញុំមានគណនីហើយ →</Link>
        </div>
        <div className={styles.form_wrapper}>
            <form onSubmit={handleSubmit}>
                <div className="input_wrapper">
                    <label htmlFor="username">ឈ្មោះគណនី</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input_text"
                        aria-label="Username"
                    />
                </div>
                <div className="input_wrapper">
                    <label htmlFor="email">អ៊ីមែល</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input_text"
                        aria-label="Email"
                        placeholder="example@mail.com"
                    />
                </div>
                <div className="input_wrapper">
                    <label htmlFor="password">ពាក្យសម្ងាត់</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input_text"
                        aria-label="Password"
                    />
                </div>
                <div className={styles.action_section}>
                    <button 
                        type="submit" 
                        className={
                            `btn_main scale_2 utils ${submitBtnDisabled !== true ? "bg_clr_secondary" : ""} clr_light`
                        } 
                        disabled={inputsAreEmpty || submitBtnDisabled ? true : false}
                        aria-label="Sign in"
                    >
                        {submitBtnLoading ? <div style={{marginRight: `.25rem`}}><LoadingSpinner /></div> : null}
                        <span>បង្កើតគណនី</span>
                    </button>
                </div>
                <div className={styles.messages_section}>
                </div>
            </form>
        </div>
    </>
}

export default RegisterForm