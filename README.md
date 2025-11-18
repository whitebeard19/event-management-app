# 📅 Event Management App

A beautifully themed **purple/blue calendar-based event planner** built with **React + TailwindCSS + Firebase Authentication**, featuring event creation, deletion, protected routes, sidebar summaries, and persistent user events using **localStorage**.

---

## 🚀 Features

### 🔐 Authentication (Firebase)
- Email & Password Signup/Login  
- Google Login  
- Auth-Protected Routes (React Router)  
- User Workspace Display  
- Secure Logout  

### 📅 Calendar System
- Custom calendar UI (**no trailing/leading prev/next month days**)  
- Highlighted current-month cells  
- Click to add events  
- Display multiple events per day  
- “+more” overflow indicator  
- Beautiful purple/blue theme  

### 📝 Event Management
- Add events (title + optional times)  
- Delete events instantly  
- Sidebar shows events for selected date  
- Event modal for adding events  
- Data stored in **localStorage → persistent across refresh**  

### 🎨 Modern UI
- TailwindCSS  
- Vibrant **Blue–Purple Theme (#1)**  
- Lucide icons  
- Shadows, gradients, rounded corners  
- Smooth transitions & hover effects  

### 📱 Responsive
- Works on desktop & mobile layouts  

---

## 🌈 Screenshots

> *(Replace these placeholder images with real screenshots)*

- **Login Page** 
![loginpage](/imgs/login.png) 
- **Signup Page**
![signuppage](/imgs/signup.png)  
- **Calendar Dashboard**  
![calendardashboard](/imgs/calendar.png)
- **Event Modal**
![eventmodal](/imgs/eventmodal.png)  


---

## 🛠️ Tech Stack

### **Frontend**
- React  
- React Router  
- TailwindCSS  
- Lucide Icons  

### **Backend / Auth**
- Firebase Authentication (Email/Password + Google)

### **Storage**
- localStorage (for events)

---

## Installation & Setup

### 1.Clone the Repository
```bash
git clone https://github.com/whitebeard19/event-management-app.git
cd event-management-app 
```

### 2.Install Dependencies
```bash
npm install
```

### 3.Setup Firebaes
- Go to Firebase Console -> Web app and copy paste your config in your project folder (use .env for Apis)

### 4.Start the App
```bash
npm run dev
```

---

## Future Enhancements
- Firestore event storage
- Edit event modal
- Drag & drop events
- Weekly view
- Reminders & Notifications
- Theme switcher
- Share events with friends

---

## Contributing
- Pull requests are welcome!







