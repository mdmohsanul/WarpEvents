# Fotive

A mini event management system with user authentication, event creation, registration, and attendee tracking. Includes search, filter, and pagination for efficient event browsing.

---

## Demo Link

[Live Demo](https://warp-events.vercel.app)  

---

## Login

> **Guest**  
> Email: `sam@gmail.com`  
> Password: `Sam@123`

---

## Quick Start

```
git clone https://github.com/mdmohsanul/WarpEvents
cd Fotive
npm install
npm run dev 
```

## Technologies
- React JS
- TypeScript
- React Router
- Node.js
- Express
- MongoDB
- JWT
- TailwindCSS

## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://www.loom.com/share/08c96c3a9879457ca3bfbbaec4d1137c?sid=4bf54e14-dfd7-41dd-ba5d-d3835d21f9ca)

## Features

**Home**
- View all Events.
- Click on any event to open full details of a particular event
- "Add Event" button to create a new event


**Authentication**
- JWT-based authentication with email/password login.
- All events and other actions are secured via protected routes.

## API Reference


### **POST /api/auth/signup**<br>  	
Register a new user<br> 	 
Sample Response:<br> 
```{ "userId": "user123", "token": "jwt-token" }```

### **POST /api/auth/login**<br>  	
Login user with email/password<br> 	 
Sample Response:<br> 
``` { "userId": "user123", "token": "jwt-token" }```

### **POST /api/auth/logout**<br>  	
Logout current user (protected)<br> 	 
Sample Response:<br> 
``` { "message": "Logged out successfully." }```



## Contact
For bugs or feature requests, please reach out to mdmohsan2407@gmail.com