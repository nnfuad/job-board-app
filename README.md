# 🚀 JobBoard - AI-Powered Job Board Platform

A production-ready full-stack application for discovering and filtering job opportunities with intelligent ranking and advanced search capabilities.

## 🎯 Features

- **Advanced Job Filtering**: Filter by job type, experience level, salary range, skills, and remote-friendly options
- **Full-Text Search**: Search across job titles, company names, and descriptions
- **Intelligent Sorting**: Sort by latest, salary, and job title
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Pagination**: Efficient data loading with 12 jobs per page
- **Glassmorphism UI**: Modern, professional dark-mode design with custom Tailwind CSS
- **Error Handling**: Graceful error states and loading indicators
- **Toast Notifications**: User feedback for actions and errors

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** for data persistence
- **Prisma** ORM (or native queries for this build)
- **CORS** enabled for frontend communication

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for utility-first styling
- **Axios** for HTTP requests
- **Lucide React** for beautiful icons
- **React Context/Hooks** for state management

### Infrastructure
- **Docker & Docker Compose** for containerization
- **Nginx** for frontend serving
- **PostgreSQL** in container

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Git

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd job-board-app
   ```
Copy environment file

```bash
cp .env.example .env
# Edit .env if needed (defaults work out of the box)
Start all services

```bash
docker-compose up --build
This will:

Create PostgreSQL database
Build and start the backend API
Build and start the frontend
Automatically seed the database with sample data
Access the application

Frontend: http://localhost
Backend API: http://localhost:8080
Health Check: http://localhost:8080/health
Stopping Services
bash
docker-compose down
📚 API Documentation
Base URL
Code
http://localhost:8080/api/v1
Endpoints
Get Jobs with Filters
Code
GET /jobs
Query Parameters:

page (default: 1) - Page number
limit (default: 10) - Items per page
search - Search term for title/company/description
jobType - Filter by job type (Full-time, Part-time, Contract)
experienceLevel - Filter by level (Junior, Mid-level, Senior)
minSalary - Minimum salary
maxSalary - Maximum salary
remoteFriendly - Filter remote jobs (true/false)
skills - Comma-separated skill list
sortBy - Sort column (posted_date, salary_max, title)
sortOrder - Sort direction (ASC, DESC)
featured - Featured jobs only (true/false)
Example Request:

bash
curl "http://localhost:8080/api/v1/jobs?search=react&experienceLevel=Senior&remoteFriendly=true&limit=12&page=1"
Response:

JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Senior React Developer",
      "company": "TechCorp",
      "description": "...",
      "location": "San Francisco, CA",
      "salary_min": 120000,
      "salary_max": 160000,
      "job_type": "Full-time",
      "experience_level": "Senior",
      "skills": ["React", "JavaScript", "TypeScript", "CSS"],
      "featured": true,
      "remote_friendly": true,
      "posted_date": "2026-04-25T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 12,
    "totalPages": 4
  }
}
Get Filter Options
Code
GET /jobs/filters/options
Response:

JSON
{
  "success": true,
  "data": {
    "jobTypes": ["Full-time", "Part-time", "Contract"],
    "experienceLevels": ["Junior", "Mid-level", "Senior"],
    "skills": ["React", "Node.js", "PostgreSQL", "Docker", ...]
  }
}
Get Single Job
Code
GET /jobs/:id
Response:

JSON
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Senior React Developer",
    ...
  }
}
Health Check
Code
GET /health
🎨 UI/UX Design Choices
Glassmorphism Design
Semi-transparent cards with blur effects create visual depth
Modern aesthetic that appeals to tech-savvy users
Improves visual hierarchy and reduces cognitive load
Dark Mode
Reduces eye strain for extended browsing
Professional appearance
Built into all components with Tailwind CSS
Color Scheme
Primary: Cyan/Blue gradients for CTAs and highlights
Secondary: Slate grays for text and backgrounds
Accent: Green (salary), Orange (experience), Purple (type)
Component Hierarchy
Navbar: Sticky, minimal, branding focused
FilterBar: Sticky sidebar for easy access
JobCards: Rich information density with visual icons
Pagination: Simple, intuitive navigation
Responsiveness
Mobile-first approach
Stacked layout on small screens
2-column grid on tablets
2-column grid on desktop (within larger viewport)
🔧 Development
Backend Development
bash
cd server
npm install
npm run dev
Frontend Development
bash
cd client
npm install
npm run dev
Database Schema
The application creates the following table on startup:

jobs: Contains all job listings with full-text search capabilities
Adding Sample Data
Sample data is automatically seeded when the database is initialized. Check server/src/models/Job.js for the seed function.

📦 Project Structure
Code
job-board-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── hooks/         # Custom hooks (useApiData)
│   │   └── App.jsx        # Root component
│   └── Dockerfile         # Frontend Docker config
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── app.js         # Express app setup
│   └── Dockerfile         # Backend Docker config
├── docker-compose.yml     # Docker orchestration
└── .env.example          # Environment template
🐛 Troubleshooting
Backend not connecting to database
Ensure db service is healthy: docker-compose ps
Check database logs: docker-compose logs db
Verify .env database credentials match
Frontend can't reach API
Check that backend service is running: docker-compose ps
Verify CORS is enabled (check backend logs)
Ensure API URL in frontend matches backend URL
Database not seeding
Check server logs for errors: docker-compose logs backend
Manually run seed: Connect to db and run SQL from Job.js
Port already in use
Change ports in docker-compose.yml
Or stop conflicting services: docker ps and docker stop <container>
🚀 Production Deployment
Docker Hub Deployment
bash
docker-compose -f docker-compose.yml up -d
Environment Variables for Production
env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com
DB_PASSWORD=<strong-password>
📝 License
MIT License - Feel free to use this for your hackathon!

🤝 Contributing
Contributions welcome! Open issues or PRs for bugs and features.

Built for winning hackathons 🎉

Code

---

## 🧪 Testing the API

### Sample cURL Commands

```bash
# 1. Health Check
curl -X GET http://localhost:8080/health

# 2. Get all jobs (first page)
curl -X GET "http://localhost:8080/api/v1/jobs?page=1&limit=12"

# 3. Search for React jobs
curl -X GET "http://localhost:8080/api/v1/jobs?search=react&limit=12"

# 4. Filter by experience level and remote
curl -X GET "http://localhost:8080/api/v1/jobs?experienceLevel=Senior&remoteFriendly=true&limit=12"

# 5. Filter by salary range
curl -X GET "http://localhost:8080/api/v1/jobs?minSalary=100000&maxSalary=150000&limit=12"

# 6. Filter by skills (comma-separated)
curl -X GET "http://localhost:8080/api/v1/jobs?skills=React,Node.js&limit=12"

# 7. Complex query with multiple filters
curl -X GET "http://localhost:8080/api/v1/jobs?search=developer&jobType=Full-time&experienceLevel=Mid-level&remoteFriendly=true&minSalary=80000&sortBy=salary_max&sortOrder=DESC&limit=12"

# 8. Get filter options
curl -X GET http://localhost:8080/api/v1/jobs/filters/options

# 9. Get single job
curl -X GET http://localhost:8080/api/v1/jobs/1
🎨 Design System Highlights
Typography
Display: Inter font, weights 300-700
Headings: Bold (700) in sizes 2xl-lg
Body: Regular (400) text in slate-300/400
Small: Text-xs for labels and metadata
Spacing
Base unit: 4px (Tailwind default)
Card padding: 6 units (24px)
Gap between sections: 6 units
Component spacing: 2-4 units
Colors
Background: slate-950 (#0f172a)
Cards: glass-effect with 5% white opacity
Text: slate-100 for headings, slate-300 for body
Accents: Cyan (primary), Blue (secondary)
Effects
Glassmorphism: bg-white/5 backdrop-blur-md border-white/10
Shadows: Using Tailwind's shadow utilities
Transitions: 200ms ease-out on all interactions
Hover States: -translate-y-1 + shadow elevation
📱 Responsive Breakpoints
Code
Mobile:    < 768px   (single column)
Tablet:    768-1024px (1 sidebar + 1 main)
Desktop:   > 1024px  (1 sidebar + 2 main)
✨ Key Features Explained
1. Advanced Filtering Logic (Backend)
SQL WHERE clauses built dynamically
Full-text search across multiple fields
Array filtering for skills
Salary range intersection logic
2. Pagination
Offset-based pagination
Total count calculation
Page validation and limits
3. Error Handling
Try-catch blocks in all service methods
User-friendly error messages
Connection timeout (10s) on frontend
Graceful degradation on API failures
4. Custom Hooks
useApiData handles fetching, loading, and errors
Automatic retry logic with timeout
Response validation
🎯 Why This Stack?
Node.js/Express: Lightweight, fast, easy to deploy
PostgreSQL: Robust, excellent for relational data, great full-text search
React + Vite: Lightning-fast HMR, minimal build times
Tailwind CSS: Rapid prototyping, consistent design system
Docker: Reproducible environments, easy scaling
