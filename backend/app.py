
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load trained model
MODEL_PATH = "model/leaf_disease_resnet50.h5"
model = None

def load_trained_model():
    global model
    model = load_model(MODEL_PATH)

def predict_image(image_file):
    # Save the uploaded file temporarily
    temp_path = "temp_image.jpg"
    image_file.save(temp_path)
    
    # Process the image
    img = load_img(temp_path, target_size=(224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    # Make prediction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    
    # Clean up
    os.remove(temp_path)
    
    class_labels = [
        "Healthy Leaf",
        "Insect Pest Disease",
        "Leaf Spot Disease",
        "Mosaic Virus Disease",
        "Small Leaf Disease",
        "White Mold Disease",
        "Wilt Disease"
    ]
    
    return class_labels[predicted_class]

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        image_file = request.files['image']
        prediction = predict_image(image_file)
        return jsonify({
            'prediction': prediction,
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
