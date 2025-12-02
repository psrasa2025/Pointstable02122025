import { useState } from 'react'
import './ActivityPage.css'

function ActivityPage() {
  const [timeFilter, setTimeFilter] = useState('all')
  
  const [activities] = useState([
    {
      id: 1,
      type: 'profile_update',
      action: 'Updated profile information',
      details: 'Changed bio and added new skills',
      timestamp: '2024-12-02T10:30:00',
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      type: 'settings_change',
      action: 'Changed notification settings',
      details: 'Enabled email notifications and weekly digest',
      timestamp: '2024-12-02T08:15:00',
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      type: 'login',
      action: 'Logged in',
      details: 'Logged in from Windows PC',
      timestamp: '2024-12-02T07:00:00',
      timeAgo: '5 hours ago'
    },
    {
      id: 4,
      type: 'profile_view',
      action: 'Profile viewed',
      details: 'Your profile was viewed by 15 people',
      timestamp: '2024-12-01T18:30:00',
      timeAgo: '1 day ago'
    },
    {
      id: 5,
      type: 'social',
      action: 'New follower',
      details: 'Sarah Johnson started following you',
      timestamp: '2024-12-01T15:45:00',
      timeAgo: '1 day ago'
    },
    {
      id: 6,
      type: 'profile_update',
      action: 'Updated profile picture',
      details: 'Changed avatar image',
      timestamp: '2024-11-30T12:00:00',
      timeAgo: '2 days ago'
    },
    {
      id: 7,
      type: 'settings_change',
      action: 'Changed privacy settings',
      details: 'Set profile visibility to Public',
      timestamp: '2024-11-30T09:20:00',
      timeAgo: '2 days ago'
    },
    {
      id: 8,
      type: 'login',
      action: 'Logged in',
      details: 'Logged in from Mobile',
      timestamp: '2024-11-29T20:10:00',
      timeAgo: '3 days ago'
    },
    {
      id: 9,
      type: 'social',
      action: 'Connected with user',
      details: 'Connected with Mike Chen',
      timestamp: '2024-11-29T14:30:00',
      timeAgo: '3 days ago'
    },
    {
      id: 10,
      type: 'account',
      action: 'Account created',
      details: 'Welcome to User Profile App!',
      timestamp: '2024-11-25T10:00:00',
      timeAgo: '1 week ago'
    }
  ])

  const getActivityIcon = (type) => {
    switch (type) {
      case 'profile_update': return '✏️'
      case 'settings_change': return '⚙️'
      case 'login': return '🔐'
      case 'profile_view': return '👁️'
      case 'social': return '👥'
      case 'account': return '🎉'
      default: return '📌'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'profile_update': return '#3B82F6'
      case 'settings_change': return '#10B981'
      case 'login': return '#6B7280'
      case 'profile_view': return '#F59E0B'
      case 'social': return '#EF4444'
      case 'account': return '#8B5CF6'
      default: return '#3B82F6'
    }
  }

  const filterActivities = () => {
    const now = new Date()
    return activities.filter(activity => {
      const activityDate = new Date(activity.timestamp)
      const daysDiff = (now - activityDate) / (1000 * 60 * 60 * 24)
      
      switch (timeFilter) {
        case 'today':
          return daysDiff < 1
        case 'week':
          return daysDiff < 7
        case 'month':
          return daysDiff < 30
        default:
          return true
      }
    })
  }

  const groupActivitiesByDate = (activities) => {
    const groups = {}
    
    activities.forEach(activity => {
      const date = new Date(activity.timestamp)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      let dateKey
      if (date.toDateString() === today.toDateString()) {
        dateKey = 'Today'
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Yesterday'
      } else {
        dateKey = date.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric',
          year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        })
      }
      
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(activity)
    })
    
    return groups
  }

  const filteredActivities = filterActivities()
  const groupedActivities = groupActivitiesByDate(filteredActivities)

  const activityStats = {
    total: activities.length,
    today: activities.filter(a => {
      const daysDiff = (new Date() - new Date(a.timestamp)) / (1000 * 60 * 60 * 24)
      return daysDiff < 1
    }).length,
    week: activities.filter(a => {
      const daysDiff = (new Date() - new Date(a.timestamp)) / (1000 * 60 * 60 * 24)
      return daysDiff < 7
    }).length
  }

  return (
    <div className="activity-page">
      <div className="page-header">
        <h1>Activity History</h1>
        <p>Track all your account activities and changes</p>
      </div>

      {/* Activity Stats */}
      <div className="activity-stats">
        <div className="stat-box">
          <div className="stat-value">{activityStats.total}</div>
          <div className="stat-label">Total Activities</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{activityStats.today}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{activityStats.week}</div>
          <div className="stat-label">This Week</div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="time-filter">
        <button
          className={`filter-btn ${timeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setTimeFilter('all')}
        >
          All Time
        </button>
        <button
          className={`filter-btn ${timeFilter === 'today' ? 'active' : ''}`}
          onClick={() => setTimeFilter('today')}
        >
          Today
        </button>
        <button
          className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
          onClick={() => setTimeFilter('week')}
        >
          This Week
        </button>
        <button
          className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
          onClick={() => setTimeFilter('month')}
        >
          This Month
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="activity-timeline">
        {Object.entries(groupedActivities).length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No activities found</h3>
            <p>No activities match your selected time period.</p>
          </div>
        ) : (
          Object.entries(groupedActivities).map(([dateKey, dayActivities]) => (
            <div key={dateKey} className="timeline-group">
              <div className="timeline-date">{dateKey}</div>
              <div className="timeline-items">
                {dayActivities.map(activity => (
                  <div key={activity.id} className="timeline-item">
                    <div className="timeline-marker">
                      <div
                        className="marker-icon"
                        style={{ 
                          backgroundColor: `${getActivityColor(activity.type)}20`,
                          color: getActivityColor(activity.type)
                        }}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="marker-line"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="activity-card">
                        <div className="activity-header">
                          <h3>{activity.action}</h3>
                          <span className="activity-time">{activity.timeAgo}</span>
                        </div>
                        <p className="activity-details">{activity.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ActivityPage

