# PawMatch

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)

## Technologies

- **React** – A JavaScript library for building user interfaces.
- **TypeScript** – Superset of JavaScript that adds static types.
- **Tailwind CSS** – Utility-first CSS framework.
- **Axios** – Promise based HTTP client for the browser.
- **ShadCN** – UI components for React.

## Project Structure

A typical project directory looks like this:

```
/public
  index.html      // Main HTML file.
/src
  /assets
  /components
    /ui             // Shared UI components.
    /custom         // Custom components specific to this project.
  /config
    api.ts          // Axios API setup including endpoints and interceptors.
    constants.ts    // Global constants used across the app.
  /contexts
    AuthContext.tsx // Context for authentication state.
    ThemeContext.tsx // Context for theme state.
    FilterContext.tsx // Context for filter state.
    SelectedDogsContext.tsx // Context for selected dogs state.
  /hooks
  /pages
    login.tsx       // Login page.
    dashboard.tsx    // Dashboard page.
    dogs.tsx         // Dogs page.

- vite.config.ts    // Configures Vite (includes alias and proxy settings).
- postcss.config.js // Configures PostCSS plugins including Tailwind CSS and autoprefixer.
- tailwind.config.js// Tailwind CSS custom theme and plugins configuration.
- eslint.config.js  // ESLint configuration with React and TypeScript rules.
- README.md         // This readme file.
```

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**
```bash
git clone <repository-url>
```

2. **Navigate to the Project Directory:**
```bash
cd <project-directory>
```

3. **Install Dependencies:**

Using npm:
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

4. **Configure Environment Variables:**

Create a `.env` file in the project root with the following:

```bash
VITE_API_BASE_URL=https://frontend-take-home-service.fetch.com
```