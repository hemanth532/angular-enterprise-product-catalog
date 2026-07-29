# Enterprise Product Catalog (Angular)

This project is a sample Angular application built with Angular Material, Signals, and a public product API.

## What this project includes

- Angular application shell with Material UI components
- Product list page loading data from `https://fakestoreapi.com/products`
- Signal-based state tracking in service and component
- Loading and error handling UI
- Unit tests for both service and component
- Strict TypeScript, ESLint, and Karma test configuration

## How to use it

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the application:
   ```bash
   npm start
   ```
3. Run unit tests:
   ```bash
   npm test
   ```
4. Build production bundle:
   ```bash
   npm run build
   ```

> Note: This project was generated for Angular 22 and requires Node.js `24.15.0` or newer.

## Key features

- `AppComponent` provides the application shell and toolbar.
- `ProductService` fetches product data and manages loading and error state.
- `ProductListComponent` renders product cards with Material styles.
- Signals are used to keep state reactive and simple.

## Why use this project

This app demonstrates a modern enterprise Angular setup with:

- strong typing and strict compile settings
- single responsibility by separating services, models, and UI components
- reusable Material design patterns
- adequate test coverage for business behavior

## File names and purpose

The companion document `project-files-explanation.md` explains every file and important Angular concepts in detail.
