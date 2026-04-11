# 🔍 DEBUGGING: Error Fetching Stats/Complaints

## STEP 1: Clear Everything and Rebuild

### Backend
```bash
cd "c:/codes/react/New folder/suprise_test/demo"

# Clean everything
mvn clean

# Rebuild
mvn install

# Run backend
mvn spring-boot:run
```

**WAIT** for this in terminal:
```
✅ Test users initialized successfully!
Tomcat started on port(s): 8080
```

---

### Frontend (NEW TERMINAL)
```bash
cd "c:/codes/react/New folder/suprise_test/suprise_test"

# Clear node modules cache
npm cache clean --force

# Start fresh
npm run dev
```

---

## STEP 2: Open Browser and Check Console

1. Open http://localhost:5173
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. **BEFORE** logging in, clear console with: `console.clear()`

---

## STEP 3: Test Login

1. Click **📝 Test Credentials** dropdown
2. Copy: `admin` / `password123`
3. Login
4. **Check Console** - You should see:

### ✅ Expected Console Output (After Login)

```
✅ TOKEN ADDED TO REQUEST: eyJhbGciOi... for http://localhost:8080/api/complaints/admin/stats
✅ API SUCCESS: http://localhost:8080/api/complaints/admin/stats 200
✅ Stats fetched: {totalComplaints: 0, pendingComplaints: 0, ...}
```

### ❌ If You See (This Means Problem)

```
⚠️ NO TOKEN FOUND IN LOCALSTORAGE
❌ API ERROR: {status: 401, message: "Unauthorized"}
```

**Solution:** Token not saving on login - Check if login succeeded

---

## STEP 4: Check Network Tab

1. In DevTools, go to **Network** tab
2. Click on the **GET `/api/complaints/admin/stats`** request
3. Look at **Request Headers** - Should see:
```
Authorization: Bearer eyJhbGciOi...
```

If NOT there → Token not being sent!

---

## STEP 5: Check Response

In Network tab, click the request and go to **Response** tab:

### ✅ Should See (Success)
```json
{
  "totalComplaints": 0,
  "pendingComplaints": 0,
  "resolvedComplaints": 0,
  "inProgressComplaints": 0
}
```

### ❌ If You See (Unauthorized)
```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "..."
}
```

---

## STEP 6: Check Backend Terminal

Look at your backend terminal output:

### ✅ Normal (Good)
```
2024-04-11 10:30:45.123  INFO 12345 --- [main] c.e.s.d.DemoApplication : Started DemoApplication
✅ Test users initialized successfully!
```

### ❌ If Error
```
ERROR ... SecurityConfig ... Cannot find bean JwtFilter
```

---

## STEP 7: Test Database

Open MySQL and check:
```bash
mysql -u root -p
# Password: 12345678

USE complaint_db;
SELECT * FROM users;
```

Should show:
```
| id | username | role   | fullName         | email         | active |
|----|----------|--------|------------------|---------------|--------|
| 1  | admin    | ADMIN  | Administrator    | admin@...     | 1      |
| 2  | viewer   | VIEWER | Viewer User      | viewer@...    | 1      |
| 3  | user1    | USER   | John Doe         | john@...      | 1      |
```

---

## COMMON ISSUES & SOLUTIONS

### Problem 1: "Error fetching stats" but no Authorization header

**Cause:** Token not being set by interceptor

**Fix:**
```jsx
// In App.jsx, make sure you have BOTH interceptors
const requestInterceptor = axios.interceptors.request.use(...) // ✅ REQUEST
const responseInterceptor = axios.interceptors.response.use(...) // ✅ RESPONSE
```

---

### Problem 2: 401 Unauthorized in Network tab

**Cause:** Token is invalid or JWT validation failing

**Check:**
1. Is token saved in localStorage?
   - Open F12 → Application → Local Storage → localhost:5173
   - Should see `token`, `userRole`, `userData`

2. Is token being sent?
   - Network tab → click request → Request Headers
   - Should have `Authorization: Bearer ...`

---

### Problem 3: Backend not starting

**Error:** "Cannot find bean JwtFilter"

**Fix:**
```java
@Component  // ← MUST HAVE THIS
public class JwtFilter extends OncePerRequestFilter {
```

Make sure SecurityConfig.java has:
```java
@Autowired
private JwtFilter jwtFilter;  // ← ADD THIS

// And in filterChain method:
.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // ← ADD THIS
```

---

### Problem 4: MySQL Connection Error

**Check:**
```bash
# Windows - Check if MySQL running
# Task Manager → Services → MySQL80 should be "Running"

# Test connection
mysql -u root -p12345678 -e "USE complaint_db; SELECT COUNT(*) FROM users;"
```

---

## STEP 8: Manual API Test

Use this to test API directly. Go to browser console and run:

```javascript
// Test 1: Get token from localStorage
const token = localStorage.getItem("token");
console.log("Token:", token);

// Test 2: Call API with token
fetch('http://localhost:8080/api/complaints/admin/stats', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log("Success:", data))
.catch(err => console.error("Error:", err));

// Test 3: Call without token (should fail with 401)
fetch('http://localhost:8080/api/complaints/admin/stats')
  .then(r => {
    console.log("Status:", r.status);
    return r.json();
  })
  .then(data => console.log("Response:", data));
```

---

## STEP 9: After Finding Issue

👆 **Share the console output from STEP 3** with me:

```
- Token added to request or NOT?
- API SUCCESS or API ERROR?
- What's the exact error message?
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Backend running: `mvn spring-boot:run` ✅ 
- [ ] Frontend running: `npm run dev` ✅
- [ ] MySQL running
- [ ] Console shows "✅ TOKEN ADDED TO REQUEST"
- [ ] Network tab shows Authorization header
- [ ] Response is 200 with data
- [ ] No red errors in console

---

**Follow these steps and tell me EXACTLY what you see in the console!**
