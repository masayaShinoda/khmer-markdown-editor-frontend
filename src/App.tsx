import { FunctionComponent, ReactNode, Suspense, useState, useRef, useMemo, useContext, useEffect } from "react"
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
import LoadingSpinner from "./components/utils/LoadingSpinner"
import NotFoundPage from "./components/404/404"
import { UserContext, UserProvider } from "./context/UserContext"

function App() {

  interface ProtectedRouteProps {
    children: ReactNode,
  }

  const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
    const { user } = useContext(UserContext)

    return (
      user ? <>{props.children}</> : <Navigate to={"/login"} state={{message: "សូមចូលទៅកាន់គណនីលោកអ្នកដើម្បីបន្ត។"}} />
    )
  }

  return (
    <Router>
      <Suspense fallback={<Layout><LoadingSpinner /><p style={{marginLeft: ".5rem"}}>Loading...</p></Layout>}>
        <Layout>
          <UserProvider>
            <Routes>
              <Route path="login" element={<LoginForm />} />
              <Route index 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="editor" 
                element={
                  <ProtectedRoute>
                    <Editor />
                  </ProtectedRoute>
                } 
              />
              <Route path="account" 
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                } 
              />
              {/* settings component is not a protected route but certain settings are only shown when user is logged in */}
              <Route path="settings" element={<Settings />} />
              {/* no match */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </UserProvider>
        </Layout>
      </Suspense>
    </Router>
  )
}

export default App
