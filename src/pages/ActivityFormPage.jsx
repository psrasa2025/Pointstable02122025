import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import './ActivityFormPage.css'

function ActivityFormPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    note: '',
    duration: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Activity request submitted!')
    navigate('/activities-list')
  }

  return (
    <div className="activity-form-page">
      <div className="activity-form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Activity 1
        </button>
      </div>

      <div className="activity-form-content">
        <form onSubmit={handleSubmit} className="activity-form">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter activity name"
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />

          <Input
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Add notes"
          />

          <Input
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
          />

          <Button type="submit" variant="primary" fullWidth className="submit-btn">
            Request
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ActivityFormPage


