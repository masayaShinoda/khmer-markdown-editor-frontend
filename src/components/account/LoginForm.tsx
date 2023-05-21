import { FormEvent, FunctionComponent, useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import LoadingSpinner from "../utils/LoadingSpinner"
import ToastMessage from "../utils/ToastMessage"
import login from "../../utils/login"
import styles from "./Account.module.css"

const LoginForm: FunctionComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const router_message = location.state?.message? location.state.message : null

    const { user, setUser, setAccessToken } = useContext(UserContext)

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [activeToastMsg, setActiveToastMsg] = useState<string | null>(null)

    const [routerMsg, setRouterMsg] = useState(null)
    const [inputsAreEmpty, setInputsAreEmpty] = useState<boolean>(true)
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
    const [connectionError, setConnectionError] = useState<boolean>(false)

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

    // object to store possible toast message contents, and their corresponding class names
    const ToastMessages = {
        "routerMsg": {
            "message": routerMsg,
            "util_classes": "clr_warning bg_clr_warning_translucent",
        },
        "invalidCredentials": {
            "message": "សូមពិនិត្យមើលឈ្មោះគណនីឬពាក្យសម្ងាត់របស់អ្នកម្តងទៀត។",
            "util_classes": "clr_danger bg_clr_danger_translucent",
        },
        "connectionError": {
            "message": "កម្មវិធីមានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់សេវាកម្ម។ សូមព្យាយាមម្តងទៀត។",
            "util_classes": "clr_danger bg_clr_danger_translucent",
        }
    }

    // react to message passed from react-router-dom's useLocation()
    useEffect(() => {
        if(router_message) {
            setRouterMsg(router_message)
        }
    }, [router_message])

    // change activeToastMsg according to newest message state update
    useEffect(() => {
        if(routerMsg) {
            setActiveToastMsg("routerMsg")
        }
        if(invalidCredentials) {
            setActiveToastMsg("invalidCredentials")
        }
        if(connectionError) {
            setActiveToastMsg("connectionError")
        }
    }, [routerMsg, invalidCredentials, connectionError])


    
    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        // display loading spinner
        setSubmitBtnLoading(true)

        // disable button whilst requesting login
        setSubmitBtnDisabled(true)

        // hide error messages
        setInvalidCredentials(false)
        setConnectionError(false)

        login(username, password)
            .then(data => {
                // re-enable submit button & remove loading spinner
                setSubmitBtnDisabled(false)
                setSubmitBtnLoading(false)

                if(data.error) {
                    setConnectionError(true)
                    return
                }
                if(data.access) {
                    // hide any previous invalid credentials error message
                    setInvalidCredentials(false)
                    // set user in context
                    setUser({
                        username: username
                    })
                    // set auth token in context
                    setAccessToken(data.access)
                    // store access token in localstorage
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
        return <>
            <h2>ចូលគណនី</h2>
            <div style={{marginBottom: `1rem`}}>
                <Link to="/register" className="utils type_scale_2">បង្កើតគណនីថ្មី →</Link>
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
                            activeToastMsg ? 
                                <ToastMessage 
                                    activeToastMsg={activeToastMsg}
                                    toastMessages={ToastMessages}
                                />
                            : null
                        }
                    </div>
                </form>
            </div>
        </>
    }
}

export default LoginForm