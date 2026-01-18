# Rest-Mock-Proxy

A lightweight, TypeScript-powered development tool that acts as both a **Mock Server** and a **Reverse Proxy**.

This tool is specifically designed to unblock UI development by allowing developers to intercept specific API calls with static "stubs" while forwarding all other requests to a real backend environment.

## 🚀 Features

- **Hybrid Mock/Proxy**: Define custom routes to mock specific endpoints, and let everything else flow through to your actual API.
- **Deep Visibility**: Automatically logs incoming request bodies and outgoing response bodies (pretty-printed) for easy debugging.
- **TypeScript First**: Fully typed for a robust development experience.
- **CORS Enabled**: Pre-configured to handle Cross-Origin Resource Sharing, making it easy to use with local React/Vue/Angular development.
- **Hot Reloading**: Uses `tsx` to instantly restart the server whenever you save a file.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## ⚙️ Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following properties:

   ```env
   # The port this tool will run on locally
   PORT=3000

   # The URL of the real backend API you want to proxy to
   TARGET_URL=http://localhost:8080
   ```

## 🏃 Running the Project

### Development Mode
Runs the server with hot-reloading (auto-restarts on save):
```bash
npm run dev
```

## 📁 Project Structure

- **src/index.ts**: The main entry point and proxy configuration.
- **src/register-custom-routes.ts**: The hub where you register your mock endpoints.
- **src/routes/**: Directory where individual mock routers are defined (e.g., test-router.ts).

## 🧪 Usage Example

If you define a GET mock for /test in your test-router.ts but no POST mock:

- GET http://localhost:3000/test → Returns your Mock Data.
- POST http://localhost:3000/test → Forwards the request to http://localhost:8080/test.