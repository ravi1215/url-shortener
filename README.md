# URL Shortener

A simple URL shortener built with **React**, **Express**, **MongoDB**, and **Tailwind CSS**. It allows users to shorten any URL and generates a QR code for easy access.

## Features
- ⚡ Shorten URLs instantly
- 🎯 Generate QR codes automatically
- 📱 Responsive design with Tailwind CSS
- 🔗 Copy shortened links with one click

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **QR Code Generation**: `qrcode` library
- **Deployment**: Vercel (Frontend), Render (Backend)

## Installation

### Clone the repository
```bash
git clone https://github.com/ravi215/url-shortener.git
cd url-shortener
```

### Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
DATABASE_URL=your-mongodb-connection-string
BACKEND_URL=http://localhost:3000
PORT=3000
```

Run the backend server:
```bash
npm start
```

### Setup Frontend
```bash
cd frontend/my-react-app
npm install --registry https://registry.npmjs.org/
```

Create a `.env` file in the frontend folder:
```
VITE_API_URL=http://localhost:3000
```

Run the frontend dev server:
```bash
npm run dev
```

## Project Structure
```
url-shortener/
├── backend/
│   ├── index.js (Express server)
│   ├── package.json
│   └── .env (environment variables)
├── frontend/
│   └── my-react-app/
│       ├── src/
│       │   └── App.jsx (Main React component)
│       ├── package.json
│       └── .env (environment variables)
└── README.md
```

## API Endpoints

### POST `/api/short`
Create a shortened URL
```json
{
  "originalUrl": "https://www.example.com/very/long/url"
}
```

Response:
```json
{
  "message": "URL Generated",
  "shortUrl": "http://localhost:3000/abc12345",
  "qrCodeImg": "data:image/png;base64,..."
}
```

### GET `/:shortUrl`
Redirect to original URL
- Increments click counter
- Redirects to original URL

## Deployment

### Frontend (Vercel)
- Push to GitHub
- Connect repository to Vercel
- Set `VITE_API_URL` environment variable

### Backend (Render)
- Push to GitHub
- Connect repository to Render
- Set `DATABASE_URL` and `BACKEND_URL` environment variables

## Usage
1. Open the app in your browser
2. Paste your long URL
3. Click "Generate Short URL"
4. Copy the shortened link or scan the QR code
5. Share with others!

## Fast • Secure • Simple
