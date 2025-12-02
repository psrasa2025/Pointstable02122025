import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import SettingsPage from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'
import ActivityPage from './pages/ActivityPage'
import ActivitiesListPage from './pages/ActivitiesListPage'
import FindActivityPage from './pages/FindActivityPage'
import ActivityFormPage from './pages/ActivityFormPage'
import PointsTablePage from './pages/PointsTablePage'
import DonationPage from './pages/DonationPage'
import ConvertPointsPage from './pages/ConvertPointsPage'
import TransferPointsPage from './pages/TransferPointsPage'
import InviteActivitiesPage from './pages/InviteActivitiesPage'
import FriendRequestsPage from './pages/FriendRequestsPage'
import LeadersPage from './pages/LeadersPage'
import CountryLeaderPage from './pages/CountryLeaderPage'
import WorldLeaderPage from './pages/WorldLeaderPage'
import OwnActivityPage from './pages/OwnActivityPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={
        <Layout>
          <DashboardPage />
        </Layout>
      } />
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
      <Route path="/notifications" element={
        <Layout>
          <NotificationsPage />
        </Layout>
      } />
      <Route path="/activity" element={
        <Layout>
          <ActivityPage />
        </Layout>
      } />
      <Route path="/home" element={<HomePage />} />
      <Route path="/activities-list" element={<ActivitiesListPage />} />
      <Route path="/find-activity" element={<FindActivityPage />} />
      <Route path="/activity-form" element={<ActivityFormPage />} />
      <Route path="/points-table" element={<PointsTablePage />} />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="/convert-points" element={<ConvertPointsPage />} />
      <Route path="/transfer-points" element={<TransferPointsPage />} />
      <Route path="/invite-activities" element={<InviteActivitiesPage />} />
      <Route path="/friend-requests" element={<FriendRequestsPage />} />
      <Route path="/leaders" element={<LeadersPage />} />
      <Route path="/country-leader" element={<CountryLeaderPage />} />
      <Route path="/world-leader" element={<WorldLeaderPage />} />
      <Route path="/own-activity" element={<OwnActivityPage />} />
    </Routes>
  )
}

export default App

