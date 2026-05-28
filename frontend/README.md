# Health Prediction Application

A full-stack Health Prediction Application built using React.js, Flask, and SQLite.
The application allows users to manage patient blood test records and predict possible health risks based on blood test values.

---

# Features

* Add Patient Records
* View Patient Records
* Update Patient Records
* Delete Patient Records
* AI-based Health Prediction
* Responsive Modern UI
* SQLite Database Integration
* Form Validation
* Gender Selection
* Health Risk Remarks Generation

---

# Technologies Used

## Frontend

* React.js
* Bootstrap
* CSS

## Backend

* Python
* Flask
* Flask-CORS
* Flask-SQLAlchemy

## Database

* SQLite

---

# Health Prediction Logic

The application predicts possible health risks based on:

| Parameter         | Condition          |
| ----------------- | ------------------ |
| Glucose > 140     | High Diabetes Risk |
| Glucose < 70      | Low Blood Sugar    |
| Haemoglobin < 12  | Possible Anemia    |
| Haemoglobin > 17  | High Haemoglobin   |
| Cholesterol > 200 | Heart Disease Risk |
| Cholesterol < 125 | Low Cholesterol    |

Multiple conditions can be detected together.

---

# Project Structure

health-prediction-app/

├── backend/

│ ├── app.py

│ ├── patients.db

│ └── venv/

│

├── frontend/

│ ├── src/

│ │ ├── images/

│ │ ├── App.js

│ │ ├── App.css

│ │

│ └── package.json

│

└── README.md

---

# Installation Steps

## Backend Setup

### Navigate to backend folder

```bash
cd backend
```

### Create virtual environment

```bash
python -m venv venv
```

### Activate virtual environment

#### Windows

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install flask flask-cors flask-sqlalchemy
```

### Run backend server

```bash
python app.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

# Frontend Setup

### Navigate to frontend folder

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Start React application

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# API Endpoints

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /patients     | Get all patients |
| POST   | /patients     | Add patient      |
| PUT    | /patients/:id | Update patient   |
| DELETE | /patients/:id | Delete patient   |

---

# User Interface Features

* Modern healthcare dashboard UI
* Glassmorphism design
* Responsive layout
* Background healthcare theme
* Risk badges
* Hover effects

---

# Future Improvements

* Authentication System
* PDF Report Generation
* Real AI/ML Model Integration
* Search & Filter
* Charts and Analytics
* Cloud Deployment

---

# Author

Rakshitha K
