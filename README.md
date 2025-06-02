# TESTCASEMAGANG-APP
**Storyku**
## <a name="introduction"></a> Introduction
**Storyku** adalah aplikasi web berbasis **React** yang memungkinkan pengguna untuk berbagi cerita, melihat daftar cerita, dan mengelola cerita mereka. Proyek ini dibangun menggunakan **Vite sebagai** bundler dan menggunakan berbagai pustaka modern untuk pengembangan frontend.

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
✅ **Manajemen Cerita**

- Menampilkan semua cerita dalam tabel berhalaman

- Mencari cerita berdasarkan penulis/judul

- Menyaring cerita berdasarkan kategori dan status

- Menambahkan cerita baru

- Mengedit cerita yang sudah ada

- Melihat detail informasi cerita

- Menghapus cerita

✅ **Manajemen Bab**

- Menambahkan bab baru

- Mengedit bab yang sudah ada

- Menghapus bab

✅ **Pengujian**

- Pengujian unit dengan Jest dan React Testing Library



## <a name="libraries"></a> Libraries
### Frontend (React)
- **ReactJS**: Framework frontend

- **Vite**: Alat build (build tool)

- **Tailwind CSS**: Styling dan komponen antarmuka

- **Axios**: Klien HTTP

- **React Icons**: Pustaka ikon

- **Jest** & **React Testing Library**: Framework pengujian

### Backend (Express)
- **ExpressJS**: Framework backend

- **CORS**: Middleware untuk menangani CORS

## <a name="project-structures"></a> Project Structure
└── Storyku/                       # Root project directory
    ├── .env                      # Environment variables
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/                   # Static assets
    │   └── vite.svg
    ├── src/                      # Frontend source code
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx              # Entry point
    │   ├── components/           # Reusable components
    │   │   ├── Filter.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── TipTapEditor.jsx
    │   ├── pages/                # Application pages
    │   │   ├── AddChapter.jsx
    │   │   ├── AddStory.jsx
    │   │   ├── EditChapter.jsx
    │   │   ├── EditStory.jsx
    │   │   └── StoryManagement.jsx
    │   └── styles/               # CSS modules
    │       ├── AddChapter.css
    │       ├── AddStory.css
    │       ├── Filter.css
    │       ├── Sidebar.css
    │       ├── Table.css
    │       └── TipTapEditor.css
    └── backend/                  # Backend (ExpressJS)
        ├── .env
        ├── package.json
        ├── package-lock.json
        ├── server.js             # Entry point
        ├── api/                  # Logic for data
        │   ├── chapters.js
        │   └── stories.js
        └── routes/               # Express routes
            └── stories.js


## <a name="#website-url"></a> Website URL
Aplikasi ini dapat diakses melalui URL berikut: https://storyku-9ou3yd88y-fattahurs-projects.vercel.app/

