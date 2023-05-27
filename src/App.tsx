import { Suspense } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/dashboard/Dashboard"
import Editor from "./components/editor/Editor"
import EditorBlank from "./components/editor/EditorBlank"
import Account from "./components/account/Account"
import LoginForm from "./components/account/LoginForm"
import RegisterForm from "./components/account/RegisterForm"
import Settings from "./components/settings/Settings"
import LoadingSpinner from "./components/utils/LoadingSpinner"
import NotFoundPage from "./components/404/404"
import { UserProvider } from "./context/UserContext"

function App() {

  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<Layout><LoadingSpinner /><p style={{marginLeft: ".5rem"}}>Loading...</p></Layout>}>
          <Layout>
            <Routes>
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
              <Route index 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="editor/:slug" 
                element={
                  <ProtectedRoute>
                    <Editor />
                  </ProtectedRoute>
                } 
              />
              <Route path="editor/new" 
                element={
                  <ProtectedRoute>
                    <EditorBlank />
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
          </Layout>
        </Suspense>
      </Router>
    </UserProvider>
  )
}

export default App
