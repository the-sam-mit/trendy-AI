import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def get_gemini_model(model_name="gemini-2.5-flash-lite"):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(model_name)

def generate_content(prompt, model_name="gemini-2.5-flash-lite"):
    model = get_gemini_model(model_name)
    response = model.generate_content(prompt)
    return response.text
