# TESTCASEMAGANG-APP

## <a name="introduction"></a> Introduction
This project is a **Story Management System** built with **ReactJS** for the frontend and **ExpressJS** for the backend. It enables users to perform CRUD operations for managing stories and chapters. Users can list, add, edit, delete, and view story details in an intuitive UI.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Libraries](#libraries)
- [Project Structure](#project-structures)
- [Setup & Installation](#setup-installation)
- [Website URL](#website-url)

---

## <a name="features"></a> Features
✅ **Story Management**  
- View all stories in a paginated table  
- Search stories by writer/title  
- Filter stories by category and status  
- Add new stories  
- Edit existing stories  
- View detailed story info  
- Delete stories

✅ **Chapter Management**  
- Add new chapters  
- Edit existing chapters  
- Delete chapters

✅ **Testing**  
- Unit testing with **Jest** and **React Testing Library**

---

## <a name="libraries"></a> Libraries
### Frontend (React)
- **ReactJS**: Frontend framework
- **Vite**: Build tool
- **Tailwind CSS**: Styling and UI components
- **Axios**: HTTP client
- **React Icons**: Icon library
- **Jest** & **React Testing Library**: Testing framework

### Backend (Express)
- **ExpressJS**: Backend framework
- **CORS**: Middleware for handling CORS
- **Body Parser**: Middleware for parsing request bodies
- **Nodemon**: Development tool for live-reload

---

## <a name="project-structures"></a> Project Structure
.
├── client/                  # Frontend (ReactJS)
│   ├── public/              # Static assets (favicon, images, etc.)
│   ├── src/                 # Main source code
│   │   ├── assets/          # Additional assets (images, fonts, etc.)
│   │   ├── components/      # Reusable components
│   │   │   └── Admin/       # Components for Admin panel
│   │   │       ├── __test__/        # Test files for components
│   │   │       └── Sidebar.jsx      # Sidebar component
│   │   ├── pages/           # Application pages
│   │   │   └── Admin/       # Pages for Admin
│   │   │       ├── AddChapter.jsx
│   │   │       ├── AddStory.jsx
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── DetailStory.jsx
│   │   │       ├── EditChapter.jsx
│   │   │       ├── EditStory.jsx
│   │   │       └── StoryManagement.jsx
│   │   ├── services/        # API service handlers
│   │   │   ├── chapterService.js
│   │   │   └── storyService.js
│   │   ├── App.jsx          # Main App component
│   │   ├── index.css        # Global styles
│   │   ├── index.html       # HTML template
│   │   ├── main.jsx         # React entry point
│   │   ├── setupTests.js    # Jest setup file
│   ├── .gitignore
│   ├── babel.config.js
│   ├── eslint.config.js
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
│
└── server/                  # Backend (ExpressJS)
    ├── data/                # Mock data
    │   ├── chapters.js
    │   └── stories.js
    ├── public/              # Static assets (images)
    │   └── img/             # Uploaded images
    ├── routes/              # Express routes
    │   ├── chapter.js
    │   └── story.js
    ├── server.js            # Express server entry point
    ├── package.json
    └── package-lock.json

## <a name="#website-url"></a> Website URL
Deployed Link : https://testcasemagang-app.vercel.app/ 
