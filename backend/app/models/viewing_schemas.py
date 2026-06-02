from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.enums import ViewingRequestStatusEnum

class ViewingRequestBase(BaseModel):
    property_id: int
    requested_time: datetime
    message: Optional[str] = None # Added message field

class ViewingRequestCreate(ViewingRequestBase):
    pass

class ViewingRequestUpdate(BaseModel):
    requested_time: Optional[datetime] = None
    status: Optional[ViewingRequestStatusEnum] = None
    message: Optional[str] = None # Added message field for updates

class ViewingProperty(BaseModel):
    title: str
    address: Optional[str] = None
    
    class Config:
        from_attributes = True

class ViewingUser(BaseModel):
    name: str
    
    class Config:
        from_attributes = True

class ViewingRequestResponse(ViewingRequestBase):
    request_id: int
    user_id: int
    status: ViewingRequestStatusEnum
    created_at: datetime
    property: ViewingProperty
    user: ViewingUser

    class Config:
        from_attributes = True

