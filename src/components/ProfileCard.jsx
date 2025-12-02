import './ProfileCard.css'

function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-title">{user.title || 'No title'}</p>
          <p className="profile-location">{user.location || 'No location'}</p>
        </div>
      </div>
      
      {user.bio && (
        <div className="profile-bio">
          <p>{user.bio}</p>
        </div>
      )}
      
      <div className="profile-stats">
        {user.stats?.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard


