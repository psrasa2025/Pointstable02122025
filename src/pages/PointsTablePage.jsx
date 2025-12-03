import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './PointsTablePage.css'

function PointsTablePage() {
  const navigate = useNavigate()

  const pointsData = {
    total: 1500,
    donated: 250,
    utilized: 700,
    available: 550
  }

  return (
    <div className="points-table-page">
      <div className="points-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Points Table
        </button>
      </div>

      <div className="points-content">
        <h1 className="points-title">Points Breakdown Table</h1>

        <div className="points-table">
          <div className="points-row">
            <span className="points-label">Total Points</span>
            <span className="points-value">{pointsData.total}</span>
          </div>
          <div className="points-row">
            <span className="points-label">Donate</span>
            <span className="points-value">{pointsData.donated}</span>
          </div>
          <div className="points-row">
            <span className="points-label">Utilized</span>
            <span className="points-value">{pointsData.utilized}</span>
          </div>
          <div className="points-row">
            <span className="points-label">Available</span>
            <span className="points-value">{pointsData.available}</span>
          </div>
        </div>

        <div className="points-actions">
          <Button
            variant="primary"
            fullWidth
            className="action-btn"
            onClick={() => navigate('/convert-points')}
          >
            Convert
          </Button>
          <Button
            variant="primary"
            fullWidth
            className="action-btn"
            onClick={() => navigate('/donation')}
          >
            Donate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PointsTablePage


