import { useNavigate } from 'react-router-dom'
import './SplashPage.css'

function SplashPage() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login')
  }

  return (
    <div className="splash-page">
      <div className="splash-content">
        <div className="splash-icon">
          <div className="star-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z"
                fill="#FFC107"
                stroke="#000"
                strokeWidth="2"
              />
              <circle cx="40" cy="45" r="3" fill="#000" />
              <circle cx="60" cy="45" r="3" fill="#000" />
              <path
                d="M 35 60 Q 50 70 65 60"
                stroke="#000"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="splash-title">Get points & enjoy</h1>
      </div>
      
      <button className="splash-button" onClick={handleGetStarted}>
        Get Start →
      </button>
    </div>
  )
}

export default SplashPage


