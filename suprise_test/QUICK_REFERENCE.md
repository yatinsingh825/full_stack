# 🚀 Quick Reference Card

## Quick Start (After Setup)

### Start Backend
```bash
cd demo
mvn spring-boot:run
# Backend running at: http://localhost:8080
```

### Start Frontend (in new terminal)
```bash
cd suprise_test
npm run dev
# Frontend running at: http://localhost:5173
```

---

## Test Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | password123 |
| Viewer | viewer | password123 |
| User | user1 | password123 |
| User | user2 | password123 |

---

## Role Permissions Matrix

| Feature | Admin | Viewer | User |
|---------|-------|--------|------|
| View all complaints | ✅ | ✅ | ❌ |
| View own complaints | ✅ | ❌ | ✅ |
| Create complaints | ✅ | ❌ | ✅ |
| Edit any complaint | ✅ | ❌ | ❌ |
| Edit own complaint | ✅ | ❌ | ✅ |
| Delete any complaint | ✅ | ❌ | ❌ |
| Delete own complaint | ✅ | ❌ | ✅ |
| View user list | ✅ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| Change user roles | ✅ | ❌ | ❌ |
| View statistics | ✅ | ✅ | ✅ |
| Access admin panel | ✅ | ❌ | ❌ |

---

## API Endpoints Summary

### Auth
```
POST   /api/auth/login
POST   /api/auth/register
```

### Complaints
```
GET    /api/complaints              (role-based)
GET    /api/complaints/my-complaints
POST   /api/complaints              (create)
PUT    /api/complaints/{id}         (update status)
DELETE /api/complaints/{id}         (delete)
GET    /api/complaints/admin/stats  (admin only)
```

### Users (Admin Only)
```
GET    /api/users/all
GET    /api/users/by-role/{role}
PUT    /api/users/{id}
DELETE /api/users/{id}
```

---

## Common Commands

### Backend
```bash
# Build only
mvn clean install

# Run with auto-reload
mvn spring-boot:run

# Run tests
mvn test

# Build production JAR
mvn clean package
```

### Frontend
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Build preview
npm run preview

# Lint code
npm run lint
```

---

## Database Schema

### Users Table
```sql
- id (PRIMARY KEY)
- username (UNIQUE)
- password
- role (ADMIN, VIEWER, USER)
- full_name
- email
- active (BOOLEAN)
```

### Complaints Table
```sql
- id (PRIMARY KEY)
- title
- description
- status (Pending, In Progress, Resolved)
- priority (Low, Medium, High)
- category (General, Technical, Billing, Support)
- user_id (FOREIGN KEY)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## Color Scheme

- **Primary Purple**: #667eea → #764ba2 (gradient)
- **Success Green**: #27ae60
- **Warning Orange**: #f39c12
- **Danger Red**: #e74c3c
- **Info Blue**: #3498db
- **Gray**: #7f8c8d, #95a5a6, #ecf0f1

---

## Port Reference

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`
- MySQL: `localhost:3306`
- Database: `complaint_db`

---

## Quick Troubleshooting

### Backend won't start
```bash
# Port 8080 in use?
netstat -ano | findstr :8080
# Kill process and retry
```

### Frontend shows blank page
```bash
# Clear cache and refresh
Ctrl+Shift+Delete  # then clear all
# Or check console (F12)
```

### Login fails
```bash
# Clear browser storage
DevTools → Application → Storage → Clear All
# Verify backend is running
```

### Database issues
```bash
# Check MySQL is running
mysql -u root -p
# Verify credentials in application.properties
```

---

## File Locations

### Important Backend Files
- Config: `demo/src/main/resources/application.properties`
- Main: `demo/src/main/java/.../DemoApplication.java`
- Auth: `demo/src/main/java/.../controller/AuthController.java`

### Important Frontend Files
- Main: `suprise_test/src/App.jsx`
- Login: `suprise_test/src/Login.jsx`
- Dashboards: `suprise_test/src/components/`
- Styles: `suprise_test/src/styles/`

---

## Documentation Files

- `README.md` - Full project overview
- `SETUP_GUIDE.md` - Step-by-step setup
- `CHANGES.md` - What was changed

---

## Hot Keys

### Browser DevTools (F12)
- `Ctrl+Shift+I` - Open DevTools
- `Console` - Check for errors
- `Network` - Monitor API calls
- `Application` - Check localStorage

### IDE (VS Code)
- `Ctrl+/` - Comment code
- `Alt+Up/Down` - Move line
- `Ctrl+H` - Find & Replace
- `Ctrl+G` - Go to line

---

## When Things Go Wrong

1. **Check the logs**
   - Backend: Terminal showing `mvn spring-boot:run`
   - Frontend: Browser console (F12)
   - Database: MySQL error logs

2. **Verify connectivity**
   - Backend running? `curl localhost:8080`
   - Frontend running? `curl localhost:5173`
   - MySQL running? `mysql -u root -p`

3. **Test with test credentials**
   - admin / password123
   - User must be active

4. **Clear caches & restart**
   - Backend: Ctrl+C, then restart
   - Frontend: Ctrl+C, clear cache, restart
   - Browser: Ctrl+Shift+Delete

5. **Check modified files**
   - Ensure no syntax errors
   - Verify API URLs are correct
   - Check database connection string

---

## Performance Tips

- Don't store large data in localStorage
- Use browser DevTools Network tab to optimize
- Enable database query logging for debugging
- Use production builds for testing
- Monitor memory usage with DevTools

---

## Production Checklist

- [ ] Hash passwords with BCrypt
- [ ] Use HTTPS/SSL
- [ ] Restrict CORS origins
- [ ] Set environment variables
- [ ] Enable logging
- [ ] Setup monitoring
- [ ] Backup database regularly
- [ ] Update dependencies
- [ ] Test thoroughly
- [ ] Document changes

---

## Useful Links

- React Docs: https://react.dev
- Spring Boot: https://spring.io/projects/spring-boot
- JWT: https://jwt.io
- MySQL: https://www.mysql.com
- Axios: https://axios-http.com
- MDN Web Docs: https://developer.mozilla.org

---

## Quick Feature Overview

### Admin Dashboard
- 📊 Statistics (4 metrics)
- 👥 User Management (CRUD + roles)
- 📋 Complaint Management (all complaints)

### User Dashboard
- 📝 Create complaints (title, priority, category, description)
- 📋 View personal complaints
- 🔄 Update status
- 🗑️ Delete complaints
- 📊 Quick stats

### Viewer Dashboard
- 👀 View all complaints (read-only)
- 🔍 Search functionality
- 🔧 Filter by status
- 📊 System statistics

---

**Keep this card handy! You'll reference it often.** 📌
