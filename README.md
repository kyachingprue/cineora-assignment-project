# 🎬 Cineora — Movie & TV Series Explorer

> **Discover. Explore. Enjoy.**
> A modern, responsive movie and TV series discovery platform built with React and powered by the TVMaze API.

Cineora is a cinematic web application that allows users to explore TV series, search for their favorite shows, view detailed information, and discover new releases through a beautiful and responsive interface.

The project focuses on modern frontend development practices, reusable React components, responsive UI design, API integration, smooth animations, and route-based navigation.

---

## ✨ Features

### 🏠 Cinematic Home Page

* Beautiful hero section with featured series
* Dynamic background images
* Featured movie/series information
* Rating, genre, release date and runtime
* Smooth transitions and animations
* Quick access to explore more series

### 🔎 Smart Search

* Search TV series using the TVMaze API
* Debounced search experience
* Dynamic search results
* Search suggestions
* Search result cards with useful information
* Clear search functionality

### 🎞️ Movie & Series Explorer

* Responsive movie/series grid
* Reusable movie cards
* Poster images
* Ratings
* Genres
* Release dates
* Interactive hover effects
* Smooth card animations

### 📄 Dedicated Details Pages

Every movie/series has its own route-based details page.

```text
/movies/:movieId
```

For example:

```text
/movies/1
```

This means users can:

* Open a specific series
* View complete information
* Refresh the browser without losing the page
* Share the details page URL
* Navigate directly to a specific series

### 🎬 Detailed Series Information

Each details page includes:

* Large cinematic backdrop
* Poster
* Series title
* Rating
* Premiered date
* Runtime
* Language
* Genres
* Status
* Description
* TVMaze page link
* Official website link when available

### 📱 Fully Responsive

Cineora is designed to work smoothly across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

The layout automatically adapts to different screen sizes for a consistent user experience.

### 🎨 Modern UI

The interface includes:

* Dark cinematic theme
* Violet / pink gradient accents
* Glassmorphism effects
* Smooth hover interactions
* Motion animations
* Responsive navigation
* Modern typography
* Cinematic image overlays

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Vite**
* **JavaScript (ES6+)**
* **React Router**
* **Tailwind CSS**

### UI & Animation

* **Motion**
* **Lucide React**
* Responsive CSS
* CSS gradients
* Glassmorphism

### API

* **TVMaze API**

The application uses TVMaze to retrieve TV series information, including:

* Series data
* Search results
* Posters
* Ratings
* Genres
* Release dates
* Descriptions
* Official websites

---

## 📡 API Endpoints

Cineora communicates with the TVMaze API.

### Get All Shows

```text
GET https://api.tvmaze.com/shows
```

### Search Shows

```text
GET https://api.tvmaze.com/search/shows?q={query}
```

### Get Show Details

```text
GET https://api.tvmaze.com/shows/{id}
```

---

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── common/
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   └── NotFound.jsx
│   │
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── ExploreVideoSeries.jsx
│   │   └── NewReleaseVideo.jsx
│   │
│   └── movies/
│       ├── MovieCard.jsx
│       └── MovieCardDetails.jsx
│
├── layout/
│   └── MainLayout.jsx
│
├── router/
│   └── router.jsx
│
├── services/
│   └── tvmazeApi.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧭 Application Routes

| Route              | Description                   |
| ------------------ | ----------------------------- |
| `/`                | Home page                     |
| `/movies`          | Browse all movies & TV series |
| `/movies/:movieId` | Specific series details       |
| `*`                | 404 Not Found page            |

### Route-Based Details

Instead of opening details inside a temporary modal, Cineora uses dedicated URLs:

```text
/movies/1
/movies/2
/movies/3
```

This provides a better browsing experience because the details page remains available after refreshing the browser.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cineora.git
```

### 2. Navigate to the Project

```bash
cd cineora
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📦 Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🧩 Key Frontend Concepts Used

This project demonstrates several important React concepts:

* Functional Components
* React Hooks
* `useState`
* `useEffect`
* React Router
* Dynamic Routes
* API Integration
* Async/Await
* Debounced Search
* Conditional Rendering
* Reusable Components
* Props
* Responsive Design
* Error Handling
* Loading States
* Animation
* Component Composition

---

## 🔄 Application Flow

```text
                    ┌───────────────┐
                    │    Cineora    │
                    │    Home Page  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Explore Shows │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Movie Card  │
                    └───────┬───────┘
                            │
                     Details Button
                            │
                            ▼
                    ┌───────────────┐
                    │ /movies/:id   │
                    │ Details Page  │
                    └───────┬───────┘
                            │
                         Reload
                            │
                            ▼
                    ┌───────────────┐
                    │ Same Details  │
                    │     Page      │
                    └───────────────┘
```

---

## 🎯 Project Goals

The main goals of Cineora are to demonstrate:

1. Building a modern React application from scratch
2. Working with a real public API
3. Creating reusable and maintainable components
4. Implementing dynamic routing
5. Building responsive interfaces
6. Creating smooth and engaging animations
7. Handling loading and error states
8. Creating a polished real-world frontend project

---

## 🌟 Future Improvements

Some features that can be added in future versions:

* ❤️ Favorites / Watchlist
* 🔐 User authentication
* 🌙 Theme customization
* 🎭 Genre-based filtering
* 📊 Advanced sorting
* ⭐ User ratings
* 📺 Trailer integration
* 🔥 Trending series section
* 🕐 Recently viewed shows
* 💾 LocalStorage persistence
* 🔔 Notifications
* 📱 Progressive Web App support

---

## 🎨 Design Philosophy

Cineora follows a **cinematic dark UI** concept inspired by modern streaming platforms.

The interface focuses on:

> **Visual storytelling + simplicity + smooth interaction**

Large artwork, dark backgrounds, subtle gradients, glass effects, and motion animations are used to create an immersive entertainment experience while keeping the interface easy to navigate.

---

## 📸 Screenshots

Add your project screenshots here:

```text
screenshots/
├── home.png
├── movies.png
├── search.png
└── details.png
```

Example:

```md
![Cineora Home](./screenshots/home.png)

![Movie Explorer](./screenshots/movies.png)

![Movie Details](./screenshots/details.png)
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes and commit them:

```bash
git add .
git commit -m "Add new feature"
```

Push your branch:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project is created for educational and portfolio purposes.

Movie and TV series data is provided by the **TVMaze API**.

---

## 👨‍💻 Developer

**Kyachingprue Marma**

Frontend Developer focused on building modern, responsive, and user-friendly web applications with React and modern frontend technologies.

### Tech Interests

```text
React.js
JavaScript
Next.js
TypeScript
Tailwind CSS
Redux Toolkit
REST APIs
Responsive UI
Frontend Architecture
Modern Web Development
```

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

> **Cineora — Discover your next favorite series. 🎬**
