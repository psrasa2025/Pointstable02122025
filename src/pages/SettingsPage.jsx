import { useState } from 'react'
import InfoSection from '../components/InfoSection'
import Button from '../components/Button'
import './SettingsPage.css'

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    weeklyDigest: true,
    marketingEmails: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false
  })

  const [account, setAccount] = useState({
    language: 'en',
    timezone: 'UTC',
    theme: 'light'
  })

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleAccountChange = (key, value) => {
    setAccount(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    console.log('Saving settings:', { notifications, privacy, account })
    alert('Settings saved successfully!')
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-list">
          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email Notifications</span>
              <span className="setting-description">Receive notifications via email</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
              className="toggle"
            />
          </label>

          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Push Notifications</span>
              <span className="setting-description">Receive push notifications</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange('push')}
              className="toggle"
            />
          </label>

          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">SMS Notifications</span>
              <span className="setting-description">Receive notifications via SMS</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange('sms')}
              className="toggle"
            />
          </label>

          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Weekly Digest</span>
              <span className="setting-description">Receive weekly summary of activities</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyDigest}
              onChange={() => handleNotificationChange('weeklyDigest')}
              className="toggle"
            />
          </label>

          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Marketing Emails</span>
              <span className="setting-description">Receive promotional and marketing content</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.marketingEmails}
              onChange={() => handleNotificationChange('marketingEmails')}
              className="toggle"
            />
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account</h2>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Language</span>
              <span className="setting-description">Choose your preferred language</span>
            </div>
            <select
              value={account.language}
              onChange={(e) => handleAccountChange('language', e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Timezone</span>
              <span className="setting-description">Select your timezone</span>
            </div>
            <select
              value={account.timezone}
              onChange={(e) => handleAccountChange('timezone', e.target.value)}
              className="setting-select"
            >
              <option value="UTC">UTC (GMT+0)</option>
              <option value="EST">Eastern (GMT-5)</option>
              <option value="CST">Central (GMT-6)</option>
              <option value="MST">Mountain (GMT-7)</option>
              <option value="PST">Pacific (GMT-8)</option>
              <option value="IST">India (GMT+5:30)</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Theme</span>
              <span className="setting-description">Choose your display theme</span>
            </div>
            <select
              value={account.theme}
              onChange={(e) => handleAccountChange('theme', e.target.value)}
              className="setting-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Privacy</h2>
        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Profile Visibility</span>
              <span className="setting-description">Who can view your profile</span>
            </div>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="setting-select"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Show Email</span>
              <span className="setting-description">Display email on profile</span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showEmail}
              onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
              className="toggle"
            />
          </label>

          <label className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Show Phone</span>
              <span className="setting-description">Display phone number on profile</span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showPhone}
              onChange={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
              className="toggle"
            />
          </label>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h2>Danger Zone</h2>
        <div className="settings-list">
          <div className="setting-item danger-item">
            <div className="setting-info">
              <span className="setting-label">Deactivate Account</span>
              <span className="setting-description">Temporarily disable your account</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => alert('Account deactivation feature coming soon!')}
            >
              Deactivate
            </Button>
          </div>

          <div className="setting-item danger-item">
            <div className="setting-info">
              <span className="setting-label">Delete Account</span>
              <span className="setting-description">Permanently delete your account and all data</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
                  alert('Account deletion feature coming soon!')
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <Button variant="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage


