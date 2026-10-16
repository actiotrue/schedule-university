from datetime import datetime

from app.core.base_schema import BaseSchema


class SubjectBase(BaseSchema):
    name: str
    semester: int
    total_hours: int
    is_optional: bool


class SubjectRead(SubjectBase):
    id: int
    created_at: datetime
    updated_at: datetime


class SubjectCreate(SubjectBase):
    pass


class SubjectUpdate(SubjectBase):
    pass
