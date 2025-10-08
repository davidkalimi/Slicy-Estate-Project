🏡 Slicy Estate – Micro Real Estate Investment Platform
A fullstack MVP enabling fractional property investment through a streamlined interface and secure backend.

🚀 Tech Stack
Area	Technology
Frontend	Next.js (App Router), TypeScript, Tailwind CSS, React Query, shadcn/ui
Backend	Django 4.x, Django REST Framework, JWT Auth
API Docs	Swagger via drf-yasg
Auth	JWT (access & refresh)
📁 Project Structure
slicy-estate/ ├── slicy-estate-frontend/ # React UI with Auth, Properties, Investments ├── slicy-estate-backend/ # Django API with Users, Properties, Investments

yaml Copy Edit

🧪 Running Locally
Backend
cd slicy-estate-backend
source venv/bin/activate
python manage.py runserver
Frontend
bash
Copy
Edit
cd slicy-estate-frontend
npm install
npm run dev
🔐 Authentication Flow
POST /api/register/ – Create new user

POST /api/token/ – Login to get access/refresh

POST /api/token/refresh/ – Renew expired access token

JWTs stored in localStorage

Axios client auto-attaches access token

📦 Current Features
🔑 JWT Authentication + Registration

🏘️ List Available Properties (GET /api/properties/available/)

💸 Invest in Properties (POST /api/investments/)

📈 View User Portfolio (GET /api/investments/my/)

🧠 Query Management with React Query

🎨 Responsive UI with Tailwind + shadcn

🔧 Dev Tips
Set NEXT_PUBLIC_API_BASE_URL in slicy-estate-frontend/.env.local

Use Swagger at http://127.0.0.1:8000/swagger/

Tokens saved to localStorage under accessToken, refreshToken
