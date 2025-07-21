
# Trackfolio

**Trackfolio** is a modular, backend-focused portfolio tracker built with Django and Django REST Framework.  
It supports user authentication, asset management, and holding tracking through a clean RESTful API design.

---

## 🔐 Authentication

Trackfolio uses **JWT-based authentication** via `SimpleJWT` to securely manage user access:

### Auth Endpoints:
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/api/auth/register/` | Register a new user            |
| POST   | `/api/auth/login/`    | Obtain access and refresh token |
| POST   | `/api/auth/logout/`   | Invalidate user session (token blacklist) |
| POST   | `/api/auth/token/refresh/` | Refresh JWT token           |

- JWT access tokens are used for all protected endpoints.
- Authentication headers must include: `Authorization: Bearer <token>`

---

## 🧩 Core API Endpoints

### Users:
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/api/users/me/`     | Get current user profile   |
| PATCH  | `/api/users/me/`     | Update profile details     |

---

### Assets:
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| GET    | `/api/assets/`      | List all assets                     |
| POST   | `/api/assets/`      | Create a new asset                  |
| GET    | `/api/assets/:id/`  | Retrieve a specific asset           |
| PATCH  | `/api/assets/:id/`  | Update asset information            |
| DELETE | `/api/assets/:id/`  | Delete an asset                     |

---

### Holdings:
| Method | Endpoint              | Description                         |
|--------|-----------------------|-------------------------------------|
| GET    | `/api/holdings/`      | List user holdings                  |
| POST   | `/api/holdings/`      | Create a new holding                |
| GET    | `/api/holdings/:id/`  | Get details of a specific holding  |
| PATCH  | `/api/holdings/:id/`  | Update holding information          |
| DELETE | `/api/holdings/:id/`  | Delete a holding                    |

---

## 🛠️ Tech Stack

- Django
- Django REST Framework
- PostgreSQL / SQLite
- SimpleJWT (Authentication)
- Git + Git Bash
- Modular app structure

---

## 🚀 Status

This project is under active development.  
Planned next steps:
- Filtering and search on assets/holdings
- Dashboard endpoints for aggregated stats
- Frontend integration (Next.js / React)

---

## 📦 Setup (Local)

```bash
# Clone repo
git clone https://github.com/your-username/trackfolio.git
cd trackfolio

# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Migrate and run
python manage.py migrate
python manage.py runserver
```

---

Made with 💻 by David
