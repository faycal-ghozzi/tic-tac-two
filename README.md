# 🎮 Tic Tac TWO!

A minimalist, modern, and strategic take on the classic Tic Tac Toe — reimagined with a twist.  
Play locally or online against friends in a sleek UI with fading moves, animated backgrounds, and polished transitions.

👉 [**Live Demo**](https://tic-tac-two-phi.vercel.app)

---

## ✨ Features

- 🎮 Local multiplayer mode  
- 🌐 Online multiplayer with Socket.IO  
- ♻️ Fading moves add memory & strategy  
- 🔁 Alternating first-turn logic  
- 🎨 Animated 3D XO background using Three.js  
- 🖼️ SEO + social previews (OpenGraph & Twitter)  
- 🔒 No accounts, no tracking — just pure fun  

---

## 🚀 Tech Stack

| Tech             | Description                          |
|------------------|--------------------------------------|
| **Next.js 15**   | App Router, server components        |
| **TypeScript**   | Fully typed codebase                 |
| **Tailwind CSS** | Utility-first CSS                    |
| **Socket.IO**    | Real-time multiplayer server         |
| **Three.js**     | 3D animated X/O flying background    |
| **Vercel**       | Fast, serverless hosting             |

---

## 📦 Installation

```bash
git clone https://github.com/faycal-ghozzi/tic-tac-two
cd tic-tac-two
npm install
▶️ Start the frontend
npm run dev
Frontend runs on: http://localhost:3000
```

## 🔌 Multiplayer Server Setup

The multiplayer logic (Socket.IO) runs from the server/ folder.

cd server
npm install
npm run start
This runs the server on http://localhost:4000.
Make sure it's running before starting an online match.

## 📁 Project Structure
```bash
/app               # Next.js app router (frontend)
/components        # UI components (Board, Navbar, etc.)
/lib               # Socket client connection
/public            # Static assets (favicon, images)
/server            # Multiplayer server (Socket.IO)
/styles            # Global styles
/types             # TypeScript types
/utils             # Game logic & helpers
```
## 🧠 Gameplay Twist

Each move fades away over time, forcing players to:

Adapt their memory 🧠
Plan ahead strategically 🧩
Turn order also alternates each round to keep matches fair.

## 🌍 Live Deployment

Hosted on Vercel
🔗 https://tic-tac-two-phi.vercel.app

## 👨‍💻 Author

Faycal Ghozzi
GitHub: @faycal-ghozzi

## 📜 License

This project is licensed under the MIT License.
Feel free to use, fork, remix, and contribute ✌️