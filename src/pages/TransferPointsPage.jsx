import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './TransferPointsPage.css'

function TransferPointsPage() {
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState('')

  return (
    <div className="transfer-points-page">
      <div className="transfer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Transfer Points
        </button>
      </div>

      <div className="transfer-content">
        <div className="select-dropdown">
          <select 
            className="user-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select</option>
            <option value="user1">Friend 1</option>
            <option value="user2">Friend 2</option>
            <option value="user3">Friend 3</option>
          </select>
        </div>

        <div className="transfer-visual">
          <div className="money-image">
            💵💵💵
          </div>
        </div>

        <Button
          variant="primary"
          fullWidth
          className="transfer-btn"
          onClick={() => {
            if (selectedUser) {
              alert('Points transferred successfully!')
              navigate('/points-table')
            } else {
              alert('Please select a user first')
            }
          }}
        >
          Transfer
        </Button>
      </div>
    </div>
  )
}

export default TransferPointsPage


