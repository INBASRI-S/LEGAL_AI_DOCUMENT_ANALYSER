# 📘 Legal AI Document Analyser

An AI-powered web application that analyses legal documents, extracts key clauses, summarises content, and classifies legal text using Natural Language Processing (NLP) and Machine Learning.

---

## 🚀 Features

- 🔍 Legal document analysis
- 🧠 Clause extraction
- 📄 AI-based summarisation
- 🗂️ Text classification
- 📊 Backend + Frontend integrated system
- 🔐 Secure API handling

---

## 🛠️ Tech Stack

| Layer      | Technology Used |
|------------|----------------|
| Frontend   | React.js |
| Backend    | Node.js, Express.js |
| AI/NLP     | OpenAI API / Transformers / LangChain |
| Data Handling | JSON, PDF Parsing |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```bash
LEGAL_AI_DOCUMENT_ANALYSER/
│
├── AI Projects/
│   └── AI Projects/
│       └── legal-ai-backend/      # Backend API
│
├── legal-ai-frontend/             # React Frontend
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/INBASRI-S/LEGAL_AI_DOCUMENT_ANALYSER.git
cd LEGAL_AI_DOCUMENT_ANALYSER
```

---

### 2️⃣ Setup Backend

```bash
cd "AI Projects/AI Projects/legal-ai-backend"
npm install
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

```bash
cd legal-ai-frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside backend folder:

```
PORT=8000
OPENAI_API_KEY=your_api_key_here
```

---

## 📌 Prerequisites

- Node.js installed
- npm installed
- Git installed
- OpenAI API Key (if using AI features)

---

## 📦 Recommended .gitignore

```
node_modules/
.env
dist/
build/
```

---

## 🧠 Future Improvements

- Upload PDF directly for analysis
- Clause highlighting in UI
- Multi-language legal support
- Cloud deployment

---

## 👩‍💻 Author

**Inbasri S**

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star!
