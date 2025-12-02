import { useState } from 'react'
import Button from '../components/Button'
import './NotificationsPage.css'

function NotificationsPage() {
  const [filter, setFilter] = useState('all')
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'follow',
      user: 'Sarah Johnson',
      message: 'started following you',
      time: '2 hours ago',
      read: false,
      avatar: null
    },
    {
      id: 2,
      type: 'like',
      user: 'Mike Chen',
      message: 'liked your post "Getting Started with React"',
      time: '5 hours ago',
      read: false,
      avatar: null
    },
    {
      id: 3,
      type: 'comment',
      user: 'Emma Wilson',
      message: 'commented on your post',
      time: '1 day ago',
      read: true,
      avatar: null
    },
    {
      id: 4,
      type: 'mention',
      user: 'James Brown',
      message: 'mentioned you in a post',
      time: '1 day ago',
      read: true,
      avatar: null
    },
    {
      id: 5,
      type: 'system',
      user: 'System',
      message: 'Your profile was viewed 150 times this week',
      time: '2 days ago',
      read: true,
      avatar: null
    },
    {
      id: 6,
      type: 'follow',
      user: 'Lisa Anderson',
      message: 'started following you',
      time: '3 days ago',
      read: true,
      avatar: null
    }
  ])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'follow': return '👤'
      case 'like': return '❤️'
      case 'comment': return '💬'
      case 'mention': return '@'
      case 'system': return '📢'
      default: return '🔔'
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'follow': return '#3B82F6'
      case 'like': return '#EF4444'
      case 'comment': return '#10B981'
      case 'mention': return '#F59E0B'
      case 'system': return '#6B7280'
      default: return '#3B82F6'
    }
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="notifications-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} new</span>
          )}
        </div>
        <p>Stay updated with your latest activity</p>
      </div>

      {/* Filter and Actions */}
      <div className="notifications-toolbar">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <h3>No notifications here</h3>
          <p>
            {filter === 'unread'
              ? "You're all caught up! No unread notifications."
              : filter === 'read'
              ? "You haven't read any notifications yet."
              : "You don't have any notifications yet."}
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
            >
              <div
                className="notification-icon"
                style={{ backgroundColor: `${getNotificationColor(notification.type)}20` }}
              >
                <span style={{ color: getNotificationColor(notification.type) }}>
                  {getNotificationIcon(notification.type)}
                </span>
              </div>

              <div className="notification-content">
                <div className="notification-message">
                  <strong>{notification.user}</strong> {notification.message}
                </div>
                <div className="notification-time">{notification.time}</div>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="action-btn mark-read"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="action-btn delete"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>

              {!notification.read && <div className="unread-dot"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotificationsPage

