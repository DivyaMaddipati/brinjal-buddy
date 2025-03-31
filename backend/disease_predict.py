
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import os

class DiseasePredictor:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = None
        self.class_labels = [
            "Healthy Leaf",
            "Insect Pest Disease",
            "Leaf Spot Disease",
            "Mosaic Virus Disease",
            "Small Leaf Disease",
            "White Mold Disease",
            "Wilt Disease"
        ]

    def load_model(self):
        self.model = load_model(self.model_path)

    def predict_image(self, image_file):
        # Save the uploaded file temporarily
        temp_path = "temp_image.jpg"
        image_file.save(temp_path)
        
        try:
            # Process the image
            img = load_img(temp_path, target_size=(224, 224))
            img_array = img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            
            # Make prediction
            prediction = self.model.predict(img_array)
            predicted_class = np.argmax(prediction[0])
            
            return self.class_labels[predicted_class]
        finally:
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)
