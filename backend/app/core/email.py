import json
import urllib.request
import urllib.error
from fastapi import HTTPException
from app.core.config import settings

def send_email(
    recipient: str,
    subject: str,
    body: str
) -> None:
    try:
        vercel_api_url = f"{settings.FRONTEND_HOST}/api/send-email"
        secret = settings.EMAIL_API_SECRET

        if not secret:
            print("Warning: EMAIL_API_SECRET not set. Email bridge may fail if unauthorized.")

        payload = {
            "to": recipient,
            "subject": subject,
            "htmlBody": body
        }
        data = json.dumps(payload).encode("utf-8")

        req = urllib.request.Request(
            vercel_api_url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {secret}"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status not in (200, 201):
                    raise HTTPException(status_code=500, detail=f"Email Bridge Failed: {response.status}")
        except urllib.error.HTTPError as e:
            error_text = e.read().decode()
            print(f"Error from Vercel Email API: {e.code} - {error_text}")
            raise HTTPException(status_code=500, detail=f"Email Bridge Failed: {e.code}")
        except urllib.error.URLError as e:
            print(f"Failed to connect to Vercel API: {e.reason}")
            raise HTTPException(status_code=500, detail=f"Failed to reach Email Bridge: {e.reason}")

        print(f"Email successfully sent to {recipient} via Vercel bridge.")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Failed to send email via bridge: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send verification email: {str(e)}"
        )


