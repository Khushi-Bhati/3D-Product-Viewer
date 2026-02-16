# 3D Product Viewer

A full-stack application to upload, view, and configure 3D models (GLB/GLTF).

## 🏗 Architecture
[Frontend (React + Three.js)] <---> [Backend (Node.js + Express)] <---> [MongoDB]
       |                                      |
   [3D Viewer]                           [File Storage / API]

## 🛠 Tech Stack
- **Frontend**: React, Vite, Three.js, @react-three/fiber, @react-three/drei, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer
- **Styling**: CSS (Inter font)

## 📂 Folder Structure
```
3D-Product-Viewer/
├── backend/
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── uploads/      # Stored 3D models
│   └── server.js     # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI/Viewer components
│   │   ├── App.jsx     # Main logic
│   │   └── main.jsx    # Entry point
│   └── vite.config.js
└── README.md
```

## 🚀 Setup & Deployment

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Installation
1. **Clone the repository**
2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env if needed (PORT=5000)
   node server.js
   ```
3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Features implemented
- **3D Viewer**: Orbit controls, zoom, pan, ambient/directional lighting.
- **Upload**: Upload .glb/.gltf models to backend.
- **Settings**: Change background color and toggle wireframe (persisted to MongoDB).

## 📝 Important Decisions
- **Three.js Wrapper**: Used `@react-three/fiber` for declarative 3D scenes in React.
- **Stage Component**: Used `@react-three/drei/Stage` for instant "studio" lighting and centering.
- **File Storage**: Local disk storage using `multer` for simplicity (easy to switch to S3).
