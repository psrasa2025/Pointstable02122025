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
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Profile
            </Link>
            <Link 
              to="/edit" 
              className={`nav-link ${location.pathname === '/edit' ? 'active' : ''}`}
            >
              Edit
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


