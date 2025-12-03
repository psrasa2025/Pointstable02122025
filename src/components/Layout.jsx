import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>User Profile</h1>
          </Link>
          
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Navigation - Responsive */}
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/home" 
              className={`nav-link nav-link-highlight ${location.pathname === '/home' ? 'active' : ''}`}
            >
              🏠 Home
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              👤 Profile
            </Link>
            <Link 
              to="/edit" 
              className={`nav-link ${location.pathname === '/edit' ? 'active' : ''}`}
            >
              ✏️ Edit
            </Link>
            <Link 
              to="/settings" 
              className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
            >
              ⚙️ Settings
            </Link>
          </nav>

          {/* Overlay for mobile menu */}
          {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
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


