import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>User Profile</h1>
          </Link>
          <nav className="nav">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/home" 
              className={`nav-link nav-link-highlight ${location.pathname === '/home' ? 'active' : ''}`}
            >
              Points & Activities
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Profile
            </Link>
            <Link 
              to="/notifications" 
              className={`nav-link ${location.pathname === '/notifications' ? 'active' : ''}`}
            >
              Notifications
            </Link>
            <Link 
              to="/activity" 
              className={`nav-link ${location.pathname === '/activity' ? 'active' : ''}`}
            >
              Activity
            </Link>
            <Link 
              to="/settings" 
              className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 User Profile App</p>
      </footer>
    </div>
  )
}

export default Layout


