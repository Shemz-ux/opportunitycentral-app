# Opportunity Central

Opportunity Central is a talent development consultancy platform, helping organisations improve their talent pipeline and development.

## Tech Stack

### Frontend
- **React** 19.2.4 with Vite
- **React Router** 7.13.1
- **Tailwind CSS** 4.2.1
- **TipTap** (Rich text editor)
- **Lucide React** (Icons)

### Backend
- **Node.js** with Express 5.2.1
- **MongoDB** 7.1.1
- **JWT** Authentication
- **Cloudinary** (Image storage)
- **Nodemailer** (Email service)

## Project Structure

```
opportunitycentral-app/
├── frontend/          # React frontend application
├── backend/           # Express backend API
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shemz-ux/opportunitycentral-app.git
   cd opportunitycentral-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Admin Management

To manage admin users:
```bash
cd backend
npm run admin
```

## Development

- **Frontend Dev Server**: `npm run dev` (with hot reload)
- **Backend Dev Server**: `npm start` (with nodemon)
- **Linting**: `npm run lint` (frontend only)

## Security Notes

- `.env` files are gitignored and should never be committed
- Rotate all API keys and secrets regularly
- Use strong JWT secrets in production

## License

ISC
