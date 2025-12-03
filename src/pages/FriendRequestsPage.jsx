import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FriendRequestsPage.css'

function FriendRequestsPage() {
  const navigate = useNavigate()

  const userInfo = {
    name: 'Ravi',
    points: 2500
  }

  const [requests, setRequests] = useState([
    { id: 1, name: 'Mayoo', activity: 'Activity 1', avatar: '👩' },
    { id: 2, name: 'Kavith', activity: 'Activity 2', avatar: '👨' },
    { id: 3, name: 'Kumar', activity: 'Activity 3', avatar: '👨‍💼' },
    { id: 4, name: 'Anojan', activity: 'Activity 4', avatar: '👨‍💻' }
  ])

  const handleAccept = (id, name) => {
    alert(`Accepted request from ${name}`)
    setRequests(requests.filter(req => req.id !== id))
  }

  const handleDecline = (id, name) => {
    alert(`Declined request from ${name}`)
    setRequests(requests.filter(req => req.id !== id))
  }

  return (
    <div className="friend-requests-page">
      <div className="requests-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Friend Requests
        </button>
      </div>

      <div className="requests-content">
        <div className="user-info-section">
          <div className="user-avatar-large">
            <div className="avatar-circle-large">🙏</div>
          </div>
          <div className="user-info-details">
            <div className="user-name-large">{userInfo.name}</div>
            <div className="user-points-large">
              <span className="star-icon">⭐</span> {userInfo.points} Points
            </div>
          </div>
        </div>

        <div className="requests-list">
          {requests.map(request => (
            <div key={request.id} className="request-card">
              <div className="request-info">
                <div className="request-avatar">{request.avatar}</div>
                <div className="request-text">
                  <strong>{request.name}</strong> request to take part of {request.activity}
                </div>
              </div>
              <div className="request-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(request.id, request.name)}
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleDecline(request.id, request.name)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendRequestsPage


