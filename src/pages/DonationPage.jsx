import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import './DonationPage.css'

function DonationPage() {
  const navigate = useNavigate()
  const [points, setPoints] = useState('')
  const [selectedFriend, setSelectedFriend] = useState('')

  const userInfo = {
    name: 'Ravi',
    points: 2500
  }

  const handleDonate = (e) => {
    e.preventDefault()
    if (points && selectedFriend) {
      alert(`Donated ${points} points successfully!`)
      navigate('/points-table')
    }
  }

  return (
    <div className="donation-page">
      <div className="donation-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Donation
        </button>
      </div>

      <div className="donation-content">
        <div className="user-info-card">
          <div className="user-avatar">
            <div className="avatar-circle">
              <span className="avatar-emoji">🙏</span>
            </div>
          </div>
          <div className="user-details">
            <div className="user-name">{userInfo.name}</div>
            <div className="user-points">
              <span className="star-icon">⭐</span> {userInfo.points} Points
            </div>
          </div>
        </div>

        <h2 className="section-title">Point through donation</h2>

        <form onSubmit={handleDonate} className="donation-form">
          <div className="search-section">
            <label className="form-label">Select People</label>
            <div className="search-input-wrapper">
              <span className="search-icon">☰</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search Friends"
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
              />
              <span className="search-icon-right">🔍</span>
            </div>
          </div>

          <Input
            label="Enter the points"
            name="points"
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Amount to donate"
          />

          <Button type="submit" variant="primary" fullWidth className="donate-btn">
            Donate
          </Button>
        </form>
      </div>
    </div>
  )
}

export default DonationPage

