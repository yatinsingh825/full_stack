# 🎯 Professional Complaint Management System

A full-fledged, role-based complaint management system with an admin dashboard, modern UI, and comprehensive features.

---

## ✨ Features

### 🔐 Role-Based Access Control
- **ADMIN** - Full system control, user management, analytics dashboard
- **VIEWER** - Read-only access to all complaints with advanced filtering
- **USER** - Submit and manage personal complaints

### 📊 Admin Dashboard
- 📈 Real-time statistics (total, pending, in-progress, resolved)
- 👥 User management (create, edit, delete, change roles)
- 📋 Complaint management with status updates
- 🎯 Overview of all system activity

### 👤 User Dashboard
- ✏️ Submit new complaints with priority & category
- 📝 View personal complaints
- 🔄 Track complaint status in real-time
- 🗑️ Delete own complaints
- 📊 Quick stats (total, pending, resolved)

### 👀 Viewer Dashboard
- 📊 View all complaints (read-only)
- 🔍 Advanced search & filtering
- 📈 System-wide statistics
- 📋 Beautiful table view of complaints

### 🎨 Modern UI (No Tailwind)
- Gradient purple theme
- Smooth animations & transitions
- Responsive design (mobile, tablet, desktop)
- Professional card-based layouts
- Custom CSS styling

### 🔐 Security Features
- JWT-based authentication
- Token expiration (24 hours)
- Role-based authorization
- HTTP-only token storage
- Secure REST API endpoints

---

## 🚀 Setup Instructions

### Prerequisites
- **Java 17+**
- **MySQL 8.0+**
- **Node.js 18+**
- **npm or yarn**

### Backend Setup

#### 1. Create MySQL Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE complaint_db;
USE complaint_db;
```

#### 2. Configure Backend
Edit `demo/src/main/resources/application.properties`:

```properties
spring.application.name=demo
spring.datasource.url=jdbc:mysql://localhost:3306/complaint_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

#### 3. Build & Run Backend
```bash
cd demo
mvn clean install
mvn spring-boot:run
```

The server will start at `http://localhost:8080`

### Frontend Setup

#### 1. Install Dependencies
```bash
cd suprise_test
npm install
```

#### 2. Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 📋 Test Credentials

After startup, the system automatically seeds the following test accounts:

| Role | Username | Password | Email |
|------|----------|----------|-------|
| **ADMIN** | admin | password123 | admin@example.com |
| **VIEWER** | viewer | password123 | viewer@example.com |
| **USER** | user1 | password123 | john@example.com |
| **USER** | user2 | password123 | jane@example.com |

---

## 📁 Project Structure

```
complaint-management/
│
├── demo/ (Spring Boot Backend)
│   ├── src/main/java/com/example/suprisetest/demo/
│   │   ├── model/
│   │   │   ├── Complaint.java
│   │   │   └── User.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── ComplaintController.java
│   │   │   └── UserController.java
│   │   ├── service/
│   │   │   └── ComplaintService.java
│   │   ├── repository/
│   │   │   ├── ComplaintRepository.java
│   │   │   └── UserRepository.java
│   │   ├── security/
│   │   │   └── JwtUtil.java
│   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   └── util/
│   │       └── DataInitializer.java
│   └── pom.xml
│
└── suprise_test/ (React Frontend)
    ├── src/
    │   ├── components/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── UserDashboard.jsx
    │   │   └── ViewerDashboard.jsx
    │   ├── styles/
    │   │   ├── Login.css
    │   │   ├── AdminDashboard.css
    │   │   ├── UserDashboard.css
    │   │   └── ViewerDashboard.css
    │   ├── App.jsx
    │   ├── Login.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Complaints
- `GET /api/complaints` - Get complaints (based on role)
- `GET /api/complaints/my-complaints` - Get user's complaints
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/{id}` - Update complaint status
- `DELETE /api/complaints/{id}` - Delete complaint
- `GET /api/complaints/admin/stats` - Get system stats (Admin only)

### Users (Admin Only)
- `GET /api/users/all` - Get all users
- `GET /api/users/by-role/{role}` - Get users by role
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

---

## 🎨 UI Features

### Color Scheme
- **Primary**: Purple gradient (#667eea → #764ba2)
- **Success**: Green (#27ae60)
- **Warning**: Orange (#f39c12)
- **Danger**: Red (#e74c3c)
- **Info**: Blue (#3498db)

### Components
- Responsive navbar with role badges
- Tab-based navigation for admin
- Card-based complaint layout
- Form validation with error messages
- Status badges with color coding
- Priority indicators
- Quick statistics cards
- Advanced filtering system
- Data tables for viewers

---

## 🚨 Important Notes

### Security
⚠️ **For Production:**
- Replace hardcoded passwords with bcrypt hashing
- Use environment variables for database credentials
- Enable HTTPS/SSL
- Add rate limiting
- Implement CORS properly
- Add input validation & sanitization
- Use prepared statements for all DB queries

### Performance
- Implement pagination for complaint lists
- Add caching for statistics
- Optimize database queries with indexes
- Add request compression

### Testing
```bash
# Backend tests
cd demo
mvn test

# Frontend tests
cd suprise_test
npm run test
```

---

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 🖥️ Desktops (1024px and up)

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify Java 17+ is installed

### Frontend shows blank page
- Ensure backend API is running on port 8080
- Check browser console for errors
- Clear browser cache

### CORS errors
- Backend CORS is enabled for all origins (development only)
- For production, restrict CORS origins

### Login fails
- Verify correct credentials
- Check if backend is running
- Check network tab in browser dev tools

---

## 🤝 Contributing

To contribute:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues and questions:
1. Check this README
2. Review code comments
3. Check browser/server logs
4. Create an issue on GitHub

---

**Built with ❤️ using Spring Boot & React**
