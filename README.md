# 📝 Notes App

A simple Notes application built with **React, Supabase, and Vercel**. Users can create, update, and delete notes, with authentication handled via Supabase.

---

## 🚀 Features
✅ User Authentication (Signup, Login, Logout) using Supabase  
✅ Create, Read, Update, and Delete (CRUD) notes  
✅ Each note is linked to the authenticated user  
✅ Deployed on **Vercel** for seamless hosting  
✅ Responsive UI with **React Icons**  

---

## 🏗️ **Tech Stack**
- **Frontend**: React (Create React App)
- **Backend**: Supabase (Auth & Database)
- **Hosting**: Vercel
- **Styling**: CSS, React Icons

---

## 📂 **Project Structure**
```
task1/
│── src/
│   ├── components/
│   │   ├── Notes/
│   │   │   ├── Notes.js  # Main notes component
│   │   │   ├── NoteItem.js  # Individual note display
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   ├── config/
│   │   ├── supabase.js  # Supabase client setup
│   ├── App.js  # Main App component
│   ├── index.js  # Entry point
│── public/
│── package.json
│── README.md
│── .gitignore
```

---

## 🔧 **Setup & Installation**
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase environment variables**
   - Create a `.env` file in the root directory.
   - Add the following:
     ```ini
     REACT_APP_SUPABASE_URL=your-supabase-url
     REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. **Run the project locally**
   ```bash
   npm start
   ```

---

## 🌍 **Deployment on Vercel**
This project is deployed on **Vercel**. To manually deploy:
```bash
vercel --prod
```

If environment variables are missing in Vercel:
1. **Go to Vercel Dashboard → Settings → Environment Variables**
2. Add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
3. Click **Redeploy**

---

## ❌ **Common Issues & Fixes**
### 🔴 `Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')`
- Ensure your `.env` file is correctly set up.
- Restart the server after updating `.env`:  
  ```bash
  npm start
  ```

### 🔴 `Module not found: Can't resolve 'react-icons/fa'`
- Run:
  ```bash
  npm install react-icons
  ```

### 🔴 `error: failed to push some refs to GitHub`
- Run:
  ```bash
  git pull origin main --rebase
  git push origin main
  ```

---

## ✨ **Future Enhancements**
- ✅ Dark mode support  
- ✅ Rich text editing for notes  
- ✅ Share notes with other users  
- ✅ Implement reminders & notifications  

---

## 🛠 **Contributing**
Want to contribute? Follow these steps:
1. Fork the repository  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: Added new feature"
   ```
4. Push and open a pull request!

---

## 📜 **License**
This project is licensed under the **MIT License**.

---

### 🎉 **Thank You for Using Notes App!**
Feel free to ⭐️ **star this repo** if you found it useful!

