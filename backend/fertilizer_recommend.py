
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from google.generativeai.types.safety_types import HarmBlockThreshold, HarmCategory

class FertilizerRecommender:
    def __init__(self, api_key):
        self.api_key = api_key
        self.chat_model = self._initialize_model()

    def _initialize_model(self):
        safety_settings = {
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        }

        return ChatGoogleGenerativeAI(
            model="gemini-1.5-pro",
            google_api_key=self.api_key,
            temperature=0.3,
            safety_settings=safety_settings
        )

    def get_recommendations(self, data):
        # Build the environmental factors section only if data is provided
        env_factors = []
        if data.get('temperature'):
            env_factors.append(f"Temperature: {data['temperature']}°C")
        if data.get('humidity'):
            env_factors.append(f"Humidity: {data['humidity']}%")
        if data.get('moisture'):
            env_factors.append(f"Moisture: {data['moisture']}%")
        if data.get('soil_type'):
            env_factors.append(f"Soil Type: {data['soil_type']}")
            
        env_section = "- **Environmental Factors:** \n  " + "\n  ".join(env_factors) if env_factors else ""
        
        # Build the soil nutrients section only if data is provided
        nutrients = []
        if data.get('nitrogen'):
            nutrients.append(f"Nitrogen: {data['nitrogen']}")
        if data.get('phosphorus'):
            nutrients.append(f"Phosphorus: {data['phosphorus']}")
        if data.get('potassium'):
            nutrients.append(f"Potassium: {data['potassium']}")
            
        nutrients_section = "- **Soil Nutrient Levels:** \n  " + "\n  ".join(nutrients) if nutrients else ""
        
        composite_prompt = f"""
        You are an expert agronomist. Based on the given inputs, recommend the **top 5 fertilizers**:

        **Input Data:**
        - **Disease Identified:** {data['disease']}
        {env_section}
        {nutrients_section}

        **Task:**
        - Provide a list of the **top 5 fertilizers** suitable for treating or preventing this disease in brinjal plants.
        - Include **one short reason** for why each fertilizer is recommended.
        - Format response as:
          1️⃣ **Fertilizer Name** – Short Reason.
          2️⃣ **Fertilizer Name** – Short Reason.
          3️⃣ **Fertilizer Name** – Short Reason.
          4️⃣ **Fertilizer Name** – Short Reason.
          5️⃣ **Fertilizer Name** – Short Reason.
        """

        response = self.chat_model.invoke(composite_prompt)
        
        if hasattr(response, "content"):
            recommendation = response.content
        elif isinstance(response, dict) and "content" in response:
            recommendation = response["content"]
        else:
            recommendation = str(response)

        return recommendation.strip().split("\n")
