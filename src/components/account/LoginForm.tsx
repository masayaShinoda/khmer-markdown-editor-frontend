import { FormEvent, FunctionComponent, useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import styles from "../../styles/Account.module.css"
import LoadingSpinner from "../utils/LoadingSpinner"

const LoginForm: FunctionComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { user, setUser, setAccessToken } = useContext(UserContext)

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [inputsAreEmpty, setInputsAreEmpty] = useState<boolean>(true)
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
    const [connectionError, setConnectionError] = useState<boolean>(false)
    const [connectionErrorCode, setConnectionErrorCode] = useState<string>("")
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)
    const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false)


    // handle empty inputs
    useEffect(() => {
        if(username.length === 0 || password.length === 0) {
            setInputsAreEmpty(true)
            setSubmitBtnDisabled(true)
        } else {
            setInputsAreEmpty(false)
            setSubmitBtnDisabled(false)
        }
    }, [username, password])


    async function login(username: string, password: string) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/token/`

        // display loading spinner
        setSubmitBtnLoading(true)

        // disable button whilst requesting login
        setSubmitBtnDisabled(true)

        // hide error messages
        setInvalidCredentials(false)
        setConnectionError(false)

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })
            // re-enable submit button & remove loading spinner
            setSubmitBtnDisabled(false)
            setSubmitBtnLoading(false)
            return response.json()
        } catch (err) {
            setConnectionError(true)
            setConnectionErrorCode(JSON.stringify(err))
            // re-enable submit button & remove loading spinner
            setSubmitBtnDisabled(false)
            setSubmitBtnLoading(false)
            return { "error": err }
        }
    }
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        login(username, password)
            .then(data => {
                if(data["error"]) {
                    setConnectionError(true)
                    setConnectionErrorCode(data["error"])

                    return
                }

                if(data.access) {
                    // hide any previous invalid credentials error message
                    setInvalidCredentials(false)
                    // store user in context
                    setUser({
                        username: username
                    })
                    // set auth token in context
                    setAccessToken(data.access)

                    localStorage.setItem("access_token", data.access)
                    // redirect to homepage using react router
                    navigate('/')                    
                } else {                    
                    setInvalidCredentials(true)
                    // clear input fields
                    setUsername("")
                    setPassword("")
                }
            })
    }

    if(user !== null) {
        return <Navigate to={'/'} />
    } else {
        return <div>
            <h2>ចូលគណនី</h2>
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
                            <span>ចូល</span>
                        </button>
                    </div>
                    <div className={styles.messages_section}>
                        {
                            invalidCredentials ? 
                                <span className="toast utils clr_danger bg_clr_danger_translucent">
                                    សូមពិនិត្យមើលឈ្មោះគណនីឬពាក្យសម្ងាត់របស់អ្នកម្តងទៀត។
                                </span>
                            : null
                        }
                        {
                            connectionError ? 
                                <span className="toast utils clr_danger bg_clr_danger_translucent">
                                    កម្មវិធីមានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់សេវាកម្ម។ សូមព្យាយាមម្តងទៀត។ {connectionErrorCode ? connectionError : null}
                                </span>
                            : null
                        }
                        {location?.state?.message? 
                            <span className="toast utils clr_warning bg_clr_warning_translucent">
                                {location.state.message}
                            </span>
                        : null}
                    </div>
                </form>
            </div>
        </div>
    }
}

export default LoginForm