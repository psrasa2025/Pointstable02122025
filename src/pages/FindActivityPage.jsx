import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import './FindActivityPage.css'

function FindActivityPage() {
  const navigate = useNavigate()
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedActivity, setSelectedActivity] = useState('')

  const activities = [
    'Activity 1', 'Activity 2', 'Activity 3', 'Activity 4',
    'Activity 5', 'Activity 6', 'Activity 7', 'Activity 8'
  ]

  return (
    <div className="find-activity-page">
      <div className="find-activity-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Find Activity
        </button>
      </div>

      <div className="find-activity-content">
        <div className="search-section">
          <Input
            label="Select place"
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
            placeholder="Enter location"
          />

          <Input
            label="Select Activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            placeholder="Choose activity"
          />
        </div>

        <div className="activities-grid">
          {activities.map((activity, index) => (
            <button
              key={index}
              className="activity-btn"
              onClick={() => {
                setSelectedActivity(activity)
                navigate('/activity-form')
              }}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FindActivityPage


