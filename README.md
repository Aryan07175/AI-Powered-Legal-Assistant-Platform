# ⚖️ LexAssist AI — AI-Powered Legal Assistant Platform

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)

**A full-stack MERN application that provides AI-driven legal assistance, automated document generation, and real-time video consultations with verified lawyers.**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Reference](#-api-reference) · [Deployment](#-deployment)

</div>

---

## 📸 Screenshots

| Landing Page | AI Chatbot |
|:---:|:---:|
| ![Landing](https://via.placeholder.com/600x340/0f172a/3b82f6?text=Landing+Page) | ![Chatbot](https://via.placeholder.com/600x340/0f172a/10b981?text=AI+Chatbot) |

| Document Generator | Lawyer Directory |
|:---:|:---:|
| ![Docs](https://via.placeholder.com/600x340/0f172a/a855f7?text=Document+Generator) | ![Lawyers](https://via.placeholder.com/600x340/0f172a/f59e0b?text=Lawyer+Directory) |

---

## ✨ Features

### 🤖 AI Legal Chatbot
- Ask any legal question in plain English
- Powered by OpenAI GPT for simplified, accurate legal advice
- Full chat history persisted in the database
- Suggested question prompts for quick access

### 📄 Legal Document Generator
- Generate professional legal documents with AI:
  - **Non-Disclosure Agreements (NDA)**
  - **Rent Agreements**
  - **Employment Contracts**
  - **Service Agreements**
- Fill a simple form → AI generates the full document
- **Download as PDF** with one click

### ⚖️ Lawyer Marketplace
- Browse a directory of verified lawyers
- Filter by specialization (Corporate, Criminal, Civil, Family)
- View ratings, experience, and hourly rates
- Book consultation slots instantly

### 📹 Video Consultation
- Real-time peer-to-peer video calls using **WebRTC**
- In-call controls: mute mic, toggle camera
- Signaling handled via **Socket.io**
- Unique meeting links generated per appointment

### 📊 Role-Based Dashboards
- **Client Dashboard**: Chat history, generated documents, upcoming appointments
- **Lawyer Dashboard**: Appointment management, earnings tracking
- Quick-action cards for instant navigation

### 🔐 Authentication & Security
- JWT-based signup/login
- Role-based access control (Client / Lawyer)
- Password hashing with bcrypt
- Protected API routes with auth middleware

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router 7 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI Engine** | OpenAI GPT API |
| **Real-Time** | Socket.io |
| **Video Calls** | WebRTC (simple-peer) |
| **Auth** | JSON Web Tokens (JWT), bcryptjs |
| **PDF Export** | jsPDF |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB** running locally or a MongoDB Atlas connection string
- **OpenAI API Key** ([get one here](https://platform.openai.com/api-keys))

### 1. Clone the Repository

```bash
git clone https://github.com/Aryan07175/AI-Powered-Legal-Assistant-Platform.git
cd AI-Powered-Legal-Assistant-Platform
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai_legal_assistant
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:

```bash
node server.js
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the Application

Visit **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
AI-Powered-Legal-Assistant-Platform/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── aiController.js        # AI chatbot & document generation
│   │   ├── appointmentController.js
│   │   ├── authController.js      # Register, login, JWT
│   │   ├── documentController.js
│   │   └── lawyerController.js
│   ├── middleware/
│   │   └── auth.js                # JWT verification middleware
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Chat.js
│   │   ├── Document.js
│   │   ├── Lawyer.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   └── lawyerRoutes.js
│   ├── sockets/
│   │   └── chatSocket.js          # Socket.io + WebRTC signaling
│   ├── .env
│   ├── package.json
│   └── server.js                  # Express app entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state
│   │   ├── pages/
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DocumentGenerator.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LawyerDirectory.jsx
│   │   │   ├── Login.jsx
│   │   │   └── VideoCallRoom.jsx
│   │   ├── App.jsx
│   │   ├── index.css              # Tailwind + custom design system
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── DEPLOYMENT.md
├── .gitignore
└── README.md
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user/lawyer | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |

### AI Services
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/ai/chat` | Ask a legal question to AI | ✅ |
| `POST` | `/api/ai/generate-document` | Generate a legal document | ✅ |

### Documents
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/documents` | Save a generated document | ✅ |
| `GET` | `/api/documents` | Get all user documents | ✅ |
| `GET` | `/api/documents/:id` | Get a specific document | ✅ |

### Lawyers
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/lawyers` | List all lawyers (filterable) | ❌ |
| `GET` | `/api/lawyers/:id` | Get lawyer profile | ❌ |

### Appointments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/appointments` | Book a consultation | ✅ |
| `GET` | `/api/appointments` | Get user/lawyer appointments | ✅ |
| `PUT` | `/api/appointments/:id` | Update appointment status | ✅ |

---

## 🌐 Deployment

See the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide for detailed instructions.

**Quick summary:**

| Service | Platform | Root Directory |
|---|---|---|
| Backend API | [Render](https://render.com) | `backend/` |
| Frontend SPA | [Vercel](https://vercel.com) | `frontend/` |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | — |

---

## 🔮 Roadmap & Advanced Features

- [ ] AI-based document review (upload doc → get suggestions)
- [ ] Rating & review system for lawyers
- [ ] Payment integration (Stripe / Razorpay)
- [ ] Multi-language support
- [ ] Email/SMS appointment reminders
- [ ] Admin panel for lawyer verification

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Aryan](https://github.com/Aryan07175)**

</div>
