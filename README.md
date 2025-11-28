# SAFE_VIEW 

This project is a Role-Based Access Control system for Parents and Kids.  
Parents can create Child accounts and control which video categories their kids can access.  
Kids can view allowed videos and create playlists.

---

## 🚀 Features

### 👨‍👩‍👧 Parent Role
- Login / Signup
- Create child users
- Control content access categories for each child

### 👦 Kid Role
- Login
- View allowed videos based on categories
- Create Playlists
- Add allowed videos into playlists



---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone <repo-url>
cd <project-folder>


npm install

```sh

---
Create a .env file inside backend folder:

---
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000


cd ../frontend
npm install
```sh