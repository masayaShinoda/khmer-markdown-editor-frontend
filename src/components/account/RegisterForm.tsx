import { FormEvent, FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ToastMessage from "../utils/ToastMessage";
import LoadingSpinner from "../utils/LoadingSpinner";
import register from "../../utils/register";
import login from "../../utils/login";
import styles from "./Account.module.css";

const RegisterForm: FunctionComponent = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);

    if (!context) {
        return <p>Loading...</p>; // Handle the case when the context is not available
    }

    const { setUser, setAccessToken } = context;

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activeToastMsg, setActiveToastMsg] = useState<string | null>(null);
    const [inputsAreEmpty, setInputsAreEmpty] = useState<boolean>(true);
    const [connectionError, setConnectionError] = useState<boolean>(false);
    const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);

    // handle empty inputs
    useEffect(() => {
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            setInputsAreEmpty(true);
            setSubmitBtnDisabled(true);
        } else {
            setInputsAreEmpty(false);
            setSubmitBtnDisabled(false);
        }
    }, [username, email, password]);

    // object to store possible toast message contents, and their corresponding class names
    const ToastMessages = {
        "connectionError": {
            "message": "កម្មវិធីមានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់សេវាកម្ម។ សូមព្យាយាមម្តងទៀត។",
            "util_classes": "clr_danger bg_clr_danger_translucent",
        }
    };

    // change activeToastMsg according to newest message state update
    useEffect(() => {
        if (connectionError) {
            setActiveToastMsg("connectionError");
        }
    }, [connectionError]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // display loading spinner
        setSubmitBtnLoading(true);

        // disable button whilst requesting login
        setSubmitBtnDisabled(true);

        // hide error messages
        setConnectionError(false);

        register(username, email, password)
            .then(data => {
                // re-enable submit button & remove loading spinner
                setSubmitBtnDisabled(false);
                setSubmitBtnLoading(false);

                if (data.error) {
                    setConnectionError(true);
                    return;
                }
                if (data.success) {
                    // upon successful registration, log user in
                    login(username, password)
                        .then(data => {
                            if (data.error) {
                                // upon error logging in, redirect to login page
                                navigate("/login");
                            }
                            if (data.access) {
                                // set user in context
                                setUser({ username });
                                // set auth token in context
                                setAccessToken(data.access);
                                // store access token in localstorage
                                localStorage.setItem("access_token", data.access);
                                // redirect to homepage using react router
                                navigate('/');
                            }
                        });
                }
            });
    }

    return (
        <>
            <h2>បង្កើតគណនីថ្មី</h2>
            <div style={{ marginBottom: `1rem` }}>
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
                            className={`btn_main scale_2 utils ${submitBtnDisabled ? "" : "bg_clr_secondary"} clr_light`}
                            disabled={inputsAreEmpty || submitBtnDisabled}
                            aria-label="Sign in"
                        >
                            {submitBtnLoading && <div style={{ marginRight: `.25rem` }}><LoadingSpinner /></div>}
                            <span>បង្កើតគណនី</span>
                        </button>
                    </div>
                    <div className={styles.messages_section}>
                        {activeToastMsg && 
                            <ToastMessage 
                                activeToastMsg={activeToastMsg}
                                toastMessages={ToastMessages}
                            />
                        }
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
