import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  const menuItems = [
    { id: 1, label: 'Find Activity', icon: '🔍', path: '/find-activity' },
    { id: 2, label: 'Profile', icon: '👤', path: '/profile' },
    { id: 3, label: 'View Activity', icon: '📋', path: '/activities-list' },
    { id: 4, label: 'Refer/Request', icon: '👥', path: '/friend-requests' },
    { id: 5, label: 'View Points', icon: '💰', path: '/points-table' },
    { id: 6, label: 'Donate', icon: '🎁', path: '/donation' },
    { id: 7, label: 'Convert Currency', icon: '💱', path: '/convert-points' },
    { id: 8, label: 'Transfer Points', icon: '💸', path: '/transfer-points' },
    { id: 9, label: 'Leaders Overview', icon: '🏆', path: '/leaders' },
    { id: 10, label: 'Own Activity', icon: '⭐', path: '/own-activity' }
  ]

  return (
    <div className="home-page">
      <div className="home-header">
        <button className="back-btn" onClick={() => navigate('/login')}>
          ← Home
        </button>
      </div>

      <div className="home-content">
        <h1 className="welcome-title">Welcome Back Ravi</h1>

        <div className="menu-grid">
          {menuItems.map(item => (
            <button
              key={item.id}
              className="menu-item"
              onClick={() => navigate(item.path)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

