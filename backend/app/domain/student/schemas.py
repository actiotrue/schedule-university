from datetime import date, datetime

from pydantic import EmailStr
from app.core.base_schema import BaseSchema

class StudentBase(BaseSchema):
    first_name: str
    last_name: str
    middle_name: str
    date_of_birth: date
    email: EmailStr
    phone: str
    course: int
    group_id: int


class StudentRead(StudentBase):
    id: int
    full_name:str
    created_at: datetime
    updated_at: datetime


class StudentCreate(StudentBase):
    pass


class StudentUpdate(StudentBase):
    pass
