import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './ConvertPointsPage.css'

function ConvertPointsPage() {
  const navigate = useNavigate()

  const currencies = [
    { name: 'Points to USD', icon: '💵', rate: '1 Point = $0.10' },
    { name: 'Points to GBP', icon: '💷', rate: '1 Point = £0.08' },
    { name: 'Points to SLR', icon: '💴', rate: '1 Point = ₨15' },
    { name: 'Points to CAD', icon: '💶', rate: '1 Point = $0.12 CAD' }
  ]

  const handleConvert = (currency) => {
    alert(`Converting to ${currency}`)
  }

  return (
    <div className="convert-points-page">
      <div className="convert-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Change Points
        </button>
      </div>

      <div className="convert-content">
        <h1 className="convert-title">Points to currency</h1>

        <div className="conversion-visual">
          <div className="visual-card">
            <div className="visual-icon">
              <div className="star-circle">
                <span>⭐</span>
              </div>
              <span className="arrow">→</span>
              <div className="gift-circle">
                <span>🎁</span>
              </div>
            </div>
          </div>
        </div>

        <div className="currency-options">
          {currencies.map((currency, index) => (
            <Button
              key={index}
              variant="primary"
              fullWidth
              className="currency-btn"
              onClick={() => handleConvert(currency.name)}
            >
              {currency.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConvertPointsPage


