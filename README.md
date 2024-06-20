# Asset Tracker

## Overview

Asset Tracker is a web application designed to help organizations keep track of their assets efficiently. Built using Vite and React, the application provides a seamless and responsive user experience, allowing users to add, update, and manage assets with ease.

## Features

- **Add Assets:** Easily add new assets with relevant details.
- **Update Assets:** Modify asset information as needed.
- **Delete Assets:** Remove assets that are no longer needed.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v14 or higher
- **Yarn**: v1.22 or higher

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/System-and-Network-Security-Group/Asset-tracker.git
   cd asset-tracker
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

3. **Start the development server:**
   ```sh
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn serve`: Serves the production build locally.
- `yarn lint`: Runs the linter to check for code quality issues.
- `yarn format`: Formats the code using Prettier.

## Project Structure

```
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── _mock
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── layouts
│   │   └── dashboard
│   ├── pages
│   ├── routes
│   ├── sections
│   ├── theme
│   ├── utils
│   ├── app.jsx
│   ├── createUsers.js
│   ├── global.css
│   ├── main.jsx
│   └── ...
├── .gitignore
├── package.json
├── yarn.lock
├── README.md
├── vite.config.js
└── ...
```

- **public/**: Static assets (e.g., HTML file, images).
- **src/**: Source code for the application.
  - **_mock/**: Mock data for testing.
  - **assets/**: Images, fonts, and other static resources.
  - **components/**: Reusable React components.
  - **hooks/**: Custom React hooks.
  - **layouts/dashboard/**: Layout components for the dashboard.
  - **pages/**: Page-level components.
  - **routes/**: Application routes.
  - **sections/**: Page sections/components.
  - **theme/**: Theming and styling files.
  - **utils/**: Utility functions.
  - **app.jsx**: Root component.
  - **createUsers.js**: Script to create user data.
  - **global.css**: Global CSS styles.
  - **main.jsx**: Entry point for the React application.

## Configuration

### Vite Configuration

The Vite configuration file (`vite.config.js`) can be customized to suit your needs. Refer to the [Vite documentation](https://vitejs.dev/config/) for more details.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes.**
4. **Commit your changes:**
   ```sh
   git commit -m 'Add some feature'
   ```
5. **Push to the branch:**
   ```sh
   git push origin feature/your-feature-name
   ```
6. **Create a pull request.**

