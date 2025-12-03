import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './InviteActivitiesPage.css'

function InviteActivitiesPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const friends = [
    { id: 1, name: 'S.Ravi', avatar: '👨' },
    { id: 2, name: 'R.Gajan', avatar: '👨‍💼' },
    { id: 3, name: 'K.Kumari', avatar: '👩' },
    { id: 4, name: 'J.Sadurjan', avatar: '👦' }
  ]

  const handleAddFriend = (friendName) => {
    alert(`Invited ${friendName} to activity!`)
  }

  return (
    <div className="invite-activities-page">
      <div className="invite-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Invite for Activities
        </button>
      </div>

      <div className="invite-content">
        <div className="search-bar">
          <span className="search-icon">☰</span>
          <input
            type="text"
            placeholder="Search Friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon-right">🔍</span>
        </div>

        <div className="friends-grid">
          {friends.map(friend => (
            <div key={friend.id} className="friend-card">
              <div className="friend-avatar">
                <div className="avatar-circle">
                  {friend.avatar}
                </div>
              </div>
              <div className="friend-name">{friend.name}</div>
              <button
                className="add-friend-btn"
                onClick={() => handleAddFriend(friend.name)}
              >
                Add Friend
              </button>
            </div>
          ))}
        </div>

        <button
          className="view-request-btn"
          onClick={() => navigate('/friend-requests')}
        >
          View Request
        </button>
      </div>
    </div>
  )
}

export default InviteActivitiesPage


