import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './WorldLeaderPage.css'

function WorldLeaderPage() {
  const navigate = useNavigate()

  const [leaders] = useState([
    { id: 1, name: 'Ronald', country: 'Canada', activityNo: 1 },
    { id: 2, name: 'Kala', country: 'Canada', activityNo: 4 },
    { id: 3, name: 'Veni', country: 'France', activityNo: 2 },
    { id: 4, name: 'Gajan', country: 'Australia', activityNo: 1 }
  ])

  return (
    <div className="world-leader-page">
      <div className="world-leader-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← World Leader
        </button>
      </div>

      <div className="world-leader-content">
        <div className="leaders-list">
          {leaders.map((leader) => (
            <div key={leader.id} className="leader-card">
              <div className="leader-info">
                <div>Name -{leader.name}</div>
                <div>Country-{leader.country}</div>
                <div>Activity No-{leader.activityNo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorldLeaderPage

