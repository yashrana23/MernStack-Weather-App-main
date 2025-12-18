# MERN Stack Weather App

[![CSS](https://img.shields.io/badge/Made%20with-CSS-blue?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML](https://img.shields.io/badge/Uses-HTML-orange?logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Overview

The **MERN Stack Weather App** is a project created using Express.js, React.js, and Node.js (MERN stack). It provides users with up-to-date weather information for a specified location. With a sleek and responsive front-end designed using CSS and powered by JavaScript, the app ensures a seamless user experience.

---

## 🎯 Features

- 🌍 **Support for Global Locations:** Get weather updates for cities all around the world.
- ⚡ **Real-time Updates:** Fetch live data using API integrations.
- 💡 **MERN Architecture:** Full-stack design allowing scalability and component reusability.

---

## 🛠️ Tech Stack

The application is primarily built using the following technologies:

### Front-End:
- **HTML** and **CSS** for structuring and styling.
- **React.js** for building dynamic user interfaces.
- **JavaScript** for the app's logic.

### Back-End:
- **Express.js** for routing.
- **Node.js** for server execution.

---

## 🧰 Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- A package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 🚀 Getting Started

Follow these steps to install, set up, and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yashrana23/MernStack-Weather-App-main.git
cd MernStack-Weather-App-main/weather-app
```

### 2. Install Dependencies

Navigate into both `frontend` and `backend` directories to install the respective dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory and configure it with your API keys. Example:

```env
PORT="backend port like 8000"
FRONTEND_URL="frontend port with url like http://localhost:3000"
WEATHER_API_URL="https://api.openweathermap.org/data/2.5/weather"
WEATHER_API_KEY="openweathermap api key"
```

Create a `src/utils/config.js` file in the `frontend` directory and configure it with your API keys. Example:

```env
export const BASE_URL =
  "base(backend) port with url like http://localhost:8000/api/v1";
```

### 4. Start the Application

Run the backend server and frontend development server in separate terminals:

```bash
# Start backend server
cd backend
npm start

# Start frontend server
cd ../frontend
npm start
```

---

## 🧩 Project Structure

Here’s a brief structure of the repository:

```plaintext
.
├── weather-app/           
│   ├── backend/           # Backend/server-side code
│   │   ├── .env.sample    # Environment variable template
│   │   ├── .gitignore
│   │   ├── assets/        # Static assets (if any)
│   │   ├── index.js       # Main backend server script
│   │   ├── package.json   # Backend dependencies
│   │   └── package-lock.json
│   │
│   ├── frontend/          # Frontend/client-side code
│   │   ├── .gitignore
│   │   ├── README.md      # Additional frontend documentation
│   │   ├── package.json   # Frontend dependencies
│   │   ├── package-lock.json
│   │   ├── public/        # Public static files
│   │   └── src/           # React source files
```

---

## 🌟 Contributing

Contributions are welcome! If you'd like to improve the app, follow these steps:

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Submit a pull request.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

### 📬 Contact

> If you have any questions or need further assistance, feel free to open an issue in the GitHub repository: [MERN Stack Weather App](https://github.com/yashrana23/MernStack-Weather-App-main).
