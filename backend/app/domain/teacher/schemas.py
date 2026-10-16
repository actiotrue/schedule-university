from datetime import datetime

from pydantic import EmailStr
from app.core.base_schema import BaseSchema


class TeacherBase(BaseSchema):
    first_name: str
    middle_name: str | None
    last_name: str

    email: EmailStr | None
    phone: str | None
    department: str
    title: str


class TeacherRead(TeacherBase):
    id: int
    full_name:str
    created_at: datetime
    updated_at: datetime


class TeacherCreate(TeacherBase):
    pass


class TeacherUpdate(TeacherBase):
    pass
