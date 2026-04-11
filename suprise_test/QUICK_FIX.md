# 🚀 QUICK FIX - Execute This Step by Step

## FOR WINDOWS ⚙️

### STEP 1: Stop Everything
```
Press Ctrl+C in ALL terminals to stop backend and frontend
```

---

### STEP 2: Clear MySql (Optional but Recommended)

Open cmd and type:
```bash
mysql -u root -p12345678
```

Then paste this:
```sql
DROP DATABASE complaint_db;
CREATE DATABASE complaint_db;
EXIT;
```

This removes old data and starts fresh.

---

### STEP 3: Build Backend Fresh

Open **NEW TERMINAL** and run:
```bash
cd "c:\codes\react\New folder\suprise_test\demo"
mvn clean install
```

**WAIT until you see:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: ...
```

If you see `BUILD FAILURE`, share the error here.

---

### STEP 4: Start Backend

```bash
mvn spring-boot:run
```

**WAIT Until you see:**
```
✅ Test users initialized successfully!
Tomcat started on port(s): 8080
```

**KEEP THIS TERMINAL OPEN** ✅

---

### STEP 5: Start Frontend (NEW TERMINAL)

```bash
cd "c:\codes\react\New folder\suprise_test\suprise_test"
npm run dev
```

**WAIT Until you see:**
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

**KEEP THIS TERMINAL OPEN** ✅

---

### STEP 6: Test in Browser

1. Open http://localhost:5173 ✅
2. **Press F12** to open DevTools
3. Go to **Console** tab
4. **Clear console**: `console.clear()`
5. Login with: **admin** / **password123**

---

### STEP 7: READ CONSOLE OUTPUT

**In DevTools Console, tell me EXACTLY what you see:**

Look for these messages:

#### ✅ IF YOU SEE (SUCCESS):
```
✅ TOKEN ADDED TO REQUEST: eyJhbGc... for http://localhost:8080/api/complaints/admin/stats
✅ API SUCCESS: http://localhost:8080/api/complaints/admin/stats 200 {totalComplaints: 0, ...}
📊 Fetching stats...
✅ Stats fetched: {totalComplaints: 0, pendingComplaints: 0, ...}
```

#### ❌ IF YOU SEE (ERROR):
```
⚠️ NO TOKEN FOUND IN LOCALSTORAGE
❌ API ERROR: {status: 401, data: {...}}
```

---

### STEP 8: Share Output

**Copy-paste the COMPLETE console output starting from login** and share with me.

Example output to look for:
```
✅ TOKEN ADDED TO REQUEST: eyJhbGciOiJIUzI1NiJ9...  for http://localhost:8080/api/complaints/admin/stats
✅ API SUCCESS: http://localhost:8080/api/complaints/admin/stats 200 
  {
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0
  }
```

---

## 🎯 WHAT TO DO IF STILL ERROR

If still getting errors, do this:

### Check Backend Terminal
Look at the backend terminal window - copy any RED errors you see

### Check Network Tab
1. In DevTools go to **Network** tab
2. Refresh page (Ctrl+R)
3. Look for request like: `admin/stats` or `complaints`
4. Click on it
5. Check:
   - **Headers** tab → Look for `Authorization: Bearer ...`
   - **Response** tab → Copy the error JSON

---

## ✅ Files Modified

I've updated:

**Backend:**
- ✅ JwtFilter.java - Added @Component
- ✅ SecurityConfig.java - Added JwtFilter registration
- ✅ ComplaintController.java - Better error handling
- ✅ UserController.java - Better error handling
- ✅ GlobalExceptionHandler.java - NEW exception handler

**Frontend:**
- ✅ App.jsx - Added request + response interceptors with logging
- ✅ AdminDashboard.jsx - Added console logging
- ✅ ViewerDashboard.jsx - Better error messages
- ✅ UserDashboard.jsx - Better error messages

---

## 📋 Checklist Before Testing

- [ ] MySQL is running
- [ ] Both terminals have NO red errors
- [ ] No other process on port 8080 or 5173
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Ready to share console output

---

**EXECUTE THESE STEPS EXACTLY, THEN SHARE THE CONSOLE OUTPUT! 🎯**
