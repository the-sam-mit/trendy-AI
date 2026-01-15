import json
from api.utils.gemini import get_gemini_model

class CringeDetector:
    def __init__(self):
        self.model = get_gemini_model()

    def review_content(self, drafts: dict):
        prompt = f"""
        You are the Cringe-Detector. Your sole purpose is to destroy content that sounds like a robot wrote it.
        
        DRAFTS TO REVIEW:
        {json.dumps(drafts, indent=2)}
        
        YOUR CHECKLIST:
        1. Does it sound like a LinkedIn Guru? (Mark as Cringe).
        2. Does it use excessive emojis? (Delete them).
        3. Is the tone too 'perfect'? (Add deliberate imperfection or slang).
        4. Does it use 'AI-isms' like 'Delve', 'Unleash', 'Tapestry', 'In today's fast-paced world'?
        
        Output a JSON object with:
        {{
            "cringe_score": 1, # 1-10
            "critique": "Specific feedback on what to change",
            "passed": true, # true if score < 4
            "polished_drafts": {{ ... }} # The drafts with minor 'AI-isms' removed
        }}
        
        Return ONLY valid JSON.
        """
        
        response = self.model.generate_content(prompt)
        clean_text = response.text.replace('```json', '').replace('```', '').strip()
        try:
            return json.loads(clean_text)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return {{"error": "Failed to review content"}}

def get_editor():
    return CringeDetector()
