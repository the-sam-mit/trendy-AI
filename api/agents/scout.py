import json
from datetime import datetime
import pytz
from api.utils.gemini import get_gemini_model

class ChronoStrategist:
    def __init__(self):
        self.model = get_gemini_model()

    def analyze_trends(self, niche: str, audience: str):
        prompt = f"""
        You are the Trend Scout (Chrono-Strategist). Your job is to analyze the niche '{niche}' for the audience '{audience}'.
        
        GOAL: Identify the top 3 high-impact trends in the last 12 hours and predict the optimal posting time.
        
        INSTRUCTIONS:
        1. Identify the 'Wave' - where is the attention underpriced?
        2. Predict the audience's primary region (default to US-East if unclear).
        3. Calculate the 'Golden Hour' (best time to post) for that region.
        4. Convert that Golden Hour to IST (India Standard Time).
        
        Output a JSON object with:
        {{
            "trends": [
                {{"name": "Trend 1", "sentiment": "Positive/Negative/Chaotic", "why_now": "Reason"}},
                ...
            ],
            "region": "Predicted Region",
            "golden_hour_local": "9 AM",
            "golden_hour_ist": "7:30 PM",
            "strategy": "Core narrative strategy"
        }}
        
        Return ONLY valid JSON.
        """
        
        response = self.model.generate_content(prompt)
        # Cleanup JSON formatting if model adds markdown blocks
        clean_text = response.text.replace('```json', '').replace('```', '').strip()
        try:
            return json.loads(clean_text)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return {{"error": "Failed to parse trend report"}}

def get_scout():
    return ChronoStrategist()
