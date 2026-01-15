from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from api.agents.scout import get_scout
from api.agents.ideator import get_ideator
from api.agents.writer import get_writer
from api.agents.editor import get_editor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for Next.js integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategyRequest(BaseModel):
    niche: str
    audience: str

class AssetRequest(BaseModel):
    selected_hook: str
    strategy_brief: dict

@app.get("/")
async def root():
    return {"message": "The Viral Factory API is running"}

@app.post("/api/strategy")
async def get_strategy(req: StrategyRequest):
    scout = get_scout()
    ideator = get_ideator()
    
    strategy_brief = scout.analyze_trends(req.niche, req.audience)
    if "error" in strategy_brief:
        raise HTTPException(status_code=500, detail="Failed to generate strategy brief")
    
    hooks_data = ideator.generate_hooks(strategy_brief)
    if "error" in hooks_data:
        raise HTTPException(status_code=500, detail="Failed to generate hooks")
    
    return {
        "strategy_brief": strategy_brief,
        "hooks": hooks_data["hooks"]
    }

@app.post("/api/generate-assets")
async def generate_assets(req: AssetRequest):
    writer = get_writer()
    editor = get_editor()
    
    drafts = writer.draft_content(req.selected_hook, req.strategy_brief)
    if "error" in drafts:
        raise HTTPException(status_code=500, detail="Failed to draft content")
    
    review_result = editor.review_content(drafts)
    if "error" in review_result:
        raise HTTPException(status_code=500, detail="Failed to review content")
    
    # Simple loop-back logic: if it fails significantly, try one rewrite
    if not review_result.get("passed", True) and review_result.get("cringe_score", 0) > 7:
        drafts = writer.draft_content(f"REWRITE based on feedback: {review_result['critique']}. original hook: {req.selected_hook}", req.strategy_brief)
        review_result = editor.review_content(drafts)

    return {
        "assets": review_result.get("polished_drafts", drafts),
        "cringe_report": {
            "score": review_result.get("cringe_score"),
            "critique": review_result.get("critique")
        }
    }
