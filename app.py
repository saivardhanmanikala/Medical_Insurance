import numpy as np
from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
CORS(app, resources={r"/predict": {"origins": "*"}})  # Allow all origins for /predict


# Load the trained XGBoost model
model = pickle.load(open("model_sai.pkl", "rb"))

# Define a mapping for the 'region' categorical variable
region_mapping = {"northeast": 0, "northwest": 1, "southeast": 2, "southwest": 3}

# Define a mapping for the 'gender' categorical variable
gender_mapping = {"male": 0, "female": 1}

@app.route("/")
def home():
    return "🔥 Server is running! Use /predict for predictions."

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        age = data.get("age")
        bmi = data.get("bmi")
        isSmoker =1 if str(data.get("isSmoker")).lower() == "true" else 0

        region = data.get("region")
        children = data.get("children")
        gender = data.get("gender")

        # Check for missing values
        if None in [age, bmi, isSmoker, region, children, gender]:
            return jsonify({"error": "Missing values in input"}), 400

        # Convert region to numerical value
        if region not in region_mapping:
            return jsonify({"error": "Invalid region value"}), 400
        region_encoded = region_mapping[region]

        # Convert gender to numerical value
        if gender not in gender_mapping:
            return jsonify({"error": "Invalid gender value"}), 400
        gender_encoded = gender_mapping[gender]

        # Convert inputs into a format suitable for the model
        input_features = np.array([[age, bmi, int(isSmoker), region_encoded, children, gender_encoded]], dtype=np.float32)

        # Make prediction
        prediction = model.predict(input_features)

        # Convert NumPy float to native Python float
        premium = float(prediction[0])

        return jsonify({"predicted_premium": premium })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🔥 Server is running! Use /predict for predictions.")  
    app.run(debug=True)
