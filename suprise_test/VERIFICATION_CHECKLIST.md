# ✅ Complete Verification Checklist

Use this checklist to verify all features are working correctly!

---

## 🔧 System Setup Verification

- [ ] MySQL is running
- [ ] Backend builds without errors (`mvn clean install`)
- [ ] Backend starts (`mvn spring-boot:run`)
- [ ] Backend shows "Test users initialized"
- [ ] Frontend installs without errors (`npm install`)
- [ ] Frontend starts (`npm run dev`)
- [ ] Browser shows: http://localhost:5173

---

## 🔐 Login & Authentication

### Error Handling
- [ ] Try login with wrong password
- [ ] See RED error toast "Invalid username or password"
- [ ] Error disappears after 3 seconds
- [ ] Try wrong username
- [ ] See same error message

### Successful Login
- [ ] Login as admin/password123
- [ ] Redirects to dashboard
- [ ] See navbar with "ADMIN" badge
- [ ] Can see username and email in navbar
- [ ] See "Logout" button

### Test All Accounts
- [ ] admin/password123 → Admin Dashboard
- [ ] viewer/password123 → Viewer Dashboard
- [ ] user1/password123 → User Dashboard
- [ ] user2/password123 → User Dashboard

---

## 🔴 Server Status Indicator

### Display
- [ ] Server status appears in **TOP-LEFT corner**
- [ ] Shows green dot with "Server Online"
- [ ] Has pulsing animation effect
- [ ] Uses glassomorphic design (frosted glass)

### Functionality
- [ ] Stop backend (Ctrl+C in terminal)
- [ ] Server status changes to RED "Server Offline"
- [ ] Restart backend
- [ ] Status changes back to GREEN
- [ ] Checks automatically every 5 seconds

---

## 📋 Complaint Visibility Fix

### Submit as User
- [ ] Login as user1/password123
- [ ] Click "New Complaint" button
- [ ] Fill in title: "Test Complaint 123"
- [ ] Fill in description: "This is a test"
- [ ] Select priority: "High"
- [ ] Select category: "Technical"
- [ ] Click "Submit"
- [ ] See GREEN success toast "Complaint submitted successfully!"

### View as Admin
- [ ] Logout
- [ ] Login as admin/password123
- [ ] ⭐ **MUST SEE** user1's complaint in complaints list
- [ ] See title "Test Complaint 123"
- [ ] See priority "High"
- [ ] See category "Technical"

### View as Viewer
- [ ] Logout
- [ ] Login as viewer/password123
- [ ] Navigate to complaints view
- [ ] ⭐ **MUST SEE** user1's complaint
- [ ] Cannot edit or delete (read-only)

---

## 🎨 Glassomorphic UI Design

### Login Page
- [ ] Login card has frosted glass effect
- [ ] Card background is semi-transparent
- [ ] Can see gradient behind the card
- [ ] Input fields have glass styling
- [ ] Button has gradient
- [ ] "Test Credentials" box has glass effect

### Navbar
- [ ] Navbar has translucent background
- [ ] See blur effect (if supported)
- [ ] Text is readable
- [ ] Role badge has gradient
- [ ] Logout button has gradient

### Cards & Forms
- [ ] Complaint cards have rounded borders
- [ ] Forms have clean glass styling
- [ ] Modals have backdrop blur

---

## 🔔 Toast Notifications

### Success Toast
- [ ] Submit complaint
- [ ] See GREEN toast with ✅ icon
- [ ] Message: "Complaint submitted successfully!"
- [ ] Auto-hides after 3 seconds

### Error Toast
- [ ] Try login with wrong credentials
- [ ] See RED toast with ❌ icon
- [ ] Message shows error
- [ ] Auto-hides after 3 seconds

### Warning Toast
- [ ] Try submit empty complaint
- [ ] See ORANGE toast with ⚠️ icon
- [ ] Message: "Please fill in all required fields"
- [ ] Auto-hides after 3 seconds

### Info Toast
- [ ] Should see info toasts with ℹ️ icon for various actions

### Toast Behavior
- [ ] Toasts stack if multiple appear
- [ ] Can click X to close manually
- [ ] Smooth slide-in animation
- [ ] Smooth fade-out animation

---

## 📊 Sorting Functionality

### User Dashboard Sorting
- [ ] Login as user1
- [ ] Submit 3 different complaints
- [ ] Find "Sort by:" dropdown
- [ ] Select "Newest First"
- [ ] Most recent complaint appears first
- [ ] Select "Oldest First"
- [ ] Oldest complaint appears first
- [ ] Select "Title (A-Z)"
- [ ] Complaints sort alphabetically by title
- [ ] Select "Title (Z-A)"
- [ ] Complaints sort reverse alphabetically
- [ ] Select "High Priority First"
- [ ] High priority complaints listed first
- [ ] Select "By Status"
- [ ] Complaints group by status

### Admin Complaints Sorting
- [ ] Login as admin
- [ ] Go to Complaints tab
- [ ] Find "Sort by:" dropdown
- [ ] Test all sorting options
- [ ] Results reorder correctly for each option

---

## 📈 Analytics & Charts

### Admin Dashboard Analytics
- [ ] Login as admin
- [ ] Click "Dashboard" tab
- [ ] See 4 stat cards (Total, Pending, In Progress, Resolved)
- [ ] Each card shows correct number
- [ ] Below stats, see "📊 Analytics" section

### Bar Chart
- [ ] Shows 3 bars: Pending, In Progress, Resolved
- [ ] Each bar shows percentage and count
- [ ] Pending bar is ORANGE
- [ ] In Progress bar is BLUE
- [ ] Resolved bar is GREEN
- [ ] Bars are proportional to values
- [ ] Shows 100% total

### Pie Chart
- [ ] Shows circular pie chart with SVG
- [ ] Has colored sections matching the data
- [ ] Shows legend below with 3 items
- [ ] Colors match bar chart colors
- [ ] Sections are proportional to percentages

---

## 📥 Export Functionality

### CSV Export
- [ ] Go to Admin Dashboard
- [ ] Click "Complaints" tab
- [ ] Find "📥 CSV" button
- [ ] Click export button
- [ ] File `complaints.csv` downloads
- [ ] See GREEN success toast "CSV exported successfully"
- [ ] Open CSV in Excel/Sheets
- [ ] All complaints data is there
- [ ] Columns: ID, Title, Description, Status, Priority, Category, User, Email, Created

### PDF Export
- [ ] Still on Complaints tab
- [ ] Find "📥 PDF" button
- [ ] Click export button
- [ ] Print dialog opens
- [ ] See "Complaints Report" title
- [ ] See timestamp "Generated on: ..."
- [ ] See table with complaints data
- [ ] See "Total Records: X" at bottom
- [ ] Can print or save as PDF
- [ ] See GREEN success toast "PDF exported successfully"

---

## 👥 User Management

### View Users (Admin Only)
- [ ] Login as admin
- [ ] Click "User Management" tab
- [ ] See list of all users
- [ ] See user cards with:
  - [ ] Full name
  - [ ] Username (@username)
  - [ ] Email
  - [ ] Active/Inactive status
  - [ ] Role selector
  - [ ] Delete button

### Update User Role
- [ ] Select different role for a user
- [ ] User role updates immediately
- [ ] See GREEN success toast "User role updated"
- [ ] Role changes persist after refresh

### Toggle User Status
- [ ] Click Active/Inactive button
- [ ] User status toggles
- [ ] Button text changes
- [ ] User appears faded when inactive

### Delete User
- [ ] Click Delete button on a user
- [ ] User is removed from list
- [ ] See GREEN success toast "User deleted"
- [ ] User doesn't appear after refresh

---

## 🔒 Role-Based Access

### Admin Role
- [ ] Can view all complaints (not just own)
- [ ] Can see User Management tab
- [ ] Can see Dashboard tab with analytics
- [ ] Can see export buttons
- [ ] Can update any complaint status
- [ ] Can delete any complaint
- [ ] Can manage all users

### Viewer Role
- [ ] Can see all complaints
- [ ] Cannot create complaints
- [ ] Cannot edit any complaint
- [ ] Cannot delete any complaint
- [ ] Can filter and search
- [ ] Can see statistics
- [ ] No admin features

### User Role
- [ ] Can only see own complaints
- [ ] Can create new complaints
- [ ] Can update own complaint status
- [ ] Can delete own complaints
- [ ] Cannot see other users' complaints
- [ ] Cannot manage users
- [ ] No admin/viewer features, no admin panel, no user management

---

## 📱 Responsive Design

### Desktop (1920x1080)
- [ ] All elements properly spaced
- [ ] All features accessible
- [ ] No horizontal scroll
- [ ] Good readability

### Tablet (768px - iPad)
- [ ] Layout adapts to tablet size
- [ ] Touch buttons are large enough
- [ ] No overflow
- [ ] Good readability

### Mobile (320px - Phone)
- [ ] Layout stacks vertically
- [ ] Navbar adapts for small screen
- [ ] Touch buttons are clickable
- [ ] Forms are readable
- [ ] No horizontal scroll

---

## 📝 Form Validation

### Complaint Form
- [ ] Try submit with empty title
- [ ] See ORANGE warning: "Please fill in all required fields"
- [ ] Try submit with empty description
- [ ] See same warning
- [ ] Fill both fields
- [ ] Submit works
- [ ] Form clears after submit

### Login Form
- [ ] Try submit with empty username
- [ ] Try submit with empty password
- [ ] Both required for submit to work
- [ ] Shows appropriate validation

---

## 🚀 Performance & Stability

### Loading
- [ ] Complaints load quickly
- [ ] Analytics charts load quickly
- [ ] Sorting is instant
- [ ] No lag when switching tabs

### Stability
- [ ] Multiple submits work correctly
- [ ] Multiple sorts work correctly
- [ ] Multiple exports work correctly
- [ ] No JavaScript errors in console (F12)
- [ ] No server errors in terminal

### Session Management
- [ ] Login persists when refreshing
- [ ] Logout clears session
- [ ] After logout, cannot access protected pages
- [ ] Token is properly cleared

---

## 🎯 Feature Integration

### Full User Journey
- [ ] Login as user1 ✅
- [ ] Submit complaint ✅
- [ ] See success toast ✅
- [ ] Logout ✅
- [ ] Login as admin ✅
- [ ] See user1's complaint in list ✅
- [ ] See analytics showing the complaint ✅
- [ ] Sort complaints ✅
- [ ] Export as CSV/PDF ✅
- [ ] Update complaint status ✅
- [ ] See status change instantly ✅
- [ ] Go to User Management ✅
- [ ] See all users ✅
- [ ] Change a user's role ✅
- [ ] See success toast ✅
- [ ] Logout ✅

---

## ✨ Visual Quality Check

### Design Consistency
- [ ] All buttons look the same style
- [ ] All cards have consistent styling
- [ ] Colors are consistent throughout
- [ ] Fonts are readable
- [ ] Spacing is consistent
- [ ] Borders and shadows are uniform

### Animations
- [ ] Page transitions are smooth
- [ ] Toast animations are smooth
- [ ] No stuttering or janky movement
- [ ] Modal opening/closing is fluid
- [ ] Hover effects work smoothly

### Visual Hierarchy
- [ ] Important items stand out
- [ ] Clear headings
- [ ] Clear action buttons
- [ ] Status badges are visible
- [ ] Priorities are distinguishable

---

## 🔍 Browser Console Check

- [ ] F12 → Console tab
- [ ] No red errors
- [ ] No red warnings about critical issues
- [ ] Network tab shows successful API calls (200 status)
- [ ] No failed API requests

---

## 🎉 Final Verification

| Feature | Status | Notes |
|---------|--------|-------|
| Complaint visibility | ✅ or ❌ | Admin/Viewer see all |
| Error messages | ✅ or ❌ | Wrong password |
| Toast notifications | ✅ or ❌ | All actions |
| Server status | ✅ or ❌ | Green/red dot |
| Glassomorphic design | ✅ or ❌ | Frosted glass |
| Sorting | ✅ or ❌ | All options |
| Analytics | ✅ or ❌ | Charts & stats |
| CSV export | ✅ or ❌ | File downloads |
| PDF export | ✅ or ❌ | Report opens |
| User management | ✅ or ❌ | Admin only |
| Role-based access | ✅ or ❌ | 3 roles work |
| Mobile responsive | ✅ or ❌ | All sizes |
| Form validation | ✅ or ❌ | Error messages |
| No console errors | ✅ or ❌ | Browser F12 |

---

## ✍️ Sign-Off

When all items are checked ✅, your system is **READY FOR USE!**

```
Date: ___________
Verified by: ___________
Status: ___________
```

---

**Congratulations! Your complaint management system is complete!** 🎊

