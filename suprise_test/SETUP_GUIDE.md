# 🚀 Complete Setup Guide

This guide will walk you through setting up the Complaint Management System from scratch.

---

## 📋 Prerequisites Checklist

- [ ] Java 17 or later installed
- [ ] MySQL 8.0 or later installed
- [ ] Node.js 18+ and npm installed
- [ ] Git installed
- [ ] A code editor (VS Code recommended)

---

## 🔧 Step-by-Step Setup

### Phase 1: Database Setup

#### Step 1.1 - Start MySQL
```bash
# Windows (using MySQL Command Line)
mysql -u root -p

# macOS (using Homebrew)
brew services start mysql

# Linux
sudo systemctl start mysql
```

#### Step 1.2 - Create Database
```sql
CREATE DATABASE complaint_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'complaint_user'@'localhost' IDENTIFIED BY 'complaint@123';
GRANT ALL PRIVILEGES ON complaint_db.* TO 'complaint_user'@'localhost';
FLUSH PRIVILEGES;
```

Or simply use `root` with your MySQL password (default setup in the guide uses root).

---

### Phase 2: Backend Setup

#### Step 2.1 - Navigate to Backend
```bash
cd demo
```

#### Step 2.2 - Configure Database Connection
Edit `src/main/resources/application.properties`:

```properties
# Application Name
spring.application.name=ComplaintSystem

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/complaint_db
spring.datasource.username=root
spring.datasource.password=12345678

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080
server.servlet.context-path=/

# Logging
logging.level.root=INFO
logging.level.com.example.suprisetest.demo=DEBUG
```

#### Step 2.3 - Verify Java Version
```bash
java -version
```
Should show Java 17 or later.

#### Step 2.4 - Build Backend
```bash
mvn clean install
```

This will download dependencies and compile the project. Takes 1-3 minutes first time.

#### Step 2.5 - Start Backend
```bash
mvn spring-boot:run
```

You should see:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| ._ |_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

Tomcat started on port(s): 8080
✅ Test users initialized successfully!
```

**Leave this terminal running** while you set up the frontend!

---

### Phase 3: Frontend Setup

#### Step 3.1 - Open New Terminal & Navigate to Frontend
```bash
cd suprise_test
```

#### Step 3.2 - Install Dependencies
```bash
npm install
```

This downloads all React and build dependencies. Takes 2-5 minutes.

#### Step 3.3 - Start Development Server
```bash
npm run dev
```

You should see:
```
VITE v8.0.4  ready in 234 ms

➜  Local:   http://localhost:5173/
```

---

## ✅ Verify Everything is Running

### Check 1: Backend API
Open in your browser:
```
http://localhost:8080/api/auth/login
```
You should see a 405 error (expected - it's POST only) or a CORS response.

### Check 2: Frontend App
Open in your browser:
```
http://localhost:5173/
```
You should see the login page!

### Check 3: Test Login
Use these credentials:
- **Username:** admin
- **Password:** password123

If login works, you'll see the Admin Dashboard! 🎉

---

## 🧪 Complete Testing Workflow

### Test Admin Account
1. Login with: `admin / password123`
2. Click "Dashboard" tab to see statistics
3. Click "User Management" to see users
4. Click "All Complaints" to see all system complaints
5. Try creating a user or updating roles

### Test User Account
1. Logout
2. Login with: `user1 / password123`
3. You'll see the User Dashboard
4. Click "New Complaint" to submit a complaint
5. Fill in the form and submit
6. See your complaint in the list

### Test Viewer Account
1. Logout
2. Login with: `viewer / password123`
3. You'll see the Viewer Dashboard
4. Search and filter complaints
5. Note: You can't create or modify complaints (read-only)

---

## 🐛 Troubleshooting

### ❌ Backend won't start

**Error: "ERROR o.s.b.d.LoggingFailureAnalysisReporter : ..."**

**Solution:**
```bash
# Check if port 8080 is in use
# Windows
netstat -ano | findstr :8080

# macOS/Linux
lsof -i :8080

# Kill process and restart
```

**Error: "Can't connect to MySQL server"**

**Solution:**
```bash
# Verify MySQL is running
# Windows - Check Services
# macOS
brew services list

# Linux
sudo systemctl status mysql

# Check credentials in application.properties
```

---

### ❌ Frontend shows blank white page

**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for CORS or API errors
3. Ensure backend is running on port 8080
4. Clear browser cache: `Ctrl+Shift+Delete`

---

### ❌ Login fails with "Invalid credentials"

**Solution:**
1. Verify backend is running - check terminal output
2. Check credentials are correct (admin/password123)
3. Clear localStorage: Open DevTools → Application → Storage → Clear All
4. Refresh page and try again

---

### ❌ Can't access API endpoints

**Solution:**
```bash
# Test backend manually
curl http://localhost:8080/api/auth/login

# If you get CORS error, backend might not be responding
# Check backend terminal for errors
```

---

## 📱 Mobile Testing

To test on a mobile device:

```bash
# Get your computer's IP address
# Windows
ipconfig

# macOS/Linux
ifconfig

# From mobile device, visit:
http://YOUR_IP:5173
```

---

## 🔨 Development Commands

### Backend
```bash
# Development with auto-reload
mvn spring-boot:run

# Build only (no run)
mvn clean install

# Run tests
mvn test

# Build deployable JAR
mvn clean package
```

### Frontend
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🚨 Important Security Notes

Before deploying to production, you MUST:

1. **Hash Passwords**
   - Currently passwords are stored as plain text!
   - Use BCrypt or similar
   - Update AuthController and User model

2. **Change Default Users**
   - Delete test accounts
   - Create real admin account with strong password

3. **Update CORS**
   - Currently allows all origins (`*`)
   - Restrict to your domain

4. **Use HTTPS**
   - Never send tokens over HTTP
   - Use SSL certificates

5. **Environment Variables**
   - Use `.env` files for secrets
   - Never commit credentials

---

## 📊 Architecture Overview

```
┌─────────────┐                    ┌──────────────┐
│   Browser   │                    │   MySQL DB   │
│   (React)   │◄──────────API──────│   Database   │
└─────────────┘        REST        └──────────────┘
      │                │                   ▲
      │                │                   │
      └────────────────┼───────────────────┘
         Login/Data    │
                    Spring Boot
                    (Port 8080)
                    ├─ REST APIs
                    ├─ JWT Auth
                    ├─ Role-based Logic
                    └─ Business Logic
```

---

## 🎓 Learning Resources

### Backend (Spring Boot)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT in Spring Boot](https://jwt.io)

### Frontend (React)
- [React Documentation](https://react.dev)
- [Axios Tutorial](https://axios-http.com)
- [HTML/CSS Reference](https://developer.mozilla.org)

### Database
- [MySQL Tutorial](https://www.mysql.com/why-mysql/)
- [SQL Guide](https://www.w3schools.com/sql/)

---

## ✨ Next Steps

After successful setup:

1. **Explore the codebase** - Understand the structure
2. **Modify test data** - Add your own test users/complaints
3. **Customize UI** - Update colors, fonts, layouts
4. **Add new features** - Build on the foundation
5. **Deploy** - Follow production security checklist

---

## 💡 Tips & Tricks

### Quick Reset
To reset everything:
```bash
# Backend - Clear old tables
# Delete and recreate database

# Frontend - Clear cache
# DevTools → Application → Storage → Clear All

# Restart both servers
```

### Debug Mode
Add logging to debug issues:
```java
// Backend
System.out.println("DEBUG: " + variable);
logger.info("INFO: " + message);

// Frontend
console.log("DEBUG:", variable);
console.error("ERROR:", error);
```

### Live Debugging
```bash
# Backend - Add breakpoint and run Debug mode
# Frontend - DevTools (F12) has full debugging

# Network tab to inspect API calls
# Console tab for errors
# Elements tab to inspect HTML
```

---

## 🎉 Success Checklist

- [ ] MySQL running and complaint_db created
- [ ] Backend compiled and running on port 8080
- [ ] Frontend installed and running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Login works with admin/password123
- [ ] Can see Admin Dashboard
- [ ] Can switch between User/Viewer accounts
- [ ] Can view complaints
- [ ] Can submit new complaints (as user)

---

**Once all checkmarks are complete, you're ready to use the system!** 🚀

Need help? Check the main README.md for more information.
