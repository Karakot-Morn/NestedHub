import smtplib
import socket
from email.mime.text import MIMEText
from fastapi import HTTPException
from app.core.config import settings

# Force IPv4 for smtplib to fix 'Network is unreachable' (Errno 101) on hosts without IPv6 routing
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

def send_email(
    recipient: str,
    subject: str,
    body: str
) -> None:
    try:
        msg = MIMEText(body, "html")
        msg['Subject'] = subject
        msg['From'] = f"NestedHub <{settings.EMAILS_FROM_EMAIL}>"
        msg['To'] = recipient

        # Check environment before deciding how to send the email
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            if settings.SMTP_HOST == "mailcatcher" or (settings.ENVIRONMENT == "local" and not settings.SMTP_USER):
                # No authentication required for MailCatcher in local environment
                print("Using MailCatcher or unauthenticated SMTP server")
            else:
                # Use authentication if credentials are provided
                if settings.SMTP_TLS:
                    server.starttls()

                if settings.SMTP_USER and settings.SMTP_PASSWORD:
                    server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                    
                print(f"Using SMTP server: {settings.SMTP_HOST}")

            server.send_message(msg)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send verification email: {str(e)}"
        )


