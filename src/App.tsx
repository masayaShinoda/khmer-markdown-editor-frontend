import { FunctionComponent, ReactNode, Suspense, useState, useMemo } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./components/dashboard/Dashboard"
import Editor from "./components/editor/Editor"
import Account from "./components/account/Account"
import LoginForm from "./components/account/LoginForm"
import Settings from "./components/settings/Settings"
import { UserContext } from "./context/UserContext"
import LoadingSpinner from "./components/utils/LoadingSpinner"
import NotFoundPage from "./components/404/404"

function App() {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  interface ProtectedRouteProps {
    user: typeof user,
    children: ReactNode,
  }

  const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
    if (props.user) {
      return props.children
    } else return <Navigate to={"/login"} state={{message: "សូមចូលទៅកាន់គណនីលោកអ្នកដើម្បីបន្ត។"}} />
  }

  return (
    <Router>
      <Suspense fallback={<Layout><LoadingSpinner /><p style={{marginLeft: ".5rem"}}>Loading...</p></Layout>}>
        <Layout>
          <UserContext.Provider value={providerValue}>
            <Routes>
              <Route index 
                element={
                  <ProtectedRoute user={user}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="editor" 
                element={
                  <ProtectedRoute user={user}>
                    <Editor />
                  </ProtectedRoute>
                } 
              />
              <Route path="login" element={<LoginForm />} />
              <Route path="account" 
                element={
                  <ProtectedRoute user={user}>
                    <Account />
                  </ProtectedRoute>
                } 
              />
              {/* settings component is not a protected route but certain settings are only shown when user is logged in */}
              <Route path="settings" element={<Settings />} />
              {/* no match */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </UserContext.Provider>
        </Layout>
      </Suspense>
    </Router>
  )
}

export default App
