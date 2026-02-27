This repository contains the Motor-Claim-Estimator project with a separated frontend and backend.

Project structure:
- frontend: Next.js 16 app (React 19, Tailwind v4, TypeScript)
- backend: FastAPI prototype for image analysis and cost estimation

Quickstart
1) Frontend
   cd frontend
   npm ci
   npm run dev

2) Backend
   cd backend
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload

Problem Statement
- Build an agent that analyzes car damage photos and provides a pre-approval repair cost estimate using Computer Vision and Vision LLMs.

Key Objectives
- Analyze car damage photos accurately
- Provide instant repair cost estimates
- Reduce claim processing time
- Improve customer satisfaction

Deliverables
1) Working prototype with demo images
2) Damage detection model
3) Cost estimation report
4) Technical documentation

