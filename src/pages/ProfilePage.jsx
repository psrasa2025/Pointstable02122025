import { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import InfoSection from '../components/InfoSection'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  
  // Sample user data - Replace with your actual data structure
  const [user] = useState({
    name: 'John Doe',
    title: 'Software Engineer',
    location: 'San Francisco, CA',
    avatar: null, // Add image URL here
    bio: 'Passionate software engineer with 5+ years of experience building scalable web applications. Love working with React, Node.js, and cloud technologies.',
    stats: [
      { label: 'Posts', value: '127' },
      { label: 'Followers', value: '1.2K' },
      { label: 'Following', value: '342' }
    ],
    contact: [
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Phone', value: '+1 (555) 123-4567' },
      { label: 'Website', value: 'johndoe.dev' }
    ],
    social: [
      { label: 'Twitter', value: '@johndoe' },
      { label: 'LinkedIn', value: 'linkedin.com/in/johndoe' },
      { label: 'GitHub', value: 'github.com/johndoe' }
    ],
    skills: [
      { label: 'JavaScript', value: 'Expert' },
      { label: 'React', value: 'Expert' },
      { label: 'Node.js', value: 'Advanced' },
      { label: 'Python', value: 'Intermediate' }
    ]
  })

  return (
    <div className="profile-page">
      <div className="profile-actions">
        <Button 
          variant="primary" 
          onClick={() => navigate('/edit')}
        >
          Edit Profile
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/settings')}
        >
          Settings
        </Button>
      </div>

      <ProfileCard user={user} />

      <InfoSection 
        title="Contact Information" 
        items={user.contact}
        icon="📧"
      />

      <InfoSection 
        title="Social Links" 
        items={user.social}
        icon="🔗"
      />

      <InfoSection 
        title="Skills" 
        items={user.skills}
        icon="💼"
      />
    </div>
  )
}

export default ProfilePage


