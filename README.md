# Medical_Insurance

🏥 Medical Health Insurance Cost Estimator
A machine learning-powered web application that estimates health insurance premiums based on user inputs like age, BMI, smoking status, and more. Built as a final-year project by the Bapatla Engineering College Batch B1 (CSE Dept.), it combines XGBoost, Flask, and a modern, responsive frontend to make premium predictions fast, accurate, and user-friendly.

<!-- Optional: Add screenshot of your UI -->

📌 Table of Contents
🔍 Project Overview

🚀 Features

🛠️ Tech Stack

📊 Model Details

🌐 Frontend Highlights

⚙️ Installation & Usage

📁 Project Structure

🙋 Team

📜 License

🔍 Project Overview
Health insurance premiums can vary drastically depending on a person’s profile. Our goal was to build a predictive tool that uses real-world data to estimate the cost of medical insurance and present it with an intuitive and responsive web interface.

This project was developed as part of the B.Tech final year curriculum under the mentorship of Mr. N. Srikanth, Assistant Professor, CSE Dept.

🚀 Features
✅ Premium cost prediction using trained XGBoost model

🧑‍⚕️ Inputs: Age, Gender, BMI, Children, Smoker, Region

📈 91% prediction accuracy on test data

🎨 Responsive, modern UI with:

Light/Dark mode toggle 🌗

Personalized greetings 👋

Clean navbar with smooth scroll

Chart components and animated feedback

📱 Mobile + Desktop support

🛠️ Tech Stack
👨‍💻 Machine Learning
Python

XGBoost

Pandas, NumPy

Scikit-learn

joblib

🌐 Backend
Flask

REST API

model.pkl integration

🎨 Frontend
HTML5, CSS3

Bootstrap / Tailwind CSS

JavaScript

Responsive design

📊 Model Details
Model used: XGBoostRegressor

Dataset: Cleaned version of the Kaggle Medical Cost dataset

Target: charges (Insurance cost)

Input Features:

age

sex

bmi

children

smoker

region

Accuracy: 91% (R² Score)

🌐 Frontend Highlights
Designed from scratch using Bootstrap 5 (optionally Tailwind supported)

Responsive layout with:

Navbar

Hero section with project intro

Form for input fields

Result section styled with cards and charts

Includes Dark Mode Toggle

Personalized messages like "Hey there, non-smoker! Here's your quote." 😄

⚙️ Installation & Usage
🔧 Requirements
Make sure you have these installed:

Python 3.9+

pip

virtualenv (recommended)

📦 Setup (Local)
bash
Copy
Edit
# Clone the repository
git clone https://github.com/your-username/Medical_Insurance.git
cd health-insurance-estimator

# Create virtual environment and activate
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask app
python app.py

# App will be running at http://127.0.0.1:5000
🌍 Access in browser
bash
Copy
Edit
http://127.0.0.1:5000
🙋 Team
Batch B1 – Bapatla Engineering College (2025)
Department of Computer Science and Engineering

👨‍💻 Sai Vardan Manikala

👩‍💻 M. Naga Supraja

👨‍💻 K. Durga Manohar Reddy

👨‍💻 K. Sekhar Venkata Prasad

Guided by: Mr. N. Srikanth

📜 License
This project is licensed under the MIT License.
Feel free to use, modify, or contribute! ⭐


💬 Want to Contribute?
PRs are welcome! If you find a bug or want to improve the design, feel free to fork and raise an issue or pull request.
