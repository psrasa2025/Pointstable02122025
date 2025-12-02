import './InfoSection.css'

function InfoSection({ title, items, icon }) {
  return (
    <div className="info-section">
      <div className="info-section-header">
        {icon && <span className="info-icon">{icon}</span>}
        <h3 className="info-section-title">{title}</h3>
      </div>
      <div className="info-section-content">
        {items && items.length > 0 ? (
          <ul className="info-list">
            {items.map((item, index) => (
              <li key={index} className="info-item">
                {item.label && (
                  <span className="info-label">{item.label}:</span>
                )}
                <span className="info-value">{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="info-empty">No information available</p>
        )}
      </div>
    </div>
  )
}

export default InfoSection


