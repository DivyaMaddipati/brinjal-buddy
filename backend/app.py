
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import os
from fertilizer_recommend import FertilizerRecommender
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load trained model
MODEL_PATH = "model/leaf_disease_resnet50.h5"
model = None
fertilizer_recommender = None

def load_trained_model():
    global model, fertilizer_recommender
    model = load_model(MODEL_PATH)
    fertilizer_recommender = FertilizerRecommender(os.getenv('GOOGLE_API_KEY'))

def predict_image(image_file):
    # ... keep existing code for predict_image function

@app.route('/predict', methods=['POST'])
def predict():
    # ... keep existing code for predict endpoint

@app.route('/recommend-fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        data = request.json
        required_fields = ['disease', 'temperature', 'humidity', 'moisture', 
                         'soil_type', 'nitrogen', 'phosphorus', 'potassium']
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'error': f'Missing required field: {field}',
                    'success': False
                }), 400

        recommendations = fertilizer_recommender.get_recommendations(data)
        return jsonify({
            'recommendations': recommendations,
            'success': True
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.before_first_request
def initialize():
    load_trained_model()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
