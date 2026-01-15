import json
from api.utils.gemini import get_gemini_model

class PlatformChameleon:
    def __init__(self):
        self.model = get_gemini_model()

    def draft_content(self, selected_hook: str, strategy_brief: dict):
        prompt = f"""
        You are the Platform Chameleon. You take a winning HOOK and a STRATEGY BRIEF and create native content for 3 platforms.
        
        HOOK: {selected_hook}
        STRATEGY BRIEF: {json.dumps(strategy_brief, indent=2)}
        
        PLATFORMS & DIALECTS:
        1. X (Twitter): A 5-8 tweet thread. Use cliffhangers. End with a call to conversation.
        2. LinkedIn: Professional but punchy. Use double-spacing (Broetry). Focus on a 'Business Lesson'.
        3. Reddit: Raw, skeptical, and self-deprecating. Focus on asking a deep question.
        
        CONSTRAINTS:
        - Never use: 'Delve', 'Unlock', 'Tapestry', 'Masterclass'.
        - Keep sentences short.
        
        Output a JSON object with:
        {{
            "x": {{
                "content": "Thread content...",
                "visual_prompt": "Midjourney prompt..."
            }},
            "linkedin": {{
                "content": "Post content...",
                "visual_prompt": "Midjourney prompt..."
            }},
            "reddit": {{
                "content": "Post content...",
                "visual_prompt": "Midjourney prompt..."
            }}
        }}
        
        Return ONLY valid JSON.
        """
        
        response = self.model.generate_content(prompt)
        clean_text = response.text.replace('```json', '').replace('```', '').strip()
        try:
            return json.loads(clean_text)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return {{"error": "Failed to draft content"}}

def get_writer():
    return PlatformChameleon()
