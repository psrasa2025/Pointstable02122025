# 🔌 Backend API Guide

This app now includes **Netlify Serverless Functions** as the backend. These functions provide REST API endpoints for authentication, user management, points, activities, and leaderboards.

## 📁 Project Structure

```
user-profile-app/
├── netlify/
│   └── functions/
│       ├── auth.js         # Authentication endpoints
│       ├── users.js        # User profile management
│       ├── points.js       # Points operations
│       ├── activities.js   # Activity management
│       └── leaderboard.js  # Leaderboard data
├── src/
│   └── services/
│       └── api.js          # Frontend API client
└── netlify.toml            # Netlify configuration
```

## 🌐 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/verify` | Verify auth token |

#### Register User
```javascript
POST /api/auth/register
Body: {
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
Response: {
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Login User
```javascript
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "securepassword"
}
Response: {
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

---

### Users (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update user profile |
| DELETE | `/api/users/:id` | Delete user account |

#### Get User Profile
```javascript
GET /api/users/demo
Response: {
  "user": {
    "id": "demo-user-001",
    "username": "johndoe",
    "name": "John Doe",
    "profile": { ... },
    "points": { ... },
    "settings": { ... }
  }
}
```

#### Update Profile
```javascript
PUT /api/users/demo
Body: {
  "name": "John Updated",
  "profile": {
    "title": "Senior Engineer",
    "location": "New York, NY"
  }
}
```

---

### Points (`/api/points`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/points/` | Get user's points |
| GET | `/api/points/history` | Get points history |
| GET | `/api/points/rates` | Get conversion rates |
| POST | `/api/points/add` | Add points |
| POST | `/api/points/donate` | Donate points |
| POST | `/api/points/transfer` | Transfer points |
| POST | `/api/points/convert` | Convert to currency |

#### Get Points
```javascript
GET /api/points/
Response: {
  "points": {
    "total": 1500,
    "donated": 250,
    "utilized": 700,
    "available": 550,
    "history": [...]
  }
}
```

#### Donate Points
```javascript
POST /api/points/donate
Body: {
  "amount": 100,
  "recipient": "Red Cross",
  "message": "For disaster relief"
}
```

#### Transfer Points
```javascript
POST /api/points/transfer
Body: {
  "amount": 50,
  "recipientId": "user-123",
  "note": "Thanks for your help!"
}
```

#### Convert Points
```javascript
POST /api/points/convert
Body: {
  "amount": 1000,
  "currency": "USD"  // USD, EUR, GBP, INR
}
Response: {
  "message": "Converted 1000 points to USD 10.00",
  "convertedAmount": 10.00,
  "currency": "USD",
  "points": { ... }
}
```

---

### Activities (`/api/activities`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities/` | List all activities |
| GET | `/api/activities/my` | Get user's activities |
| GET | `/api/activities/:id` | Get single activity |
| POST | `/api/activities/` | Create activity |
| PUT | `/api/activities/:id` | Update activity |
| DELETE | `/api/activities/:id` | Delete activity |
| POST | `/api/activities/:id/join` | Join activity |
| POST | `/api/activities/:id/leave` | Leave activity |
| POST | `/api/activities/:id/invite` | Invite friends |

#### List Activities (with filters)
```javascript
GET /api/activities/?type=fitness&status=approved&search=yoga
Response: {
  "activities": [...],
  "total": 5
}
```

#### Create Activity
```javascript
POST /api/activities/
Body: {
  "name": "Morning Run",
  "description": "5K run in the park",
  "type": "fitness",
  "date": "2024-12-15",
  "time": "07:00",
  "location": "Central Park",
  "maxParticipants": 20,
  "pointsReward": 75
}
```

#### Join Activity
```javascript
POST /api/activities/act-001/join
Response: {
  "message": "Successfully joined activity",
  "activity": { ... }
}
```

---

### Leaderboard (`/api/leaderboard`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaderboard/` | Get top 10 world leaders |
| GET | `/api/leaderboard/world` | Get world leaderboard |
| GET | `/api/leaderboard/country/:code` | Get country leaderboard |
| GET | `/api/leaderboard/countries` | Get list of countries |
| GET | `/api/leaderboard/user/:id` | Get user's rank |

#### Get World Leaderboard
```javascript
GET /api/leaderboard/world?limit=15&offset=0
Response: {
  "leaders": [
    { "rank": 1, "name": "Ravi Kumar", "country": "IN", "points": 16500, "badge": "🏆" },
    { "rank": 2, "name": "Priya Sharma", "country": "IN", "points": 15800, "badge": "🥈" },
    ...
  ],
  "total": 15
}
```

#### Get Country Leaderboard
```javascript
GET /api/leaderboard/country/US
Response: {
  "country": { "code": "US", "name": "United States", "flag": "🇺🇸" },
  "leaders": [...],
  "totalParticipants": 1200
}
```

---

## 🔧 Using the API in Frontend

### Import the API Service

```javascript
import api from './services/api';
// Or import specific APIs:
import { authAPI, pointsAPI, activitiesAPI } from './services/api';
```

### Authentication Example

```javascript
// Register
const result = await api.auth.register({
  username: 'johndoe',
  email: 'john@example.com',
  password: 'password123',
  name: 'John Doe'
});

// Login
const { user, token } = await api.auth.login('john@example.com', 'password123');

// Check if authenticated
if (api.auth.isAuthenticated()) {
  // User is logged in
}

// Logout
await api.auth.logout();
```

### Points Example

```javascript
// Get points
const { points } = await api.points.getPoints();
console.log(`Available: ${points.available}`);

// Donate
await api.points.donate(100, 'Red Cross', 'Helping others');

// Transfer
await api.points.transfer(50, 'friend-user-id', 'Thanks!');

// Convert
const { convertedAmount, currency } = await api.points.convert(1000, 'USD');
console.log(`Converted to ${currency} ${convertedAmount}`);
```

### Activities Example

```javascript
// List activities
const { activities } = await api.activities.getAll({ type: 'fitness' });

// Create activity
const { activity } = await api.activities.create({
  name: 'Beach Volleyball',
  date: '2024-12-20',
  location: 'Beach'
});

// Join activity
await api.activities.join('act-001');

// Invite friends
await api.activities.invite('act-001', ['friend-1', 'friend-2'], 'Join us!');
```

### Leaderboard Example

```javascript
// Get world leaderboard
const { leaders } = await api.leaderboard.getWorld(10, 0);

// Get country leaderboard
const { leaders: usLeaders } = await api.leaderboard.getCountry('US');

// Get user rank
const { worldRank, countryRank } = await api.leaderboard.getUserRank('user-123');
```

---

## 🚀 Local Development

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Run with Functions Locally

```bash
netlify dev
```

This starts:
- Frontend at `http://localhost:8888`
- Functions at `http://localhost:8888/.netlify/functions/`
- API redirects work automatically

### Test Functions Directly

```bash
# Test auth
curl -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password"}'

# Test points
curl http://localhost:8888/api/points/

# Test activities
curl http://localhost:8888/api/activities/
```

---

## 📦 Deployment

### Automatic Deployment

Push to GitHub and Netlify will automatically:
1. Build the frontend
2. Deploy serverless functions
3. Configure API redirects

### Manual Deployment

```bash
netlify deploy --prod
```

---

## 🔐 Security Notes

### Current Implementation (Demo)
- Uses in-memory storage (data resets on function cold start)
- Simple base64 tokens (not production-ready JWT)
- No rate limiting

### Production Recommendations

1. **Use a Real Database**
   - FaunaDB (Netlify integration)
   - Supabase (PostgreSQL)
   - MongoDB Atlas
   - PlanetScale (MySQL)

2. **Secure Authentication**
   - Use proper JWT with secret keys
   - Implement refresh tokens
   - Add rate limiting

3. **Environment Variables**
   ```bash
   # In Netlify Dashboard > Site Settings > Environment Variables
   JWT_SECRET=your-secret-key
   DATABASE_URL=your-database-url
   ```

4. **Add Validation**
   - Input sanitization
   - Request validation
   - Error handling

---

## 📋 Environment Variables

Set these in Netlify Dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for JWT signing | `your-super-secret-key` |
| `DATABASE_URL` | Database connection string | `postgresql://...` |
| `NODE_ENV` | Environment | `production` |

---

## 🧪 Testing

### Test with cURL

```bash
# Register
curl -X POST https://your-site.netlify.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Get activities
curl https://your-site.netlify.app/api/activities/
```

### Test in Browser Console

```javascript
// Open browser console on your deployed site
const res = await fetch('/api/points/');
const data = await res.json();
console.log(data);
```

---

## 📚 Resources

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [FaunaDB + Netlify](https://docs.netlify.com/integrations/databases/fauna/)

---

**Your backend is ready!** 🎉

Deploy to Netlify and your API will be live at:
- `https://your-site.netlify.app/api/auth/*`
- `https://your-site.netlify.app/api/users/*`
- `https://your-site.netlify.app/api/points/*`
- `https://your-site.netlify.app/api/activities/*`
- `https://your-site.netlify.app/api/leaderboard/*`

