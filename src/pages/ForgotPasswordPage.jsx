import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import './ForgotPasswordPage.css'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // TODO: Replace with actual API call
    // For now, just show success message
    setSuccess(true)
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/login')}
          aria-label="Go back"
        >
          ←
        </button>
        <h2 className="header-title">Forgot Password</h2>
      </div>

      <div className="forgot-password-content">
        <div className="forgot-password-icon">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Padlock */}
            <rect x="35" y="45" width="30" height="35" rx="3" fill="#3F51B5" stroke="#000" strokeWidth="2"/>
            <path d="M 35 45 L 35 35 Q 35 25 50 25 Q 65 25 65 35 L 65 45" stroke="#000" strokeWidth="2" fill="none"/>
            {/* Speech bubble */}
            <ellipse cx="50" cy="70" rx="15" ry="12" fill="#FFC107" stroke="#000" strokeWidth="2"/>
            <text x="50" y="75" textAnchor="middle" fontSize="12" fill="#000" fontFamily="monospace">****</text>
            {/* Refresh arrows */}
            <path d="M 20 50 Q 15 45 20 40" stroke="#2196F3" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 20 40 L 25 35" stroke="#2196F3" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 80 50 Q 85 45 80 40" stroke="#2196F3" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 80 40 L 75 35" stroke="#2196F3" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Circle outline */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#000" strokeWidth="2"/>
          </svg>
        </div>

        <h1 className="forgot-password-title">Forgot Password?</h1>
        <p className="forgot-password-subtitle">
          Enter your email below to reset your password.
        </p>

        {success ? (
          <div className="success-message">
            <p>Password reset link sent to your email!</p>
            <p className="success-subtext">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            {error && <div className="error-message">{error}</div>}

            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={error}
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              className="submit-button"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage


