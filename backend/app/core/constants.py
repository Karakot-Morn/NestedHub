# Role-related messages
ROLE_ASSIGNMENT_ERROR = "Only admins can assign non-customer or non-property_owner roles"
ADMIN_CREATION_RESTRICTION = "Only admins can create admin users"

# Email-related messages
EMAIL_ALREADY_REGISTERED = lambda role_context: f"This email is already registered as a {role_context}. To create a customer account, use a different email, or log in to your existing account."
PHONE_ALREADY_REGISTERED = "This phone number is already registered."

# Verification code
VERIFICATION_EMAIL_SUBJECT = "NestedHub: Your Email Verification Code"
VERIFICATION_EMAIL_BODY = lambda code: f"""
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #2F855A; text-align: center;">Welcome to NestedHub!</h2>
    <p>Thank you for registering. Please use the verification code below to complete your sign-up:</p>
    <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 4px;">{code}</span>
    </div>
    <p>This code is valid for 10 minutes. If you didn't request this email, please safely ignore it.</p>
    <p style="color: #888; font-size: 12px; margin-top: 40px; text-align: center;">&copy; 2026 NestedHub Rentals. All rights reserved.</p>
</div>
"""
RESET_PASSWORD_EMAIL_SUBJECT = "NestedHub: Password Reset Request"
RESET_PASSWORD_EMAIL_BODY = lambda code: f"""
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #2F855A; text-align: center;">NestedHub Security</h2>
    <p>We received a request to reset the password for your account. Please use the code below to reset your password:</p>
    <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 4px;">{code}</span>
    </div>
    <p>This code is valid for 10 minutes. If you didn't request a password reset, please safely ignore this email.</p>
    <p style="color: #888; font-size: 12px; margin-top: 40px; text-align: center;">&copy; 2026 NestedHub Rentals. All rights reserved.</p>
</div>
"""

