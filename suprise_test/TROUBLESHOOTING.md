# 🔧 Troubleshooting Guide - All New Features

## Common Issues & Solutions

---

## ❌ Complaints Still Not Visible to Admin/Viewer

### Symptoms:
- User submits complaint
- Admin/Viewer can't see it
- Complaint appears only for the user

### Solution:
1. **Restart Backend** (important!)
   ```bash
   # Stop backend (Ctrl+C in terminal)
   # Run again:
   mvn spring-boot:run
   ```

2. **Clear Browser Cache** - Restart frontend too:
   ```bash
   # Stop frontend (Ctrl+C)
   npm run dev
   ```

3. **Check Database** - Ensure MySQL is running:
   ```bash
   mysql -u root -p
   USE complaint_db;
   SELECT * FROM complaints;
   ```

4. **Verify User Association** - Check that complaints have user_id:
   ```sql
   SELECT id, title, user_id FROM complaints;
   ```

---

## ❌ Toast Notifications Not Showing

### Symptoms:
- No messages appear after actions
- Blank behavior after submit

### Solution:
1. **Check if ToastProvider is imported**:
   ```js
   // In App.jsx - should be wrapped:
   <ToastProvider>
     <AppContent />
   </ToastProvider>
   ```

2. **Check browser console** (F12 → Console):
   - Look for any JavaScript errors
   - Red errors indicate problems

3. **Restart frontend**:
   ```bash
   npm run dev
   ```

---

## ❌ Server Status Shows Red (Offline)

### Symptoms:
- Red dot in top-left corner
- Shows "Server Offline"

### Solution:
1. **Check if backend is running**:
   ```bash
   # You should see: "Tomcat started on port(s): 8080"
   mvn spring-boot:run
   ```

2. **Verify port 8080** - Another app may be using it:
   ```bash
   # Windows:
   netstat -ano | findstr :8080
   
   # macOS/Linux:
   lsof -i :8080
   ```

3. **Kill process using port 8080**:
   ```bash
   # Windows - stop the process
   # macOS: kill -9 <PID>
   ```

4. **Check MySQL** - Backend depends on database:
   ```bash
   # Verify MySQL is running
   mysql -u root -p
   ```

---

## ❌ Sorting Not Working

### Symptoms:
- Dropdown changes but complaints don't reorder
- Always showing same order

### Solution:
1. **Check for JavaScript errors** (F12 → Console)

2. **Verify sortUtils.js exists**:
   ```
   suprise_test/src/utils/sortUtils.js
   ```

3. **Refresh the page** - Force reload:
   ```bash
   Ctrl+Shift+R  (Browser cache clear + reload)
   ```

---

## ❌ Analytics Charts Not Displaying

### Symptoms:
- Admin Dashboard shows blank space
- No bar chart or pie chart

### Solution:
1. **Check if stats are loading**:
   - Open DevTools Network tab (F12)
   - Look for `/api/complaints/admin/stats` request
   - Should return JSON with totalComplaints, etc.

2. **Verify SimpleChart component**:
   ```
   suprise_test/src/components/SimpleChart.jsx
   ```

3. **Check Chart.css is imported**:
   - Visit `src/styles/Chart.css`
   - Should have chart styling

4. **Restart and test**:
   ```bash
   npm run dev
   ```

---

## ❌ Export (CSV/PDF) Not Working

### Symptoms:
- Buttons don't download files
- No response when clicking export

### Solution:
1. **Check browser download settings**:
   - Browser may block auto-downloads
   - Check download folder
   - Check browser notifications

2. **Try with fewer complaints**:
   - Export works better with < 1000 rows
   - Try exporting 10 complaints first

3. **PDF Export**:
   - Should open print preview
   - Check if popup is blocked
   - Allow popups for this site

4. **Clear browser data**:
   ```bash
   Ctrl+Shift+Delete  → Select "Cookies and cached files"
   ```

---

## ❌ Glassomorphic Design Looks Wrong

### Symptoms:
- Looks flat, no blur effect
- Not translucent
- Missing gradient

### Solution:
1. **Verify CSS files are imported**:
   - Login.css with glassomorphic styles
   - App.css with navbar glass effect
   - Toast.css with toast glass effect

2. **Check browser support**:
   - Requires modern browser (Chrome, Firefox, Safari, Edge)
   - IE not supported

3. **Clear CSS cache**:
   ```bash
   Ctrl+Shift+Delete in browser
   ```

4. **Restart frontend**:
   ```bash
   npm run dev
   ```

---

## ❌ Login Says "Invalid Username or Password"

### Symptoms:
- Can't login with test credentials
- Even after trying multiple times

### Solution:
1. **Verify correct credentials**:
   ```
   Username: admin (NOT "Admin")
   Password: password123
   ```

2. **Check backend is running**:
   - Should see "Test users initialized" message
   - MySQL database has users table

3. **Verify database has users**:
   ```sql
   SELECT username, role FROM users;
   ```

4. **Clear browser localStorage**:
   ```bash
   F12 → Application → Storage → Clear All
   ```

5. **Try creating new account**:
   - Click "Sign up" link
   - Register with new credentials
   - Login with new account

---

## ❌ Can't See Other Users' Complaints

### Symptoms:
- Login as user1, see complaints
- Login as user2, can't see user1's complaints

### Solution:
**This is expected!** Different user roles:

| User Type | Sees What |
|-----------|-----------|
| **User** | Only own complaints |
| **Viewer** | ALL complaints (read-only) |
| **Admin** | ALL complaints (can edit) |

**To see all complaints:**
- Login as `viewer` (sees all) or
- Login as `admin` (manages all)

---

## ❌ Database Errors on Startup

### Symptoms:
- "Can't connect to MySQL server"
- "Database connection refused"

### Solution:
1. **Start MySQL**:
   ```bash
   # Windows - Start MySQL Service
   # macOS:
   brew services start mysql
   
   # Linux:
   sudo systemctl start mysql
   ```

2. **Verify credentials in application.properties**:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=12345678
   ```

3. **Test MySQL connection**:
   ```bash
   mysql -u root -p
   ```

4. **Create database if missing**:
   ```sql
   CREATE DATABASE complaint_db;
   ```

---

## ❌ Port Already in Use

### Symptoms:
- "Address already in use :8080"
- "Port 5173 in use"

### Solution:

**For Backend (8080)**:
```bash
# Find what's using port 8080
# Windows:
netstat -ano | findstr :8080

# macOS/Linux:
lsof -i :8080

# Kill the process
# Windows: taskkill /PID <number> /F
# macOS/Linux: kill -9 <PID>
```

**For Frontend (5173)**:
```bash
# Same process
lsof -i :5173
kill -9 <PID>
```

---

## ❌ CORS Errors When Calling API

### Symptoms:
- "Access-Control-Allow-Origin" error
- API calls blocked

### Solution:
1. **Check backend is running** - CORS requires live backend

2. **Verify API URL** - Should be `http://localhost:8080`:
   ```js
   const API = "http://localhost:8080/api";
   ```

3. **Check Security Config** - Should allow CORS:
   ```java
   @CrossOrigin("*")  // Should see this
   ```

---

## 🟢 Everything Works - Tips to Keep It Running

1. **Keep Terminal Windows Open**:
   - One for backend (`mvn spring-boot:run`)
   - One for frontend (`npm run dev`)

2. **Watch for Errors**:
   - Backend: Check terminal for red errors
   - Frontend: Check F12 console for red errors

3. **Test Regularly**:
   - After making changes
   - Test all 3 roles
   - Verify new features work

4. **Save Work**:
   - Commit to git regularly
   - Backup database

5. **Keep Services Running**:
   - MySQL should always be available
   - Restart if you restart computer

---

## 📞 Quick Debug Checklist

When something doesn't work:

- [ ] Backend running? (mvn spring-boot:run)
- [ ] Frontend running? (npm run dev)
- [ ] MySQL running?
- [ ] Check browser console (F12)
- [ ] Check backend terminal
- [ ] Try refreshing browser (Ctrl+R)
- [ ] Try Ctrl+Shift+Delete (clear cache)
- [ ] Try restarting frontend
- [ ] Try restarting backend
- [ ] Check terminal for error messages

---

## 🎯 Quick Test Steps

### Test 1: Complaint Visibility
```
1. Start backend & frontend
2. Login as user1 (user1/password123)
3. Submit complaint "Test 123"
4. Logout
5. Login as admin (admin/password123)
6. Go to Complaints tab
7. Should see "Test 123" ✅
```

### Test 2: Toast Notifications
```
1. Try login with wrong password
2. Should see RED error toast ✅
3. Try submit empty complaint
4. Should see ORANGE warning toast ✅
5. Submit valid complaint
6. Should see GREEN success toast ✅
```

### Test 3: Sorting
```
1. Submit 3 complaints
2. Choose "Title A-Z" sort
3. Complaints should reorder ✅
4. Choose "Newest First"
5. Latest first ✅
```

### Test 4: Analytics
```
1. Login as admin
2. Go to Dashboard tab
3. Should see bars & pie chart ✅
4. Shows percentages ✅
```

### Test 5: Export
```
1. Go to Complaints tab
2. Click "CSV" → Download ✅
3. Click "PDF" → Print preview ✅
```

---

**Most issues resolve with: Restart Backend, Restart Frontend, Clear Cache!** 🚀
