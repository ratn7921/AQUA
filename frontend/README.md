```markdown
# 🌊 AquaWeb – Frontend (React.js)

AquaWeb is a **citizen‑science web application** for marine biodiversity awareness and whale‑watching activities. This repository contains the **frontend** built with **React.js**, consuming the AquaWeb backend APIs to provide an intuitive, responsive user experience.

---

## 📦 Tech Stack

- **React.js** (with Create React App)  
- **React Router v6** – Client‑side routing  
- **Context API & Hooks** – State management  
- **Axios** – HTTP requests  
- **Tailwind CSS** – Utility‑first styling  
- **Leaflet** – Interactive maps for tracking trips & sightings  
- **Jest + React Testing Library** – Unit & integration tests  

---

## 📁 Project Structure

```

frontend/
├── public/                   # Static assets (favicon, index.html)
├── src/
│   ├── assets/               # Images, icons, fonts
│   ├── components/           # Reusable UI components
│   │   ├── Auth/             # Login/Register forms
│   │   ├── Map/              # Map container, markers
│   │   ├── Navbar/           # Top navigation bar
│   │   ├── SightingCard/     # Display individual sighting
│   │   └── …
│   ├── contexts/             # React Context providers (AuthContext, TripContext)
│   ├── hooks/                # Custom hooks (useAuth, useFetch)
│   ├── pages/                # Route components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Dashboard.jsx     # User dashboard (trips, sightings)
│   │   ├── Trip.jsx          # Trip detail & real‑time tracking
│   │   ├── Sightings.jsx     # All submitted sightings
│   │   ├── Incidents.jsx     # Marine incident reports
│   │   └── Species.jsx       # Species catalog
│   ├── services/             # API modules (auth.js, trips.js, sightings.js)
│   ├── styles/               # Tailwind config & global styles
│   ├── utils/                # Helpers (formatters, validators)
│   ├── App.jsx               # Root component with routes
│   ├── index.jsx             # React entry point
│   └── setupTests.js         # Jest + RTL setup
├── .env                      # Environment variables (not committed)
├── package.json
└── README.md                 # ← you are here

````

---

## 🔐 Environment Variables

Create a file named `.env` in the `frontend/` root:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAPBOX_TOKEN=your_mapbox_token   # if using Mapbox tiles
````

> **Note:** Restart the dev server after changing `.env`.

---

## 🚀 Getting Started

```bash
cd frontend
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) and proxy API calls to `REACT_APP_API_URL`.

---

## 🛠️ Available Scripts

* **`npm start`**
  Starts the development server.

* **`npm run build`**
  Bundles the app for production into the `build/` folder.

* **`npm test`**
  Launches Jest in watch mode.

* **`npm run lint`**
  Runs ESLint for code quality checks.

---

## 🔗 Sample Routes & Features

| Route            | Description                               |
| ---------------- | ----------------------------------------- |
| `/`              | Landing page & project overview           |
| `/login`         | User login                                |
| `/register`      | New user registration                     |
| `/dashboard`     | Overview of your trips & recent sightings |
| `/trips/:tripId` | Real‑time tracking, start/end trip        |
| `/sightings`     | Browse all submitted sightings            |
| `/incidents`     | Report & view marine incidents            |
| `/species`       | Marine species catalog with details       |

---

## 🧪 Testing & Coverage

```bash
npm test -- --coverage
```

Coverage reports will be generated under `coverage/`. Open `coverage/lcov-report/index.html` in your browser to inspect.

---

## 🎨 Styling

This project uses **Tailwind CSS**. To customize the theme, edit `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oceanBlue: "#1CA7EC",
        deepTeal:  "#14556A",
        foamWhite: "#F0F8FF",
      },
    },
  },
  plugins: [],
};
```

---

## 🧭 Deployment

1. Build the production bundle:

   ```bash
   npm run build
   ```
2. Serve the `build/` folder with your favorite static‑file server (e.g. `serve`, Netlify, Vercel).

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add awesome feature"`
4. Push to branch: `git push origin feat/my-feature`
5. Open a Pull Request

Please follow the existing **code style**, write **unit tests**, and ensure **CI passes**.

---

## 🧠 Credits

Built with ❤️ by [Ratnakar Yadav](https://github.com/ratn7921)
Based on the research project “Aqua: Leveraging Citizen Science to Enhance Whale‑Watching Activities and Promote Marine‑Biodiversity Awareness.”

```
```
