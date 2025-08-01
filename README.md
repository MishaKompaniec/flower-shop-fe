# Flower Shop Web App

## Project Overview

This is a small flower shop website. I implemented the logic for regular users: a home page, a shop page, a shopping cart, and a user profile.

I also implemented admin functionality: an admin panel that allows viewing and managing new orders, reviewing completed orders, as well as adding, editing, and deleting products in the shop.

The backend for this website was built using Node.js and Express.

- **Shopping Cart**: Implemented using React Context API with data persistence via `localStorage`.
- **Routing**: Handled through React Router for seamless navigation between pages.
- **UI & Styling**: Built with Ant Design (antd) component library and styled-components for custom styling.
- **Responsive Design**: Fully responsive across all screen sizes (desktops, laptops, tablets, and mobile devices).
- **Internationalization**: Supports English, Russian, and Ukrainian using `i18next`.
- **Code Quality**: Maintained with ESLint and Husky for consistent code standards and pre-commit checks.

> **Note**: The UI design is provisional and was created iteratively during development.

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Routing**: React Router
- **Data Fetching**: RTK Query
- **State Management**: React Context API + `localStorage`
- **UI Components**: Ant Design (antd)
- **Styling**: styled-components
- **Internationalization**: i18next
- **Linting & Hooks**: ESLint, Husky
- **Package Manager**: npm

## Getting Started

To run the project locally:

```bash
npm install
npm run dev
```
