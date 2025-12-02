import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import './OwnActivityPage.css'

function OwnActivityPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    email: '',
    notes: '',
    image: '',
    video: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Activity submitted successfully!')
    navigate('/home')
  }

  return (
    <div className="own-activity-page">
      <div className="own-activity-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Own Activity
        </button>
      </div>

      <div className="own-activity-content">
        <form onSubmit={handleSubmit} className="own-activity-form">
          <div className="form-section">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />

            <Input
              label="Phone No"
              name="phoneNo"
              type="tel"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

            <Input
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add notes"
            />
          </div>

          <div className="upload-section">
            <Input
              label="Upload image"
              name="image"
              type="file"
              onChange={handleChange}
            />

            <Input
              label="Upload Vedio"
              name="video"
              type="file"
              onChange={handleChange}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth className="submit-btn">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default OwnActivityPage

