# 🤖 Knowledge-Based ChatBot – Full Stack Web Application

A **full-stack knowledge-based chatbot** built using **Spring Boot (Java)** and **React**, designed to answer programming-related questions using a **custom keyword-matching NLP engine**.  
This project demonstrates backend–frontend communication, REST API design, NLP fundamentals, and clean application architecture.

---

## 📌 Project Overview

The Knowledge-Based ChatBot allows users to ask questions related to **programming concepts** such as Java, Object-Oriented Programming (OOP), data structures, and algorithms.  
Instead of using AI/ML models, the chatbot relies on a **predefined knowledge base** and a **custom NLP processor** that matches keywords to return the most relevant response.

This makes the project:
- Lightweight
- Deterministic
- Easy to understand and extend
- Ideal for learning full-stack and NLP fundamentals

---

## 🏗️ Architecture Overview

The application follows a **client–server architecture**.

### Backend
- **Framework:** Spring Boot (Java 21)
- **API Style:** REST
- **Database:** MongoDB
- **NLP:** Custom keyword-based matching
- **Port:** `8080`

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Port:** `5173 / 5174`

### Communication
- HTTP REST API between frontend and backend
- JSON-based request/response format

---

## 🧠 Core Features

- Programming-focused Q&A chatbot
- Custom NLP keyword matching algorithm
- Knowledge base loaded at application startup
- Chat history UI on frontend
- RESTful API design
- CORS enabled for frontend-backend communication

---

## 🔧 Backend – Detailed Breakdown

### `ChatBotApplication.java`
- Entry point of the Spring Boot application
- Bootstraps the entire backend
- Initializes all beans and configurations

---

### `ChatController.java`
**Purpose:** Handles chat-related HTTP requests

- Endpoint: `POST /api/chat`
- Accepts user messages as JSON
- Returns chatbot response as plain text
- CORS enabled for React frontend

**Responsibilities:**
- Receive requests
- Delegate logic to `ChatService`
- Return responses to frontend

---

### `ChatService.java`
**Purpose:** Core business logic of the chatbot

- Loads the knowledge base at startup using `@PostConstruct`
- Accepts user messages from the controller
- Uses `NLPProcessor` to find best matches
- Returns final bot response

---

### `NLPProcessor.java`
**Purpose:** Custom NLP engine

**How it works:**
- Tokenizes user input
- Matches keywords against knowledge base entries
- Applies scoring logic:
  - Exact keyword matches
  - Phrase matches
  - Partial word matches
- Returns the highest-scoring answer
- Falls back to a default response if no match is found

---

### `ChatRequest.java`
**Purpose:** Request model

- Maps incoming JSON request body
- Contains:
  - `message` field
- Used for deserialization in `ChatController`

---

### `KnowledgeBaseEntry.java`
**Purpose:** Knowledge base data model

Each entry contains:
- `intent`
- `answer`
- `keywords`

Used by:
- `ChatService` for loading data
- `NLPProcessor` for keyword matching

---

### `knowledge_base.json`
**Purpose:** Static knowledge base

- Contains ~100 programming-related Q&A entries
- Topics include:
  - Java
  - OOP concepts
  - Data Structures
  - Algorithms
- Easily extensible by adding new entries

---

### `application.properties`
**Purpose:** Application configuration

- MongoDB Atlas connection
- Server port configuration
- Application name settings

---

### `pom.xml`
**Purpose:** Maven configuration

- Spring Boot dependencies
- MongoDB integration
- Lombok
- Java 21 compatibility
- Build and plugin management

---

## 🎨 Frontend – Detailed Breakdown

### `App.jsx`
**Purpose:** Main chatbot UI component

- Handles:
  - User input
  - Chat message state
  - API calls
  - Bot typing indicator
- Displays message history
- Styled using Tailwind CSS

---

### `api.js`
**Purpose:** Backend communication layer

- Sends POST requests to `/api/chat`
- Handles API responses and errors
- Centralizes backend communication logic

---

### `main.jsx`
**Purpose:** React entry point

- Renders `App` component
- Standard Vite + React setup

---

### `index.css`
**Purpose:** Global styling

- Imports Tailwind CSS
- Applies base styles globally

---

### `tailwind.config.js`
**Purpose:** Tailwind configuration

- Enables Tailwind for project
- Supports custom theme extensions

---

### `package.json`
**Purpose:** Frontend dependencies and scripts

- React
- Vite
- Tailwind CSS
- Development and build scripts

---

## 🔄 Data Flow

1. User enters a message in the React UI
2. Frontend sends a POST request to `/api/chat`
3. `ChatController` receives the request
4. `ChatService` processes the message
5. `NLPProcessor` matches keywords
6. Best answer is returned
7. Response flows back to frontend
8. Chat UI displays the bot’s response

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot 3.3.4
- MongoDB
- REST APIs

### Frontend
- React 19
- Vite
- Tailwind CSS

### Tools
- Maven
- npm
- Git

### NLP
- Custom keyword-based matching algorithm

---

## 🚀 How to Run the Project

### Backend
cd backend/chat-bot
mvn spring-boot:run

Backend runs on: http://localhost:8080
---

### Frontend
cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173

---

## 📈 Future Improvements

* Session-based chat history persistence
* Admin panel to manage knowledge base
* Advanced NLP using embeddings or ML models
* Authentication and user profiles
* Multi-language support

---

## 👤 Author

**Rucha Gade**
Full Stack Developer | Java | Spring Boot | React

---

## 📄 License

This project is for **educational and learning purposes**.
Feel free to fork, modify, and extend it.

