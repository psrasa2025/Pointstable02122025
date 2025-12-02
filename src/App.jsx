import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/profile" element={
        <Layout>
          <ProfilePage />
        </Layout>
      } />
      <Route path="/edit" element={
        <Layout>
          <EditProfilePage />
        </Layout>
      } />
      <Route path="/settings" element={
        <Layout>
          <SettingsPage />
        </Layout>
      } />
    </Routes>
  )
}

export default App

