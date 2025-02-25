
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from disease_predict import DiseasePredictor
from fertilizer_recommend import FertilizerRecommender
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize predictors
MODEL_PATH = "model/leaf_disease_resnet50.h5"
disease_predictor = None
fertilizer_recommender = None

def initialize_models():
    global disease_predictor, fertilizer_recommender
    disease_predictor = DiseasePredictor(MODEL_PATH)
    disease_predictor.load_model()
    fertilizer_recommender = FertilizerRecommender(os.getenv('GOOGLE_API_KEY'))

# Initialize models at startup
initialize_models()

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({
            'error': 'No image provided',
            'success': False
        }), 400
    
    try:
        image_file = request.files['image']
        prediction = disease_predictor.predict_image(image_file)
        return jsonify({
            'prediction': prediction,
            'success': True
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
