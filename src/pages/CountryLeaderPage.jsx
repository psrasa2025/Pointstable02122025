import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CountryLeaderPage.css'

function CountryLeaderPage() {
  const navigate = useNavigate()

  const [leaders] = useState([
    { id: 1, name: 'Kumar', city: 'Colombo', activityNo: 1 },
    { id: 2, name: 'Vino', city: 'Kandy', activityNo: 3 },
    { id: 3, name: 'Aswin', city: 'Colombo', activityNo: 2 },
    { id: 4, name: 'Vino', city: 'Vavuniya', activityNo: 2 }
  ])

  return (
    <div className="country-leader-page">
      <div className="country-leader-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Country Leader
        </button>
      </div>

      <div className="country-leader-content">
        <div className="leaders-list">
          {leaders.map((leader) => (
            <div key={leader.id} className="leader-card">
              <div className="leader-info">
                <div>Name -{leader.name}</div>
                <div>City-{leader.city}</div>
                <div>Activity No-{leader.activityNo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CountryLeaderPage

