
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
    
    # Get API key and validate it exists
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables. Please set it in .env file.")
    
    disease_predictor = DiseasePredictor(MODEL_PATH)
    disease_predictor.load_model()
    fertilizer_recommender = FertilizerRecommender(api_key)

try:
    # Initialize models at startup
    initialize_models()
except Exception as e:
    print(f"Error during initialization: {str(e)}")
    print("Please ensure you have:")
    print("1. Created a .env file in the backend directory")
    print("2. Added your Google API key to the .env file like this: GOOGLE_API_KEY=your_api_key_here")
    exit(1)

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
        
        # Only 'disease' is required, everything else is optional
        if 'disease' not in data or not data['disease'].strip():
            return jsonify({
                'error': 'Missing required field: disease',
                'success': False
            }), 400
        
        # Proceed with valid data
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
