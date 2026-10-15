Modiriyat-Yar | Management Platform

A full-stack management platform built to demonstrate modern frontend development, backend API design, authentication, and CRUD operations. The interface is primarily in Persian (Farsi), with support for English.

OVERVIEW

Modiriyat-Yar is a web application designed to bring business information and management tools together in one place. It combines a responsive user interface with a Django REST API to provide a structured foundation for managing content and communicating with users.

FEATURES

- Responsive interface — Designed for desktop and mobile screens.
- Authentication — User registration, login, and protected areas.
- User dashboard — A dedicated space for user-related functionality.
- Admin dashboard — Management tools for application content.
- Project management — Create, view, update, and delete projects.
- Service management — Manage service information and content.
- Blog management — Organize and manage blog posts.
- Contact form — Submit messages through the backend API.
- Image uploads — Support for project and content images.
- REST API — Frontend and backend communicate through Django REST Framework.

TECH STACK

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

Backend:
- Python
- Django
- Django REST Framework
- Token-based authentication
- SQLite for development
  

GETTING STARTED

Prerequisites

Make sure you have the following installed:
- Python 3.10 or newer
- Node.js and npm
- Git

1. Clone the Repository

git clone https://github.com/AbolfazlFaraji87/modiriat-yar.git
cd modiriat-yar

2. Set Up the Backend

cd back-end
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

The Django development server will usually be available at http://127.0.0.1:8000/.

3. Set Up the Frontend

Open a second terminal:

cd front-end
npm install
npm run dev

Vite will display the local frontend URL in your terminal.

CONFIGURATION

Configure the Django secret key, allowed hosts, CORS settings, and frontend API URL as appropriate for your environment before running or deploying the application.

DEVELOPMENT NOTES

This project was developed as a practical full-stack learning and portfolio project, with an emphasis on connecting a React frontend to a Django REST API.

The local development setup may require environment-specific configuration. Uploaded media and local database records may not be included in the repository.


LICENSE
No license has been specified yet. All rights remain with the author unless a license is added to this repository
