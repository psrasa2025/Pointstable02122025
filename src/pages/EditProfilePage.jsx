import { useState, useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './EditProfilePage.css'

function EditProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser } = useUser()
  
  const [formData, setFormData] = useState({
    name: user.name || 'John Doe',
    title: user.title || 'Software Engineer',
    location: user.location || 'San Francisco, CA',
    bio: user.bio || 'Passionate software engineer with 5+ years of experience building scalable web applications.',
    email: user.email || 'john.doe@example.com',
    phone: user.phone || '+1 (555) 123-4567',
    website: user.website || 'johndoe.dev',
    twitter: user.twitter || '@johndoe',
    linkedin: user.linkedin || 'linkedin.com/in/johndoe',
    github: user.github || 'github.com/johndoe'
  })

  // Update form when user data changes
  useEffect(() => {
    setFormData({
      name: user.name || 'John Doe',
      title: user.title || 'Software Engineer',
      location: user.location || 'San Francisco, CA',
      bio: user.bio || '',
      email: user.email || 'john.doe@example.com',
      phone: user.phone || '',
      website: user.website || '',
      twitter: user.twitter || '',
      linkedin: user.linkedin || '',
      github: user.github || ''
    })
  }, [user])

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save to localStorage via Context
    updateUser(formData)
    console.log('Profile saved to localStorage:', formData)
    alert('Profile saved successfully!')
    navigate('/profile')
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="edit-profile-page">
      <div className="page-header">
        <h1>Edit Profile</h1>
        <p>Update your profile information</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Software Engineer"
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
          />

          <div className="input-group">
            <label className="input-label">Bio</label>
            <textarea
              name="bio"
              className="input textarea"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Contact Information</h2>
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            error={errors.email}
            required
          />

          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />

          <Input
            label="Website"
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="yourwebsite.com"
          />
        </div>

        <div className="form-section">
          <h2>Social Media</h2>
          
          <Input
            label="Twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="@username"
          />

          <Input
            label="LinkedIn"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
          />

          <Input
            label="GitHub"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="github.com/username"
          />
        </div>

        <div className="form-actions">
          <Button 
            type="button"
            variant="ghost" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfilePage


