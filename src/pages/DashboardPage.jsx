import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './DashboardPage.css'

function DashboardPage() {
  const navigate = useNavigate()
  
  const [stats] = useState({
    profileViews: 1247,
    followers: 1203,
    posts: 127,
    connections: 342
  })

  const [recentActivity] = useState([
    { id: 1, type: 'profile_view', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, type: 'new_follower', user: 'Mike Chen', time: '5 hours ago' },
    { id: 3, type: 'comment', user: 'Emma Wilson', time: '1 day ago' },
    { id: 4, type: 'like', user: 'James Brown', time: '1 day ago' }
  ])

  const [quickActions] = useState([
    { id: 1, title: 'Points & Activities', icon: '💰', action: () => navigate('/home'), featured: true },
    { id: 2, title: 'Edit Profile', icon: '✏️', action: () => navigate('/edit') },
    { id: 3, title: 'View Profile', icon: '👤', action: () => navigate('/profile') },
    { id: 4, title: 'Notifications', icon: '🔔', action: () => navigate('/notifications') },
    { id: 5, title: 'Activity Timeline', icon: '📊', action: () => navigate('/activity') }
  ])

  const getActivityIcon = (type) => {
    switch (type) {
      case 'profile_view': return '👁️'
      case 'new_follower': return '➕'
      case 'comment': return '💬'
      case 'like': return '❤️'
      default: return '📌'
    }
  }

  const getActivityText = (type) => {
    switch (type) {
      case 'profile_view': return 'viewed your profile'
      case 'new_follower': return 'started following you'
      case 'comment': return 'commented on your post'
      case 'like': return 'liked your post'
      default: return 'interacted with you'
    }
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.profileViews.toLocaleString()}</div>
            <div className="stat-label">Profile Views</div>
          </div>
          <div className="stat-change positive">+12% this week</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.followers.toLocaleString()}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat-change positive">+5% this week</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-value">{stats.posts}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div className="stat-change neutral">No change</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <div className="stat-value">{stats.connections}</div>
            <div className="stat-label">Connections</div>
          </div>
          <div className="stat-change positive">+8% this week</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          {quickActions.map(action => (
            <button
              key={action.id}
              className={`quick-action-card ${action.featured ? 'featured' : ''}`}
              onClick={action.action}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-title">{action.title}</div>
              {action.featured && <div className="featured-badge">NEW!</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/activity')}>
            View All
          </Button>
        </div>
        <div className="activity-list">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong> {getActivityText(activity.type)}
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="overview-grid">
        <div className="overview-card">
          <h3>Profile Completion</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '85%' }}></div>
          </div>
          <p className="progress-text">85% Complete</p>
          <Button variant="outline" size="sm" onClick={() => navigate('/edit')}>
            Complete Profile
          </Button>
        </div>

        <div className="overview-card">
          <h3>Engagement Rate</h3>
          <div className="engagement-meter">
            <div className="meter-value">7.8%</div>
            <div className="meter-label">Average engagement</div>
          </div>
          <p className="meter-description">Better than 65% of users</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

