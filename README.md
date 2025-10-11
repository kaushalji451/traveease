RudraabhishekTravels Website (MERN Stack with Next.js)

This is a full-stack travel booking website built using the MERN stack (MongoDB, Express.js, React/Next.js, Node.js).
The project replicates a travel booking platform with modern technologies, responsive design, and a scalable backend architecture.

📌 Table of Contents

🚀 Demo

✨ Features

🛠️ Tech Stack


⚙️ Setup Instructions

📜 Available Scripts

🌐 API Endpoints

🖼️ Screenshots

☁️ Deployment

🔒 Environment Variables

📜 License

🚀 Demo

Live Demo Link

https://traveease.vercel.app/

✨ Features

Fully responsive Next.js frontend with Tailwind CSS

Express.js backend with RESTful APIs

MongoDB database using Mongoose

Modular authentication and authorization with Passport.js

Functional Contact Form with data persistence

Dynamic content pages: News, Timeline, Biography, Gallery

Flight, Hotel, Bus, and Train booking modules

Payment integration (Razorpay)

Clean, maintainable, and scalable code structure

🛠️ Tech Stack
Category	Technology
Frontend	React.js, Next.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Tools	Axios, Dotenv, Nodemon, Pnpm, PostCSS, Git
Deployment	Vercel (frontend), Render (backend), MongoDB Atlas (cloud DB)


⚙️ Setup Instructions
Prerequisites

Node.js (v16+ recommended)

MongoDB (local or Atlas)

npm / yarn / pnpm

1. Clone the repository
git clone https://github.com/kaushalji451/traveease.git

1. Setup Backend (server)
cd backend
pnpm install
cp .env.example .env  # or create your own
node app.js            # or use nodemon for hot reload


Example .env:

PORT=5000         # auth-service
PORT=5001         # hotel-service
PORT=5002         # flight-service
PORT=5003         # payment-service
MONGO_URI=mongodb://localhost:27017/rudrabhishektravels

3. Setup Frontend (client)
cd ../frontend
pnpm install
pnpm run dev


Optional frontend .env:

VITE_API_BASE_URL=http://localhost:5000

📜 Available Scripts
Frontend
Command	Description
pnpm run dev	Start Next.js development server
pnpm build	Build for production
pnpm preview	Preview production build locally
Backend
Command	Description
node app.js	Start server with Node
nodemon app.js	Start server with hot reload
☁️ Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🔒 Environment Variables
Backend (backend/.env)
Variable	Description
PORT	Server port
MONGO_URI	MongoDB connection string
Frontend (frontend/.env)
Variable	Description
VITE_API_BASE_URL	Base URL for Axios API calls
📜 License

This project is open-source under the MIT License.