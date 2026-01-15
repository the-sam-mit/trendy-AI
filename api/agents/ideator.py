import json
from api.utils.gemini import get_gemini_model

class HookMaster:
    def __init__(self):
        self.model = get_gemini_model()

    def generate_hooks(self, strategy_brief: dict):
        prompt = f"""
        You are the Hook Master. You take a Strategy Brief and generate 5 distinct 'Entry Points' (Hooks).
        
        STRATEGY BRIEF:
        {json.dumps(strategy_brief, indent=2)}
        
        YOUR FRAMEWORKS:
        1. The Contrarian: 'Everyone thinks X, but they are actually doing Y.'
        2. The Data-Drop: 'We analyzed 10,000 posts and the result is terrifying.'
        3. The Personal Story: 'I lost $50k learning this one lesson.'
        4. The "How-To" Loop: 'How to achieve X without doing Y.'
        5. The Curiosity Gap: 'There's a secret reason why X is happening...'
        
        CONSTRAINTS:
        - No hashtags in hooks.
        - No emojis in the first sentence.
        - Maximum 80 characters per hook.
        
        Output a JSON object with:
        {{
            "hooks": [
                {{"id": 1, "text": "Hook 1 text", "type": "Contrarian"}},
                ...
            ]
        }}
        
        Return ONLY valid JSON.
        """
        
        response = self.model.generate_content(prompt)
        clean_text = response.text.replace('```json', '').replace('```', '').strip()
        try:
            return json.loads(clean_text)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return {{"error": "Failed to generate hooks"}}

def get_ideator():
    return HookMaster()
