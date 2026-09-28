import uuid
from pydantic import (
    ConfigDict,
    EmailStr,
)
from app.core.base_schema import BaseSchema

class UserBase(BaseSchema):
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase):
    password: str
    role: str | None = None


class UserRegister(UserCreate):
    pass


class UserRead(UserBase):
    id: uuid.UUID
    role: str


class TokenPair(BaseSchema):
    access_token: str
    refresh_token: str


class AuthResponse(TokenPair):
    user: UserRead


class PasswordChange(BaseSchema):
    new_password: str
