import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './LeadersPage.css'

function LeadersPage() {
  const navigate = useNavigate()

  return (
    <div className="leaders-page">
      <div className="leaders-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Leader
        </button>
      </div>

      <div className="leaders-content">
        <h1 className="leaders-title">Leaders Selection</h1>

        <div className="leader-options">
          <Button
            variant="primary"
            fullWidth
            className="leader-btn"
            onClick={() => navigate('/country-leader')}
          >
            Country Wide Leader
          </Button>

          <Button
            variant="primary"
            fullWidth
            className="leader-btn"
            onClick={() => navigate('/world-leader')}
          >
            World Wide Leader
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeadersPage

