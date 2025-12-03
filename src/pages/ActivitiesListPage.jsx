import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ActivitiesListPage.css'

function ActivitiesListPage() {
  const navigate = useNavigate()

  const [activities] = useState([
    {
      id: 1,
      name: 'Activity 1',
      date: '12/12/2024',
      status: 'Approved'
    },
    {
      id: 2,
      name: 'Activity 2',
      date: '14/12/2024',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Activity 3',
      date: '15/06/2024',
      status: 'Pending'
    }
  ])

  return (
    <div className="activities-list-page">
      <div className="activities-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← List Of Activities
        </button>
      </div>

      <div className="activities-content">
        {activities.map(activity => (
          <div
            key={activity.id}
            className="activity-card"
            onClick={() => navigate(`/activity/${activity.id}`)}
          >
            <div className="activity-info">
              <div className="activity-name">Name - {activity.name}</div>
              <div className="activity-date">Date - {activity.date}</div>
              <div className="activity-status-line">
                Status - 
                <span className={`status-badge ${activity.status.toLowerCase()}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivitiesListPage


