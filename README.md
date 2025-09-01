# 📚 ReadersHub
A full-stack MERN web application that allows users to explore books, write reviews, and rate their favorite reads.  

- [Frontend Repository](https://github.com/knight-coding/ReadersHub-frontend)
- [Backend Repository](https://github.com/knight-coding/ReadersHub-backend)


---

## 📖 About the Project

**ReadersHub** is a full-stack MERN web application where users can explore books, share reviews, and connect with other readers.  
It provides an easy way to discover trending books, write your own reviews, and manage your reading journey.

---

## ✨ Features

- 🔐 User authentication (Register/Login with JWT)  
- 📝 Add, edit & delete book reviews (role-based access)  
- ⭐ Rate books & view average ratings  
- 📊 Personalized dashboard with your reviews  
- 📱 Responsive UI built with TailwindCSS  

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Hosting:** Vercel (Frontend), Render/Heroku (Backend), MongoDB Atlas  

---

## 🚀 Learning Journey

This project was not only about building a Book Review platform but also about strengthening my skills as a developer.  
Here’s what I gained during the process:

- 📌 **MERN Stack**: Improved my understanding of React components, Express routing, and MongoDB schema design.  
- 🔐 **Authentication**: Learned to implement JWT-based authentication and handle protected routes.  
- 🎨 **UI/UX**: Explored TailwindCSS for creating a clean and responsive design.  
- ⚙️ **Backend APIs**: Built RESTful APIs and understood how to structure routes and controllers.  
- 🧠 **Problem Solving**: Faced and fixed issues like CORS errors, async/await bugs, and database connection failures.  

This project marked a key milestone in my journey toward becoming a **full-stack developer**. 💡  

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 📌 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/atlas/database) (local or Atlas)  
- Git  

---

### 🔧 Installation

1. **Clone the repositories**

   ```bash
   # Create a project folder
   mkdir ReadersHub && cd ReadersHub

   # Clone frontend
   git clone https://github.com/knight-coding/ReadersHub-frontend.git frontend

   # Clone backend
   git clone https://github.com/knight-coding/ReadersHub-backend.git backend
    ```

2. **Install dependencies**

   * For backend:

     ```bash
     cd backend
     npm install
     ```
   * For frontend:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Setup environment variables**

   * Inside the `backend` folder, create a `.env` file
   * Add the following keys (example):

     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. **Start the servers**

   * Start backend:

     ```bash
     cd backend
     npm run dev
     ```
   * Start frontend (in another terminal):

     ```bash
     cd frontend
     npm run dev
     ```
