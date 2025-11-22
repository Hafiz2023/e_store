from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr

app = FastAPI()

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

@app.post("/api/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    # Simulate sending email
    if request.email == "test@example.com":
        return {"message": "Password reset link sent successfully."}
    raise HTTPException(status_code=404, detail="Email not found.")
